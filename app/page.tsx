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
  { icon: Database, label: "Postgres Database", desc: "Serverless PostgreSQL with instant branching. Every client gets their own isolated database, fully managed and infinitely scalable.", tag: "Core" },
  { icon: Shield, label: "Authentication", desc: "Email, Google OAuth, magic links, MFA, and session management. Enterprise-grade identity out of the box.", tag: "Core" },
  { icon: HardDrive, label: "File Storage", desc: "S3-compatible object storage via Cloudflare R2. Zero egress fees, presigned URLs, public or private buckets.", tag: "Core" },
  { icon: Zap, label: "Edge Functions", desc: "Deploy TypeScript serverless functions globally on Cloudflare Workers. Webhooks, cron, AI calls — all at the edge.", tag: "Advanced" },
  { icon: GitBranch, label: "GitHub Integration", desc: "Push to a branch, get an isolated preview database automatically. Merge and migrations apply to production instantly.", tag: "Advanced" },
  { icon: Key, label: "Auto Env Injection", desc: "Connect to Vercel and all your API keys are pushed automatically to every deployment. No manual .env copying ever again.", tag: "Advanced" },
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

// Social icon SVGs
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const VercelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 22.525H0l12-21.05 12 21.05z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
  </svg>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      <MegaNav />

      {/* ── HERO ── */}
      <section className="pt-[130px] pb-20 px-6 text-center relative overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(#1b1b23 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        {/* Large blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(197,220,240,0.45) 0%, transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto">
          {/* HUGE logo — just the mark, no text */}
          <div className="flex justify-center mb-10 anim-logo">
            <BudruumLogo size={110} />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#EEF5FB] border border-[#C5DCF0] text-[#5890B8] text-[12px] font-semibold px-4 py-2 rounded-full mb-7 shadow-sm anim-hero" style={{ animationDelay: "0.1s" }}>
            <span className="w-1.5 h-1.5 bg-[#8BB8D8] rounded-full animate-pulse" />
            Now in private beta · Built for agencies & studios
          </div>

          <h1 className="text-[68px] md:text-[80px] font-extrabold tracking-[-0.045em] text-[#1b1b23] leading-[1.0] mb-6 anim-hero" style={{ animationDelay: "0.18s" }}>
            Your own backend.<br />
            <span style={{ color: "#8BB8D8" }}>Every client.</span>
          </h1>

          <p className="text-[18px] text-[#6b6b80] max-w-[560px] mx-auto mb-10 leading-[1.75] anim-hero" style={{ animationDelay: "0.28s" }}>
            Budruum is a private Backend-as-a-Service platform built for agencies.
            Database, auth, storage, edge functions — all under your infrastructure,
            your billing, your brand.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-14 anim-hero" style={{ animationDelay: "0.38s" }}>
            <Link href="/signup"
              className="flex items-center gap-2 bg-[#8BB8D8] text-white text-[14px] font-bold px-7 py-3.5 rounded-[8px] hover:bg-[#6FA3C8] transition-all shadow-lg">
              Start building for free <ArrowRight size={15} />
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-2 bg-white text-[#1b1b23] text-[14px] font-semibold px-7 py-3.5 rounded-[8px] border-2 border-[#C5DCF0] hover:bg-[#EEF5FB] transition-all">
              View demo dashboard
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-7 text-[13px] text-[#9494a8] anim-hero" style={{ animationDelay: "0.48s" }}>
            {["No credit card required", "Free tier available", "EU data residency"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#8BB8D8]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[18px] border-2 border-[#C5DCF0] overflow-hidden shadow-2xl shadow-[#C5DCF0]/30">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#EEF5FB] border-b border-[#C5DCF0]">
              <span className="w-3 h-3 rounded-full bg-[#fca5a5]" />
              <span className="w-3 h-3 rounded-full bg-[#fde68a]" />
              <span className="w-3 h-3 rounded-full bg-[#bbf7d0]" />
              <div className="flex-1 mx-4 bg-white border border-[#e8e8f0] rounded-[5px] px-3 py-1.5 text-[11px] text-[#9494a8] font-mono">
                cloud.budruum.com/project/dehadza-homes/editor
              </div>
            </div>
            <div className="flex" style={{ height: "400px" }}>
              {/* Sidebar */}
              <div className="w-[200px] bg-[#f8f8fc] border-r border-[#e8e8f0] flex flex-col p-3 gap-0.5">
                <div className="flex items-center gap-2 px-2 py-2 mb-3">
                  <BudruumLogo size={20} />
                </div>
                <div className="px-2 py-1.5 rounded-[5px] bg-[#EEF5FB] text-[#5890B8] text-[12px] font-semibold border border-[#C5DCF0]">Table Editor</div>
                {["SQL Editor", "Database", "Storage", "Authentication", "API Keys", "Logs"].map((item) => (
                  <div key={item} className="px-2 py-1.5 rounded-[5px] text-[#6b6b80] text-[12px] hover:bg-[#f3f3f8] cursor-default">{item}</div>
                ))}
              </div>
              {/* Main */}
              <div className="flex-1 bg-white overflow-hidden">
                <div className="h-[48px] border-b border-[#e8e8f0] flex items-center justify-between px-5">
                  <div>
                    <span className="text-[13px] font-semibold text-[#1b1b23]">Table Editor</span>
                    <span className="text-[11px] text-[#9494a8] ml-2">View and edit your database records</span>
                  </div>
                </div>
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
                      {["id", "created_at", "email", "full_name", "role", "status"].map((col) => (
                        <th key={col} className="text-left px-4 py-2.5 font-semibold uppercase tracking-wider text-[#9494a8] border-r border-[#e8e8f0]">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1", "2026-07-20", "alice@example.com", "Alice Martins", "admin", "active"],
                      ["2", "2026-07-19", "bob@example.com", "Bob Johnson", "user", "active"],
                      ["3", "2026-07-18", "carol@example.com", "Carol Smith", "user", "inactive"],
                      ["4", "2026-07-17", "dan@example.com", "Dan Williams", "editor", "active"],
                      ["5", "2026-07-16", "emma@example.com", "Emma Davis", "user", "active"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#e8e8f0] hover:bg-[#EEF5FB] transition-colors cursor-default">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-2.5 font-mono border-r border-[#e8e8f0] text-[#1b1b23]">
                            {j === 5 ? (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cell === "active" ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-[#f3f3f8] text-[#9494a8]"}`}>{cell}</span>
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

      {/* ── ANIMATED STATS + CHART ── */}
      <AnimatedStats />

      {/* ── FEATURES ── */}
      <section className="px-6 py-28 bg-[#f8f8fc] border-y border-[#e8e8f0]" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8BB8D8] mb-4">Platform capabilities</p>
            <h2 className="text-[42px] font-extrabold tracking-tight text-[#1b1b23] leading-tight mb-5">
              One platform.<br />Every backend service your clients need.
            </h2>
            <p className="text-[16px] text-[#6b6b80] max-w-[500px] mx-auto leading-relaxed">
              Stop paying third-party BaaS fees for every client project. Own the infrastructure. Keep the margin.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, label, desc, tag }) => (
              <div key={label}
                className="group border border-[#e8e8f0] rounded-[14px] p-6 bg-white hover:border-[#C5DCF0] hover:shadow-xl hover:shadow-[#C5DCF0]/20 transition-all duration-300 cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center group-hover:bg-[#C5DCF0] transition-colors">
                    <Icon size={18} className="text-[#5890B8]" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full ${
                    tag === "Core"
                      ? "bg-[#EEF5FB] text-[#5890B8] border border-[#C5DCF0]"
                      : "bg-[#f3f3f8] text-[#9494a8] border border-[#e8e8f0]"
                  }`}>{tag}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#1b1b23] mb-2">{label}</h3>
                <p className="text-[13px] text-[#6b6b80] leading-[1.65]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8BB8D8] mb-4">How it works</p>
            <h2 className="text-[40px] font-extrabold tracking-tight text-[#1b1b23]">Ship in minutes, not days.</h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-[26px] left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-[2px] bg-[#C5DCF0]" />

            <div className="grid grid-cols-3 gap-8">
              {[
                { step: "01", title: "Create a project", desc: "Name your project, pick your region, and we provision a Postgres database, storage bucket, and auth system instantly." },
                { step: "02", title: "Connect GitHub + Vercel", desc: "One click to link your repo. Every PR gets an isolated preview database. Every Vercel deploy gets env vars auto-injected." },
                { step: "03", title: "Install @budruum/client", desc: "Two lines of code. Your client is now talking to your own backend — database, auth, storage, all ready." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="relative pt-2">
                  <div className="w-[52px] h-[52px] rounded-full bg-white border-2 border-[#C5DCF0] flex items-center justify-center mb-6 shadow-sm relative z-10">
                    <span className="text-[14px] font-bold text-[#8BB8D8]">{step}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1b1b23] mb-2">{title}</h3>
                  <p className="text-[13px] text-[#6b6b80] leading-[1.65]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CODE SECTION ── */}
      <section className="px-6 py-24 bg-[#f8f8fc] border-y border-[#e8e8f0]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8BB8D8] mb-4">Developer experience</p>
            <h2 className="text-[36px] font-extrabold tracking-tight text-[#1b1b23] leading-tight mb-5">
              Built for developers.<br />Ready on day one.
            </h2>
            <p className="text-[14px] text-[#6b6b80] leading-[1.7] mb-8">
              The <code className="bg-[#EEF5FB] px-1.5 py-0.5 rounded text-[#5890B8] font-mono text-[12px]">@budruum/client</code> SDK gives you a clean, intuitive API for database, auth, and storage — with full TypeScript support and zero boilerplate.
            </p>
            <div className="space-y-3">
              {[
                "Full TypeScript support with generated types",
                "Realtime subscriptions over WebSockets",
                "Row Level Security enforced at database level",
                "Automatic retry with exponential backoff",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[13px] text-[#1b1b23]">
                  <CheckCircle2 size={15} className="text-[#8BB8D8] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border-2 border-[#C5DCF0] overflow-hidden shadow-xl shadow-[#C5DCF0]/25">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#EEF5FB] border-b border-[#C5DCF0]">
              <span className="w-3 h-3 rounded-full bg-[#fca5a5]" />
              <span className="w-3 h-3 rounded-full bg-[#fde68a]" />
              <span className="w-3 h-3 rounded-full bg-[#bbf7d0]" />
              <span className="ml-2 text-[11px] text-[#9494a8] font-mono">lib/budruum.ts</span>
            </div>
            <pre className="p-6 text-[12.5px] font-mono leading-[1.85] bg-white overflow-x-auto text-[#1b1b23]">{`// npm install @budruum/client
import { createClient } from '@budruum/client'

export const budruum = createClient(
  process.env.BUDRUUM_URL,
  process.env.BUDRUUM_ANON_KEY
)

// Query your database
const { data } = await budruum
  .db.from('products')
  .select('*')
  .eq('status', 'active')

// Upload a file
await budruum.storage
  .from('images')
  .upload('logo.png', file)`}</pre>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[11px] font-bold tracking-[0.14em] uppercase text-[#9494a8] mb-10">Built on world-class open infrastructure</p>
          <div className="grid grid-cols-4 gap-3">
            {STACK.map(({ name, role }) => (
              <div key={name}
                className="bg-white border border-[#e8e8f0] rounded-[10px] px-4 py-4 flex items-center gap-3 hover:border-[#C5DCF0] hover:bg-[#EEF5FB] hover:shadow-sm transition-all cursor-default">
                <div className="w-2 h-2 rounded-full bg-[#8BB8D8] shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1b1b23]">{name}</p>
                  <p className="text-[11px] text-[#9494a8]">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="px-6 py-28 bg-[#f8f8fc] border-y border-[#e8e8f0]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8BB8D8] mb-4">Pricing</p>
            <h2 className="text-[40px] font-extrabold tracking-tight text-[#1b1b23] mb-4">Simple, transparent pricing.</h2>
            <p className="text-[15px] text-[#6b6b80]">One flat monthly fee. All the infrastructure you need.</p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                name: "Starter", price: "£29", period: "/project/mo",
                desc: "Perfect for launching a client's first project.",
                features: ["1 Postgres database", "500MB storage", "10k API calls/day", "Auth up to 1,000 users", "Dashboard access", "GitHub integration"],
                cta: "Start free", highlight: false,
              },
              {
                name: "Pro", price: "£79", period: "/project/mo",
                desc: "For growing client projects with serious traffic.",
                features: ["Everything in Starter", "5GB storage", "100k API calls/day", "Unlimited auth users", "Branch preview DBs", "Edge Functions", "Realtime"],
                cta: "Get Pro", highlight: true,
              },
              {
                name: "Agency", price: "£249", period: "/mo unlimited",
                desc: "Run all your client projects under one roof.",
                features: ["Everything in Pro", "Unlimited projects", "Custom domain", "White-label dashboard", "99.9% SLA", "Priority support", "Dedicated infra"],
                cta: "Talk to us", highlight: false,
              },
            ].map((tier) => (
              <div key={tier.name} className={`rounded-[14px] overflow-hidden border transition-all ${
                tier.highlight
                  ? "border-[#8BB8D8] shadow-xl shadow-[#C5DCF0]/40"
                  : "border-[#e8e8f0] hover:border-[#C5DCF0] hover:shadow-md"
              }`}>
                {tier.highlight && (
                  <div className="bg-[#8BB8D8] py-2 text-center text-[11px] font-bold text-white tracking-wider uppercase">
                    Most popular
                  </div>
                )}
                <div className="p-6 bg-white">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#9494a8] mb-2">{tier.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-[38px] font-extrabold tracking-tight text-[#1b1b23]">{tier.price}</span>
                    <span className="text-[13px] text-[#9494a8] mb-2">{tier.period}</span>
                  </div>
                  <p className="text-[13px] text-[#6b6b80] mb-6">{tier.desc}</p>
                  <Link href="/signup"
                    className={`flex items-center justify-center w-full py-2.5 rounded-[8px] text-[13px] font-bold transition-all mb-6 ${
                      tier.highlight
                        ? "bg-[#8BB8D8] text-white hover:bg-[#6FA3C8] shadow-md"
                        : "bg-[#f3f3f8] text-[#1b1b23] hover:bg-[#EEF5FB] hover:border-[#C5DCF0] border border-[#e8e8f0]"
                    }`}>
                    {tier.cta}
                  </Link>
                  <div className="space-y-2.5">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-[13px] text-[#1b1b23]">
                        <CheckCircle2 size={14} className="text-[#8BB8D8] shrink-0" />
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

      {/* ── SECURITY ── */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8BB8D8] mb-4">Security & Compliance</p>
          <h2 className="text-[34px] font-extrabold tracking-tight text-[#1b1b23] mb-12">Enterprise-grade from day one.</h2>
          <div className="grid grid-cols-4 gap-5">
            {[
              { icon: Lock, label: "Row Level Security", desc: "PostgreSQL RLS enforced on every query" },
              { icon: Shield, label: "EU Data Residency", desc: "All data stored in EU-West by default" },
              { icon: Globe, label: "TLS Everywhere", desc: "All traffic encrypted in transit" },
              { icon: BarChart3, label: "Audit Logs", desc: "Every API call logged and searchable" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center group">
                <div className="w-12 h-12 rounded-[12px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5DCF0] transition-colors">
                  <Icon size={20} className="text-[#5890B8]" />
                </div>
                <p className="text-[14px] font-bold text-[#1b1b23] mb-1">{label}</p>
                <p className="text-[12px] text-[#9494a8]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 bg-[#EEF5FB] border-y-2 border-[#C5DCF0]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-7">
            <BudruumLogo size={80} />
          </div>
          <h2 className="text-[38px] font-extrabold tracking-tight text-[#1b1b23] mb-4">
            Ready to own your infrastructure?
          </h2>
          <p className="text-[15px] text-[#6b6b80] mb-9 leading-relaxed max-w-[480px] mx-auto">
            Join agencies already running their client projects on Budruum.
            Set up your first project in under 5 minutes.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/signup"
              className="flex items-center gap-2 bg-[#8BB8D8] text-white text-[14px] font-bold px-7 py-3.5 rounded-[8px] hover:bg-[#6FA3C8] transition-all shadow-md">
              Create free account <ArrowRight size={15} />
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-2 bg-white text-[#1b1b23] text-[14px] font-semibold px-7 py-3.5 rounded-[8px] border-2 border-[#C5DCF0] hover:bg-white hover:border-[#8BB8D8] transition-all">
              View demo →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e8e8f0] bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
          <div className="grid grid-cols-5 gap-10 mb-12">

            {/* Col 1: Product */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-4">Product</p>
              <div className="space-y-2.5">
                {["Features", "Pricing", "Changelog", "Roadmap", "Status"].map((link) => (
                  <a key={link} href="#" className="block text-[13px] text-[#6b6b80] hover:text-[#1b1b23] transition-colors">{link}</a>
                ))}
              </div>
            </div>

            {/* Col 2: Developers */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-4">Developers</p>
              <div className="space-y-2.5">
                {["Documentation", "API Reference", "@budruum/client", "Open Source", "Community"].map((link) => (
                  <a key={link} href="#" className="block text-[13px] text-[#6b6b80] hover:text-[#1b1b23] transition-colors">{link}</a>
                ))}
              </div>
            </div>

            {/* Col 3: Company */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-4">Company</p>
              <div className="space-y-2.5">
                {["About", "Blog", "Careers", "Privacy Policy", "Terms of Service"].map((link) => (
                  <a key={link} href="#" className="block text-[13px] text-[#6b6b80] hover:text-[#1b1b23] transition-colors">{link}</a>
                ))}
              </div>
            </div>

            {/* Col 4: Connect */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-4">Connect</p>
              <div className="space-y-3">
                {[
                  { label: "GitHub", Icon: GitHubIcon },
                  { label: "Vercel", Icon: VercelIcon },
                  { label: "Discord", Icon: DiscordIcon },
                  { label: "Instagram", Icon: InstagramIcon },
                  { label: "TikTok", Icon: TikTokIcon },
                ].map(({ label, Icon }) => (
                  <a key={label} href="#"
                    className="flex items-center gap-2.5 text-[13px] text-[#6b6b80] hover:text-[#1b1b23] transition-colors group">
                    <span className="w-7 h-7 rounded-[6px] bg-[#f3f3f8] border border-[#e8e8f0] flex items-center justify-center group-hover:bg-[#EEF5FB] group-hover:border-[#C5DCF0] transition-colors">
                      <Icon />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 5: Newsletter */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-4">Newsletter</p>
              <p className="text-[12px] text-[#6b6b80] leading-relaxed mb-4">
                Platform updates, technical deep-dives, and agency insights — monthly.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="you@agency.com"
                  className="w-full px-3 py-2.5 border border-[#e8e8f0] rounded-[7px] text-[13px] text-[#1b1b23] placeholder:text-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] focus:ring-2 focus:ring-[#EEF5FB] bg-white transition-all"
                />
                <button className="w-full bg-[#8BB8D8] text-white text-[13px] font-semibold py-2.5 rounded-[7px] hover:bg-[#6FA3C8] transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] text-[#c0c0d0] mt-2">No spam, unsubscribe anytime.</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#e8e8f0] pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BudruumLogo size={22} />
              <span className="text-[12px] text-[#9494a8]">© 2026 Budruum. Built by Budruum Agency.</span>
            </div>
            <p className="text-[12px] text-[#9494a8]">EU data · Powered by Cloudflare · Hosted on Vercel</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
