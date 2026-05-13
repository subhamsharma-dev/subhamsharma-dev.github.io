import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, Copy, Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile } from '@/data/content'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {/* ignore */}
  }

  // No backend in a static site — open the user's mail client with prefilled body.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'recruiter'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left — pitch */}
          <div>
            <span className="section-eyebrow">
              <span className="h-px w-6 bg-accent-electric/60" />
              Get in touch
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
              Let's build something serious.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
              Open to senior backend, platform, AI infrastructure, and cloud architecture roles. The fastest way to reach me is email — I usually reply within 24 hours.
            </p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[12px] font-medium text-emerald-300">Available now</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                <Clock className="h-3 w-3" /> Replies in &lt;24h
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70">
                <MapPin className="h-3 w-3" /> {profile.timezone}
              </div>
            </div>

            {/* Direct channels */}
            <div className="mt-10 space-y-2">
              <button
                onClick={copyEmail}
                className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-accent-electric/20 to-transparent">
                    <Mail className="h-4 w-4 text-accent-electric" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/45">Email</div>
                    <div className="text-sm text-white">{profile.email}</div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-white/45 transition-colors group-hover:text-accent-electric">
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </span>
              </button>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-[#0a66c2]/30 to-transparent">
                    <Linkedin className="h-4 w-4 text-[#5da9e6]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/45">LinkedIn</div>
                    <div className="text-sm text-white">subham-sharma1512</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-electric" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/45">GitHub</div>
                    <div className="text-sm text-white">subhamsharma-dev</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-electric" />
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-accent-electric/10 via-transparent to-accent-violet/10 blur-2xl" />

            <form
              onSubmit={handleSubmit}
              className="glass-strong relative rounded-2xl border border-white/10 p-6 md:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Send a message</h3>
                  <p className="mt-1 text-xs text-white/50">Opens your mail client.</p>
                </div>
                <Globe className="h-5 w-5 text-white/30" />
              </div>

              <div className="space-y-4">
                <FormField
                  label="Your name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <FormField
                  label="Your email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                />
                <FormField
                  label="Message"
                  type="textarea"
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                  required
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:shadow-glow-blue"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" /> Opened mail client
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>

              <p className="mt-4 text-center text-[11px] text-white/35">
                Prefer not to use the form? Just email me directly.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label, type, value, onChange, required,
}: {
  label: string
  type: 'text' | 'email' | 'textarea'
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const Component = type === 'textarea' ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-white/50">{label}</span>
      <Component
        type={type === 'textarea' ? undefined : type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        required={required}
        rows={type === 'textarea' ? 4 : undefined}
        className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent-electric/40 focus:bg-white/[0.05]"
      />
    </label>
  )
}
