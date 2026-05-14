/**
 * Image → SVG wireframe pipeline.
 * Canny-style edge detection, then traced into polylines and simplified
 * with Ramer–Douglas–Peucker. Output is ready to feed straight into <path d=…>.
 */

export type TracedPath = { d: string; length: number }

export type WireframeOptions = {
  width: number
  height: number
  blurRadius: number
  lowThreshold: number   // 0..1 relative to max gradient magnitude
  highThreshold: number  // 0..1 relative to max gradient magnitude
  minPathLength: number  // drop polylines shorter than this (in pixels)
  simplifyTolerance: number // RDP tolerance in pixels
}

export const defaultOptions: WireframeOptions = {
  width: 320,
  height: 400,
  blurRadius: 2,
  lowThreshold: 0.06,
  highThreshold: 0.16,
  minPathLength: 10,
  simplifyTolerance: 1.1,
}

export async function imageToWireframe(
  src: string,
  opts: WireframeOptions = defaultOptions,
): Promise<TracedPath[]> {
  const img = await loadImage(src)
  return processImage(img, opts)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function processImage(img: HTMLImageElement, opts: WireframeOptions): TracedPath[] {
  const { width, height } = opts
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!

  // Cover-fit (object-fit: cover semantics)
  const imgAspect = img.width / img.height
  const canvasAspect = width / height
  let sx = 0, sy = 0, sw = img.width, sh = img.height
  if (imgAspect > canvasAspect) {
    sw = img.height * canvasAspect
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / canvasAspect
    sy = (img.height - sh) / 2
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height)

  const imageData = ctx.getImageData(0, 0, width, height)
  const gray = toGrayscale(imageData)
  const blurred = gaussianBlur(gray, width, height, opts.blurRadius)
  const { magnitude, angle } = sobel(blurred, width, height)
  const thinned = nonMaxSuppression(magnitude, angle, width, height)
  const edges = hysteresisThreshold(thinned, width, height, opts.lowThreshold, opts.highThreshold)
  const polylines = traceEdges(edges, width, height, opts.minPathLength)
  const simplified = polylines.map((p) => simplifyRDP(p, opts.simplifyTolerance))

  const out: TracedPath[] = []
  for (const poly of simplified) {
    const length = polylineLength(poly)
    if (length < opts.minPathLength) continue
    out.push({ d: polylineToPathD(poly), length })
  }
  out.sort((a, b) => b.length - a.length)
  return out
}

function toGrayscale(imageData: ImageData): Float32Array {
  const { data, width, height } = imageData
  const gray = new Float32Array(width * height)
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2]
    gray[i] = 0.299 * r + 0.587 * g + 0.114 * b
  }
  return gray
}

function gaussianKernel(radius: number): Float32Array {
  const size = radius * 2 + 1
  const kernel = new Float32Array(size)
  const sigma = Math.max(0.5, radius / 2)
  let sum = 0
  for (let i = 0; i < size; i++) {
    const x = i - radius
    kernel[i] = Math.exp(-(x * x) / (2 * sigma * sigma))
    sum += kernel[i]
  }
  for (let i = 0; i < size; i++) kernel[i] /= sum
  return kernel
}

function gaussianBlur(src: Float32Array, w: number, h: number, radius: number): Float32Array {
  if (radius <= 0) return src
  const kernel = gaussianKernel(radius)
  const r = radius
  const tmp = new Float32Array(w * h)
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0
      for (let i = -r; i <= r; i++) {
        const xx = x + i < 0 ? 0 : x + i >= w ? w - 1 : x + i
        s += src[y * w + xx] * kernel[i + r]
      }
      tmp[y * w + x] = s
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0
      for (let i = -r; i <= r; i++) {
        const yy = y + i < 0 ? 0 : y + i >= h ? h - 1 : y + i
        s += tmp[yy * w + x] * kernel[i + r]
      }
      out[y * w + x] = s
    }
  }
  return out
}

function sobel(gray: Float32Array, w: number, h: number) {
  const magnitude = new Float32Array(w * h)
  const angle = new Float32Array(w * h)
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const tl = gray[(y - 1) * w + (x - 1)]
      const tm = gray[(y - 1) * w + x]
      const tr = gray[(y - 1) * w + (x + 1)]
      const ml = gray[y * w + (x - 1)]
      const mr = gray[y * w + (x + 1)]
      const bl = gray[(y + 1) * w + (x - 1)]
      const bm = gray[(y + 1) * w + x]
      const br = gray[(y + 1) * w + (x + 1)]
      const gx = -tl - 2 * ml - bl + tr + 2 * mr + br
      const gy = -tl - 2 * tm - tr + bl + 2 * bm + br
      const idx = y * w + x
      magnitude[idx] = Math.hypot(gx, gy)
      angle[idx] = Math.atan2(gy, gx)
    }
  }
  return { magnitude, angle }
}

function nonMaxSuppression(
  magnitude: Float32Array,
  angle: Float32Array,
  w: number,
  h: number,
): Float32Array {
  const out = new Float32Array(w * h)
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x
      const m = magnitude[idx]
      if (m === 0) continue
      let a = (angle[idx] * 180) / Math.PI
      if (a < 0) a += 180
      let n1: number, n2: number
      if (a < 22.5 || a >= 157.5) {
        n1 = magnitude[idx - 1]; n2 = magnitude[idx + 1]
      } else if (a < 67.5) {
        n1 = magnitude[idx - w - 1]; n2 = magnitude[idx + w + 1]
      } else if (a < 112.5) {
        n1 = magnitude[idx - w]; n2 = magnitude[idx + w]
      } else {
        n1 = magnitude[idx - w + 1]; n2 = magnitude[idx + w - 1]
      }
      if (m >= n1 && m >= n2) out[idx] = m
    }
  }
  return out
}

