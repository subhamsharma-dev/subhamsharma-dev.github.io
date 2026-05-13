import { motion } from 'framer-motion'
import { Download, FileText, Mail, ArrowRight, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile, experiences, education, heroStats } from '@/data/content'

export default function ResumePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28"
    >
      <div className="container-page py-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">
              <span className="h-px w-6 bg-accent-electric/60" />
              Resume
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tightest text-white md:text-6xl">
              The <span className="text-gradient">one-pager</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              An ATS-friendly PDF with everything condensed. Take the quick snapshot or download the full doc.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={profile.resumeUrl} download className="btn-primary">
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <Link to="/contact" className="btn-ghost">
              <Mail className="h-4 w-4" />
              Get in touch
            </Link>
          </div>
        </div>

        {/* Snapshot */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Left — Snapshot card */}
          <div className="card-surface p-8 md:p-10">
            <div className="flex items-start gap-5">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-electric/20 via-ink-800 to-accent-violet/20 font-display text-xl font-bold text-white">
                  SS
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 ring-4 ring-ink-950">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">{profile.name}</h2>
                <p className="mt-1 text-sm text-white/60">{profile.role} · {profile.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/55">
                  <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {profile.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {profile.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {profile.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent-electric">Summary</div>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Software Engineer with 4+ years designing and building distributed systems, microservices, and scalable cloud-native applications on AWS and Microsoft Azure. Hands-on ownership of serverless architecture, event-driven systems, and Infrastructure as Code. Domain experience across HealthTech (FHIR, C-CDA) and Legal Technology, with strong foundations in system design, application security, and HIPAA/SOC 2 compliance. Skilled in Python, FastAPI, Java, TypeScript, and AI/LLM engineering with LangChain, RAG, and vector databases.
              </p>
            </div>

            {/* Education */}
            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent-electric">Education</div>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-white">{education.degree}</div>
                  <div className="mt-1 text-xs text-white/55">
                    {education.institution} · {education.university}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] text-accent-electric">{education.period}</div>
                  <div className="font-mono text-[11px] text-white/55">CGPA {education.cgpa}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Recruiter stats */}
          <div className="space-y-4">
            <div className="card-surface p-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-accent-electric">By the numbers</h3>
              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
                {heroStats.map((s) => (
                  <div key={s.label} className="bg-ink-950/40 p-4">
                    <div className="font-display text-xl font-bold text-gradient">{s.value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-electric/20 to-transparent">
                <FileText className="h-5 w-5 text-accent-electric" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Recruiter snapshot</div>
                <div className="mt-0.5 text-xs text-white/55">ATS-optimized PDF · ~95KB</div>
              </div>
              <a href={profile.resumeUrl} download className="text-accent-electric transition-colors hover:text-white">
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Experience condensed */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white">Experience</h2>
          <div className="mt-6 space-y-3">
            {experiences.map((e) => (
              <div key={`${e.role}-${e.period}`} className="card-surface p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="font-display text-base font-semibold text-white">{e.role}</div>
                    <div className="text-sm text-white/55">{e.company} · {e.location}</div>
                  </div>
                  <div className="font-mono text-[11px] text-accent-electric">{e.period}</div>
                </div>
                <p className="mt-3 text-sm text-white/65">{e.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.slice(0, 6).map((s) => (
                    <span key={s} className="badge-chip">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
