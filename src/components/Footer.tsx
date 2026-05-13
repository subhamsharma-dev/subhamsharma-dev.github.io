import { Github, Linkedin, Mail, PenSquare, Twitter } from 'lucide-react'
import { profile } from '@/data/content'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/[0.06]">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-accent-electric/30 via-ink-800 to-accent-violet/30">
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white">
                  SS
                </span>
              </div>
              <div>
                <div className="font-display text-base font-semibold text-white">{profile.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-white/45">
                  {profile.role}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Curious engineer building production AI &amp; cloud systems. Based in {profile.location}, open to new roles globally.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Sitemap</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/65 transition-colors hover:text-white">Home</button></li>
              <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/65 transition-colors hover:text-white">Projects</button></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/65 transition-colors hover:text-white">Contact</button></li>
              <li><a href={profile.resumeUrl} download className="text-white/65 transition-colors hover:text-white">Download CV</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Find me</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a href={profile.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
                  <Twitter className="h-3.5 w-3.5" /> Twitter
                </a>
              </li>
              <li>
                <a href={profile.medium} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
                  <PenSquare className="h-3.5 w-3.5" /> Medium
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-white/35">
            © {new Date().getFullYear()} {profile.name}.
          </p>
          <p className="font-mono text-[11px] text-white/35">
            React · TypeScript · Tailwind · Framer Motion · Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
