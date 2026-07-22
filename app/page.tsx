import Link from "next/link";
import { ArrowRight, Database, Key, HardDrive, Zap, Shield, GitBranch, CheckCircle2, Globe, Lock, BarChart3 } from "lucide-react";
import { MegaNav } from "@/components/home/mega-nav";
import { AnimatedStats } from "@/components/home/animated-stats";

const BudruumLogo = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <ellipse cx="50" cy="40" rx="38" ry="30" fill="#C5DCF0" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <rect x="16" y="50" width="68" height="30" rx="5" fill="#B8D4E8" />
    <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="white" fontFamily="Georgia, serif">B</text>
  </svg>
);

const FEATURES = [
  { icon: Database, label: "Postgres Database", desc: "Serverless PostgreSQL with instant branching. Every client gets an isolated database, fully managed.", tag: "Core", href: "/database" },
  { icon: Shield, label: "Authentication", desc: "Email, OAuth, magic links, MFA and session management. Enterprise-grade identity, zero setup.", tag: "Core", href: "/auth" },
  { icon: HardDrive, label: "File Storage", desc: "S3-compatible object storage via Cloudflare R2. Zero egress fees, presigned URLs, public or private buckets.", tag: "Core", href: "/storage" },
  { icon: Zap, label: "Edge Functions", desc: "TypeScript serverless functions on Cloudflare Workers. Webhooks, cron, AI calls — globally distributed.", tag: "Advanced", href: "/functions" },
  { icon: GitBranch, label: "GitHub Integration", desc: "Push to a branch, get an isolated preview database automatically. Merge and migrations apply to production.", tag: "Advanced", href: "/docs" },
  { icon: Key, label: "Auto Env Injection", desc: "Connect Vercel and all API keys push to every deployment automatically. No manual .env copying.", tag: "Advanced", href: "/docs" },
];

