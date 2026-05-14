/**
 * Sample an image into a uniform grid of "dots" — one Dot per cell.
 * Returns density (dark→1, bright→0), a center-weighted mask to fade the
 * periphery (so noisy backgrounds don't dominate), and a deterministic
 * per-dot phase used by animation.
 */

export type Dot = {
  density: number
  mask: number
  phase: number
}

export async function loadDotGrid(
  src: string,
  cols: number,
  rows: number,
): Promise<Dot[][]> {
  const img = await loadImage(src)
  const canvas = document.createElement('canvas')
  canvas.width = cols
  canvas.height = rows
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('canvas 2d unavailable')

  // Cover-fit; bias slightly upward so the face stays near the top half.
  const imgAspect = img.width / img.height
  const targetAspect = cols / rows
  let sx = 0, sy = 0, sw = img.width, sh = img.height
  if (imgAspect > targetAspect) {
    sw = img.height * targetAspect
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / targetAspect
    sy = Math.max(0, (img.height - sh) * 0.35)
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows)

  const data = ctx.getImageData(0, 0, cols, rows).data

  // Luminance + percentile auto-contrast so the whole tonal range maps to 0..1.
  const lums = new Float32Array(cols * rows)
  for (let i = 0; i < lums.length; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2]
    lums[i] = 0.299 * r + 0.587 * g + 0.114 * b
  }
  const sorted = Array.from(lums).sort((a, b) => a - b)
  const lo = sorted[Math.floor(sorted.length * 0.04)]
  const hi = sorted[Math.floor(sorted.length * 0.96)]
  const range = Math.max(1, hi - lo)

  const grid: Dot[][] = []
  for (let row = 0; row < rows; row++) {
    grid[row] = []
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col
      let n = (lums[i] - lo) / range
      n = n < 0 ? 0 : n > 1 ? 1 : n
      // Slight gamma to deepen mid-tones.
      n = Math.pow(n, 1.15)
      // Invert: dark source → strong dot.
      const density = 1 - n

      // Elliptical center mask, fades periphery so background doesn't dominate.
      const dx = col / cols - 0.5
      const dy = row / rows - 0.5
      const dist = Math.sqrt(dx * dx + dy * dy * 1.05)
      const mask = Math.max(0, 1 - Math.pow(dist / 0.58, 1.7))

      grid[row][col] = {
        density,
        mask,
        phase: ((col * 0.71 + row * 1.37) % (Math.PI * 2)),
      }
    }
  }

  return grid
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
