import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check, Clock, Copy, Github, Linkedin, Loader2, Mail, MapPin,
  PenSquare, Send, Twitter,
} from 'lucide-react'
import { profile } from '@/data/content'

// Web3Forms access key — injected from GitHub Actions Secret at build time.
// Local dev: put it in .env.local as VITE_WEB3FORMS_KEY.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {/* ignore */}
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!WEB3FORMS_KEY) {
      setStatus('error')
      setErrorMsg("Form isn't configured yet — please email me directly.")
      return
    }

    setStatus('loading')
    setErrorMsg('')

    const payload = new FormData()
    payload.append('access_key', WEB3FORMS_KEY)
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('message', form.message)
    payload.append('subject', `Portfolio inquiry from ${form.name}`)
    payload.append('from_name', form.name)
    // Honeypot — Web3Forms filters submissions where this is filled
    payload.append('botcheck', '')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.message || 'Something went wrong. Try again or email me directly.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg("Couldn't reach the form server. Email me directly?")
    }
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
              Let's <span className="text-gradient">talk.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
              Always up for a conversation about interesting problems — AI, infrastructure, distributed systems, or just good engineering. Drop a note below or reach me on any channel.
            </p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[12px] font-medium text-emerald-300">Open to roles</span>
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

              <SocialRow
                href={profile.linkedin}
                label="LinkedIn"
                handle="subham-sharma1512"
                icon={<Linkedin className="h-4 w-4 text-[#5da9e6]" />}
                tintFrom="from-[#0a66c2]/30"
              />
              <SocialRow
                href={profile.github}
                label="GitHub"
                handle="subhamsharma-dev"
                icon={<Github className="h-4 w-4 text-white" />}
                tintFrom="from-white/10"
              />
              <SocialRow
                href={profile.twitter}
                label="Twitter / X"
                handle="@ssharma1512"
                icon={<Twitter className="h-4 w-4 text-[#5cc8ff]" />}
                tintFrom="from-accent-electric/20"
              />
              <SocialRow
                href={profile.medium}
                label="Medium"
                handle="@ksubham.sharma"
                icon={<PenSquare className="h-4 w-4 text-emerald-300" />}
                tintFrom="from-emerald-400/20"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div className="relative">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-accent-electric/10 via-transparent to-accent-violet/10 blur-2xl" />

            <form
              onSubmit={handleSubmit}
              className="glass-strong relative rounded-2xl border border-white/10 p-6 md:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Send a message</h3>
                  <p className="mt-1 text-xs text-white/50">Lands directly in my inbox.</p>
                </div>
                <Send className="h-5 w-5 text-white/30" />
              </div>

              <div className="space-y-4">
                <FormField
                  label="Your name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <FormField
                  label="Your email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <FormField
                  label="Message"
                  type="textarea"
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:shadow-glow-blue disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
              >
                {status === 'loading' && (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>)}
                {status === 'success' && (<><Check className="h-4 w-4 text-emerald-600" /> Message sent — I'll reply soon</>)}
                {(status === 'idle' || status === 'error') && (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>

              {status === 'error' && (
                <p className="mt-3 text-center text-xs text-red-400">{errorMsg}</p>
              )}

              <p className="mt-4 text-center text-[11px] text-white/35">
                Or just email me directly — both reach the same inbox.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialRow({
  href, label, handle, icon, tintFrom,
}: {
  href: string
  label: string
  handle: string
  icon: React.ReactNode
  tintFrom: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-all hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br ${tintFrom} to-transparent`}>
          {icon}
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-white/45">{label}</div>
          <div className="text-sm text-white">{handle}</div>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-electric" />
    </a>
  )
}

function FormField({
  label, type, value, onChange, required, disabled,
}: {
  label: string
  type: 'text' | 'email' | 'textarea'
  value: string
  onChange: (v: string) => void
  required?: boolean
  disabled?: boolean
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
        disabled={disabled}
        rows={type === 'textarea' ? 4 : undefined}
        className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent-electric/40 focus:bg-white/[0.05] disabled:opacity-60"
      />
    </label>
  )
}