const STACK = [
  { name: "Neon Postgres", role: "Database" },
  { name: "Better-Auth", role: "Authentication" },
  { name: "Cloudflare R2", role: "Storage" },
  { name: "Hono.js", role: "API Layer" },
  { name: "Drizzle ORM", role: "Schema & Migrations" },
  { name: "Cloudflare Workers", role: "Edge Functions" },
  { name: "Resend", role: "Transactional Email" },
  { name: "Ably", role: "Realtime" },
];

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const VercelIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 22.525H0l12-21.05 12 21.05z"/>
  </svg>
);
const DiscordIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
  </svg>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <MegaNav />

      {/* ─── HERO ─── */}
      <section className="relative pt-[112px] pb-14 px-6 text-center overflow-hidden">
        {/* fine grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(139,184,216,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,184,216,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        {/* top glow */}
        <div className="hero-glow absolute top-[-120px] left-1/2 -translate-x-1/2 w-[640px] h-[420px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(197,220,240,0.55) 0%, transparent 68%)" }} />

        <div className="relative max-w-3xl mx-auto">
          <div className="flex justify-center mb-7 anim-logo">
            <BudruumLogo size={60} />
          </div>

          <div className="anim-hero inline-flex items-center gap-2 bg-white border border-[#C5DCF0] text-[#5890B8] text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5 shadow-sm" style={{ animationDelay: "0.07s" }}>
            <span className="w-1.5 h-1.5 bg-[#8BB8D8] rounded-full animate-pulse" />
            Private beta · Built for agencies & studios
          </div>

          <h1 className="anim-hero text-[44px] font-extrabold tracking-[-0.04em] text-[#0d0d1a] leading-[1.1] mb-4" style={{ animationDelay: "0.13s" }}>
            Your own backend.<br />
            <span className="gradient-text">Every client.</span>
          </h1>

          <p className="anim-hero text-[15px] text-[#6b6b80] max-w-[420px] mx-auto mb-8 leading-[1.7]" style={{ animationDelay: "0.2s" }}>
            A private Backend-as-a-Service platform for agencies. Database, auth, storage and edge functions under your own infrastructure.
          </p>

          <div className="anim-hero flex items-center justify-center gap-3 flex-wrap mb-8" style={{ animationDelay: "0.27s" }}>
            <Link href="/signup" className="btn-primary inline-flex items-center gap-2 bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[7px] shadow-sm">
              Start building free <ArrowRight size={13} />
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555566] px-5 py-2.5 rounded-[7px] border border-[#e8e8f0] hover:border-[#C5DCF0] hover:bg-[#EEF5FB] transition-all">
              See the dashboard
            </Link>
          </div>

          <div className="anim-hero flex items-center justify-center gap-6 text-[11.5px] text-[#9494a8]" style={{ animationDelay: "0.34s" }}>
            {["No credit card required", "Free tier included", "EU data residency"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={11} className="text-[#8BB8D8]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="px-6 pb-18">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[14px] border border-[#C5DCF0] overflow-hidden shadow-[0_20px_70px_rgba(139,184,216,0.18)]">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#EEF5FB] border-b border-[#C5DCF0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fde68a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#bbf7d0]" />
              <div className="flex-1 mx-3 bg-white border border-[#e8e8f0] rounded-[4px] px-3 py-1 text-[10.5px] text-[#9494a8] font-mono">
                cloud.budruum.com/project/dehadza-homes/editor
              </div>
            </div>
            <div className="flex" style={{ height: 340 }}>
              <div className="w-[180px] bg-[#f8f8fc] border-r border-[#e8e8f0] flex flex-col p-2 gap-0.5 shrink-0">
                <div className="flex items-center gap-1.5 px-2 py-1.5 mb-1">
                  <BudruumLogo size={16} />
                  <span className="text-[10.5px] font-semibold text-[#1b1b23]">dehadza-homes</span>
                </div>
                <div className="px-2 py-1.5 rounded-[5px] bg-[#EEF5FB] text-[#5890B8] text-[11.5px] font-semibold border border-[#C5DCF0]">Table Editor</div>
                {["SQL Editor", "Database", "Storage", "Authentication", "API Keys", "Logs"].map((item) => (
                  <div key={item} className="px-2 py-1.5 rounded-[5px] text-[#6b6b80] text-[11.5px] hover:bg-[#f0f0f5] cursor-default transition-colors">{item}</div>
                ))}
              </div>
              <div className="flex-1 bg-white overflow-hidden">
                <div className="h-[42px] border-b border-[#e8e8f0] flex items-center px-4 gap-2">
                  <span className="text-[12px] font-semibold text-[#1b1b23]">Table Editor</span>
                  <span className="text-[10.5px] text-[#9494a8]">— users</span>
                </div>
                <table className="w-full text-[10.5px] border-collapse">
                  <thead>
                    <tr className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
                      {["id", "created_at", "email", "full_name", "role", "status"].map((col) => (
                        <th key={col} className="text-left px-3 py-2 font-semibold uppercase tracking-wider text-[#9494a8] text-[9.5px] border-r border-[#e8e8f0]">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1", "2026-07-20", "alice@dehadza.com", "Alice Martins", "admin", "active"],
                      ["2", "2026-07-19", "bob@dehadza.com", "Bob Johnson", "user", "active"],
                      ["3", "2026-07-18", "carol@dehadza.com", "Carol Smith", "user", "inactive"],
                      ["4", "2026-07-17", "dan@dehadza.com", "Dan Williams", "editor", "active"],
                      ["5", "2026-07-16", "emma@dehadza.com", "Emma Davis", "user", "active"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#e8e8f0] hover:bg-[#EEF5FB] transition-colors cursor-default">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 font-mono border-r border-[#e8e8f0] text-[#1b1b23]">
                            {j === 5 ? (
                              <span className={`px-1.5 py-0.5 rounded-full text-[9.5px] font-bold ${cell === "active" ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-[#f3f3f8] text-[#9494a8]"}`}>{cell}</span>
                            ) : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <AnimatedStats />

      {/* ─── FEATURES ─── */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#ebebf0]" id="features">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8BB8D8] mb-2.5">Platform</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3 leading-tight">
              Every backend service.<br />One platform.
            </h2>
            <p className="text-[13.5px] text-[#6b6b80] max-w-[380px] mx-auto leading-relaxed">
              Stop paying third-party fees for every client project. Own the infrastructure, keep the margin.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {FEATURES.map(({ icon: Icon, label, desc, tag, href }) => (
              <Link key={label} href={href} className="feature-card border border-[#e8e8f0] rounded-[11px] p-5 bg-white hover:border-[#C5DCF0] hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="card-icon w-9 h-9 rounded-[8px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center transition-all">
                    <Icon size={15} className="text-[#5890B8]" />
                  </div>
                  <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${tag === "Core" ? "bg-[#EEF5FB] text-[#5890B8] border border-[#C5DCF0]" : "bg-[#f3f3f8] text-[#9494a8] border border-[#e8e8f0]"}`}>{tag}</span>
                </div>
                <h3 className="text-[13px] font-bold text-[#0d0d1a] mb-1.5">{label}</h3>
                <p className="text-[12px] text-[#6b6b80] leading-[1.6]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8BB8D8] mb-2.5">How it works</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a]">Ship in minutes, not days.</h2>
          </div>
          <div className="relative">
            <div className="absolute top-[20px] left-[calc(16.66%+18px)] right-[calc(16.66%+18px)] h-px bg-gradient-to-r from-[#C5DCF0] via-[#8BB8D8] to-[#C5DCF0]" />
            <div className="grid grid-cols-3 gap-8">
              {[
                { step: "01", title: "Create a project", desc: "Name your project, pick your region. We provision a Postgres database, storage bucket and auth system instantly." },
                { step: "02", title: "Connect GitHub + Vercel", desc: "One click to link your repo. Every PR gets an isolated preview database. Every deploy gets env vars auto-injected." },
                { step: "03", title: "Install @budruum/client", desc: "Two lines of code. Your client is talking to your own backend — database, auth, storage, all ready." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="pt-1">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#C5DCF0] flex items-center justify-center mb-5 shadow-sm relative z-10">
                    <span className="text-[11px] font-bold text-[#8BB8D8] font-mono">{step}</span>
                  </div>
                  <h3 className="text-[13.5px] font-bold text-[#0d0d1a] mb-2">{title}</h3>
                  <p className="text-[12px] text-[#6b6b80] leading-[1.65]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CODE ─── */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#ebebf0]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8BB8D8] mb-2.5">Developer experience</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] leading-tight mb-4">
              Built for developers.<br />Ready on day one.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-[1.7] mb-6">
              The <code className="bg-[#EEF5FB] px-1.5 py-0.5 rounded text-[#5890B8] font-mono text-[11px]">@budruum/client</code> SDK gives you a clean API for database, auth, and storage — full TypeScript support, zero boilerplate.
            </p>
            <div className="space-y-2.5">
              {[
                "Full TypeScript support with generated types",
                "Realtime subscriptions over WebSockets",
                "Row Level Security enforced at database level",
                "Automatic retry with exponential backoff",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[12px] text-[#0d0d1a]">
                  <CheckCircle2 size={12} className="text-[#8BB8D8] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[12px] border border-[#C5DCF0] overflow-hidden shadow-[0_8px_32px_rgba(139,184,216,0.14)]">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#EEF5FB] border-b border-[#C5DCF0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fde68a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#bbf7d0]" />
              <span className="ml-2 text-[10.5px] text-[#9494a8] font-mono">lib/budruum.ts</span>
            </div>
            <pre className="p-5 text-[11.5px] font-mono leading-[1.9] bg-white overflow-x-auto text-[#0d0d1a]">{`// npm install @budruum/client
import { createClient } from '@budruum/client'

export const db = createClient(
  process.env.BUDRUUM_URL,
  process.env.BUDRUUM_ANON_KEY
)

// Query your database
const { data } = await db
  .from('products')
  .select('*')
  .eq('status', 'active')

// Upload a file
await db.storage
  .from('images')
  .upload('logo.png', file)`}</pre>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-bold tracking-[0.18em] uppercase text-[#9494a8] mb-7">Built on world-class open infrastructure</p>
          <div className="grid grid-cols-4 gap-2.5">
            {STACK.map(({ name, role }) => (
              <div key={name} className="stack-card bg-white border border-[#e8e8f0] rounded-[9px] px-4 py-3 flex items-center gap-2.5 cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8BB8D8] shrink-0" />
                <div>
                  <p className="text-[12px] font-semibold text-[#0d0d1a]">{name}</p>
                  <p className="text-[10.5px] text-[#9494a8]">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#ebebf0]" id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8BB8D8] mb-2.5">Pricing</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-2">Simple, transparent pricing.</h2>
            <p className="text-[13.5px] text-[#6b6b80]">One flat monthly fee. All the infrastructure you need.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Starter", price: "£29", period: "/project/mo", desc: "Perfect for a client's first project.", features: ["1 Postgres database", "500MB storage", "10k API calls/day", "Up to 1,000 auth users", "Dashboard access", "GitHub integration"], cta: "Start free", highlight: false, href: "/signup" },
              { name: "Pro", price: "£79", period: "/project/mo", desc: "For projects with serious traffic.", features: ["Everything in Starter", "5GB storage", "100k API calls/day", "Unlimited auth users", "Branch preview DBs", "Edge Functions", "Realtime"], cta: "Get Pro", highlight: true, href: "/signup" },
              { name: "Agency", price: "£249", period: "/mo unlimited", desc: "All your client projects, one roof.", features: ["Everything in Pro", "Unlimited projects", "Custom domain", "White-label dashboard", "99.9% SLA", "Priority support", "Dedicated infra"], cta: "Talk to us", highlight: false, href: "/about" },
            ].map((tier) => (
              <div key={tier.name} className={`pricing-card rounded-[11px] overflow-hidden border h-full ${tier.highlight ? "border-[#8BB8D8] shadow-[0_8px_32px_rgba(139,184,216,0.22)]" : "border-[#e8e8f0]"}`}>
                {tier.highlight && <div className="bg-[#8BB8D8] py-1.5 text-center text-[9.5px] font-bold text-white tracking-widest uppercase">Most popular</div>}
                <div className="p-5 bg-white h-full">
                  <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-1.5">{tier.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-[30px] font-extrabold tracking-tight text-[#0d0d1a]">{tier.price}</span>
                    <span className="text-[11.5px] text-[#9494a8] mb-1.5">{tier.period}</span>
                  </div>
                  <p className="text-[12px] text-[#6b6b80] mb-4">{tier.desc}</p>
                  <Link href={tier.href} className={`flex items-center justify-center w-full py-2 rounded-[7px] text-[12.5px] font-semibold transition-all mb-4 ${tier.highlight ? "bg-[#8BB8D8] text-white hover:bg-[#6FA3C8]" : "bg-[#f3f3f8] text-[#0d0d1a] hover:bg-[#EEF5FB] border border-[#e8e8f0]"}`}>
                    {tier.cta}
                  </Link>
                  <div className="space-y-2">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-[11.5px] text-[#0d0d1a]">
                        <CheckCircle2 size={12} className="text-[#8BB8D8] shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECURITY ─── */}
      <section className="px-6 py-18">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8BB8D8] mb-2.5">Security</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-9">Enterprise-grade from day one.</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Lock, label: "Row Level Security", desc: "PostgreSQL RLS enforced on every query" },
              { icon: Shield, label: "EU Data Residency", desc: "All data stored in EU-West by default" },
              { icon: Globe, label: "TLS Everywhere", desc: "All traffic encrypted in transit" },
              { icon: BarChart3, label: "Audit Logs", desc: "Every API call logged and searchable" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="sec-icon group text-center cursor-default">
                <div className="sec-icon-inner w-11 h-11 rounded-[10px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center mx-auto mb-3">
                  <Icon size={17} className="text-[#5890B8]" />
                </div>
                <p className="text-[12.5px] font-bold text-[#0d0d1a] mb-1">{label}</p>
                <p className="text-[11px] text-[#9494a8] leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <BudruumLogo size={52} />
          </div>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">
            Ready to own your infrastructure?
          </h2>
          <p className="text-[13.5px] text-[#6b6b80] mb-7 leading-relaxed max-w-[360px] mx-auto">
            Set up your first project in under 5 minutes.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/signup" className="btn-primary inline-flex items-center gap-2 bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[7px] shadow-sm">
              Create free account <ArrowRight size={13} />
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555566] px-5 py-2.5 rounded-[7px] border border-[#C5DCF0] bg-white hover:border-[#8BB8D8] transition-all">
              Create free account
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="px-6 py-20 bg-white border-y border-[#ebebf0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8BB8D8] mb-2.5">Customers</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-2">Trusted by agencies worldwide.</h2>
            <p className="text-[13.5px] text-[#6b6b80]">Here&apos;s what teams building on Budruum say.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[
              { quote: "We used to spend £400/month across multiple platforms per client. Budruum is £29 total and covers all of it.", name: "Sarah M.", role: "Technical Director, Craft Studio", initial: "S" },
              { quote: "The branch preview database feature alone saved us three client incidents last quarter. Nothing like it exists anywhere else.", name: "James K.", role: "CTO, Foundry Digital", initial: "J" },
              { quote: "Our clients see the Budruum dashboard and think we built custom infrastructure. That's the white-label dream right there.", name: "Priya N.", role: "Founder, Studio North", initial: "P" },
              { quote: "Switching from Supabase meant we own our margins again. Budruum's agency plan paid for itself in the first week.", name: "Tom R.", role: "Lead Engineer, Watershed", initial: "T" },
              { quote: "EU data residency out of the box, no configuration. Our compliance team signed off in 10 minutes. Unheard of.", name: "Elena V.", role: "Head of Eng, Arc Collective", initial: "E" },
              { quote: "I have 14 client projects running on Budruum. One dashboard, one invoice, zero drama. I'm never going back.", name: "Marcus O.", role: "Freelance Tech Lead", initial: "M" },
            ].map(({ quote, name, role, initial }) => (
              <div key={name} className="bg-[#fafafa] border border-[#e8e8f0] rounded-[14px] p-5 flex flex-col gap-4">
                <p className="text-[12.5px] text-[#0d0d1a] leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-2.5 pt-2 border-t border-[#f0f0f8]">
                  <div className="w-8 h-8 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8] flex-shrink-0">{initial}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0d0d1a]">{name}</p>
                    <p className="text-[11px] text-[#9494a8]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/customers" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#5890B8] hover:text-[#8BB8D8] transition-colors">
              Read customer stories <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#e8e8f0] bg-white">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-7">
          <div className="grid grid-cols-5 gap-7 mb-9">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Product</p>
              <div className="space-y-2">
                {[
                  { l: "Features", href: "/#features" },
                  { l: "Pricing", href: "/pricing" },
                  { l: "Changelog", href: "/changelog" },
                  { l: "Security", href: "/security" },
                  { l: "Customers", href: "/customers" },
                ].map(({ l, href }) => (
                  <Link key={l} href={href} className="block text-[12px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Developers</p>
              <div className="space-y-2">
                {[
                  { l: "Documentation", href: "/docs" },
                  { l: "API Reference", href: "/docs" },
                  { l: "Database", href: "/database" },
                  { l: "Storage", href: "/storage" },
                  { l: "Edge Functions", href: "/functions" },
                ].map(({ l, href }) => (
                  <Link key={l} href={href} className="block text-[12px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Company</p>
              <div className="space-y-2">
                {[
                  { l: "About", href: "/about" },
                  { l: "Blog", href: "/blog" },
                  { l: "Changelog", href: "/changelog" },
                  { l: "Privacy", href: "/security" },
                  { l: "Terms", href: "/security" },
                ].map(({ l, href }) => (
                  <Link key={l} href={href} className="block text-[12px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Connect</p>
              <div className="space-y-2">
                {[{ l: "GitHub", I: GitHubIcon }, { l: "Vercel", I: VercelIcon }, { l: "Discord", I: DiscordIcon }, { l: "Instagram", I: InstagramIcon }, { l: "TikTok", I: TikTokIcon }].map(({ l, I }) => (
                  <a key={l} href="https://github.com/1702london-maker/BudruumCloud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">
                    <I />{l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Newsletter</p>
              <p className="text-[11px] text-[#9494a8] mb-3 leading-snug">Platform updates and developer resources.</p>
              <input type="email" placeholder="your@email.com"
                className="w-full border border-[#e8e8f0] rounded-[6px] px-3 py-1.5 text-[11.5px] text-[#0d0d1a] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] mb-2" />
              <button className="w-full bg-[#8BB8D8] text-white text-[11.5px] font-semibold py-1.5 rounded-[6px] hover:bg-[#6FA3C8] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div className="border-t border-[#e8e8f0] pt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BudruumLogo size={18} />
              <span className="text-[11.5px] text-[#9494a8]">© 2026 Budruum. All rights reserved.</span>
            </div>
            <p className="text-[11px] text-[#c0c0d0]">Private BaaS for agencies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