function hysteresisThreshold(
  mag: Float32Array,
  w: number,
  h: number,
  low: number,
  high: number,
): Uint8Array {
  let maxVal = 0
  for (let i = 0; i < mag.length; i++) if (mag[i] > maxVal) maxVal = mag[i]
  const lowVal = low * maxVal
  const highVal = high * maxVal

  const out = new Uint8Array(w * h)
  const stack: number[] = []
  for (let i = 0; i < w * h; i++) {
    if (mag[i] >= highVal) {
      out[i] = 2
      stack.push(i)
    } else if (mag[i] >= lowVal) {
      out[i] = 1
    }
  }
  while (stack.length) {
    const i = stack.pop()!
    const x = i % w, y = (i / w) | 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        const nx = x + dx, ny = y + dy
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
        const ni = ny * w + nx
        if (out[ni] === 1) {
          out[ni] = 2
          stack.push(ni)
        }
      }
    }
  }
  const final = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) final[i] = out[i] === 2 ? 1 : 0
  return final
}

/**
 * Greedy 8-connected edge tracing. Prefers endpoints (pixels with exactly
 * one neighbor) as seeds so long contours stay long instead of getting cut.
 */
function traceEdges(
  edges: Uint8Array,
  w: number,
  h: number,
  minLen: number,
): number[][][] {
  const visited = new Uint8Array(w * h)
  const out: number[][][] = []

  const countNeighbors = (i: number) => {
    const x = i % w, y = (i / w) | 0
    let c = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        const nx = x + dx, ny = y + dy
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
        if (edges[ny * w + nx]) c++
      }
    }
    return c
  }

  const stepFrom = (i: number) => {
    const x = i % w, y = (i / w) | 0
    // Prefer cardinal directions before diagonals to keep traces smooth.
    const candidates = [
      [0, -1], [0, 1], [-1, 0], [1, 0],
      [-1, -1], [1, -1], [-1, 1], [1, 1],
    ]
    for (const [dx, dy] of candidates) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
      const ni = ny * w + nx
      if (edges[ni] && !visited[ni]) return ni
    }
    return -1
  }

  const walk = (start: number): number[][] => {
    const poly: number[][] = []
    let cur = start
    while (cur !== -1 && !visited[cur]) {
      visited[cur] = 1
      poly.push([cur % w, (cur / w) | 0])
      cur = stepFrom(cur)
    }
    return poly
  }

  // Pass 1: endpoints first (these anchor real strokes)
  for (let i = 0; i < w * h; i++) {
    if (!edges[i] || visited[i]) continue
    if (countNeighbors(i) === 1) {
      const poly = walk(i)
      if (poly.length >= minLen) out.push(poly)
    }
  }
  // Pass 2: anything remaining (loops, junctions)
  for (let i = 0; i < w * h; i++) {
    if (!edges[i] || visited[i]) continue
    const poly = walk(i)
    if (poly.length >= minLen) out.push(poly)
  }
  return out
}

function simplifyRDP(points: number[][], tolerance: number): number[][] {
  if (points.length < 3) return points
  const stack: Array<[number, number]> = [[0, points.length - 1]]
  const keep = new Uint8Array(points.length)
  keep[0] = 1
  keep[points.length - 1] = 1
  while (stack.length) {
    const [a, b] = stack.pop()!
    let maxDist = 0
    let maxIdx = -1
    const [x1, y1] = points[a]
    const [x2, y2] = points[b]
    for (let i = a + 1; i < b; i++) {
      const [x, y] = points[i]
      const d = perpDist(x, y, x1, y1, x2, y2)
      if (d > maxDist) { maxDist = d; maxIdx = i }
    }
    if (maxIdx !== -1 && maxDist > tolerance) {
      keep[maxIdx] = 1
      stack.push([a, maxIdx], [maxIdx, b])
    }
  }
  const out: number[][] = []
  for (let i = 0; i < points.length; i++) if (keep[i]) out.push(points[i])
  return out
}

function perpDist(
  x: number, y: number,
  x1: number, y1: number,
  x2: number, y2: number,
): number {
  const dx = x2 - x1, dy = y2 - y1
  const L2 = dx * dx + dy * dy
  if (L2 === 0) return Math.hypot(x - x1, y - y1)
  let t = ((x - x1) * dx + (y - y1) * dy) / L2
  if (t < 0) t = 0
  else if (t > 1) t = 1
  const px = x1 + t * dx, py = y1 + t * dy
  return Math.hypot(x - px, y - py)
}

function polylineToPathD(poly: number[][]): string {
  if (poly.length === 0) return ''
  let d = `M${poly[0][0].toFixed(1)} ${poly[0][1].toFixed(1)}`
  for (let i = 1; i < poly.length; i++) {
    d += ` L${poly[i][0].toFixed(1)} ${poly[i][1].toFixed(1)}`
  }
  return d
}

function polylineLength(poly: number[][]): number {
  let len = 0
  for (let i = 1; i < poly.length; i++) {
    len += Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1])
  }
  return len
}
