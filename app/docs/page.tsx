import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

export default function DocsPage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.3) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-[40px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-4 anim-hero">
            Documentation
          </h1>
          <p className="text-[15px] text-[#6b6b80] mb-6 anim-hero" style={{ animationDelay: "0.07s" }}>
            Guides, references, and examples for every Budruum product.
          </p>
          <div className="relative max-w-md mx-auto anim-hero" style={{ animationDelay: "0.12s" }}>
            <input type="text" placeholder="Search documentation…"
              className="w-full border border-[#e8e8f0] rounded-[10px] pl-10 pr-4 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] shadow-sm" />
            <svg className="absolute left-3 top-3 text-[#c0c0d0]" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { icon: "⚡", label: "Quickstart", href: "/docs/quickstart", desc: "Get a project running in 5 minutes" },
              { icon: "📦", label: "Install the SDK", href: "/docs/client", desc: "npm install @budruum/client" },
              { icon: "🗄️", label: "Database guide", href: "/docs/database", desc: "Tables, queries, and migrations" },
              { icon: "🔐", label: "Auth guide", href: "/docs/auth", desc: "Sign up, login, and sessions" },
            ].map(({ icon, label, href, desc }) => (
              <a key={label} href={href} className="feature-card flex items-center gap-4 border border-[#e8e8f0] rounded-[12px] p-4 hover:border-[#8BB8D8] transition-all">
                <div className="card-icon w-10 h-10 rounded-[8px] border border-[#e8e8f0] bg-[#fafafa] flex items-center justify-center text-[20px] flex-shrink-0 transition-all">{icon}</div>
                <div>
                  <p className="text-[13px] font-bold text-[#0d0d1a]">{label}</p>
                  <p className="text-[11.5px] text-[#9494a8]">{desc}</p>
                </div>
                <svg className="ml-auto text-[#c0c0d0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main docs grid */}
      <section className="px-6 py-12 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: "Database",
                icon: "🗄️",
                links: [
                  { label: "Tables & Columns", href: "/docs/database/tables" },
                  { label: "Querying data", href: "/docs/database/querying" },
                  { label: "Inserting data", href: "/docs/database/insert" },
                  { label: "Row Level Security", href: "/docs/database/rls" },
                  { label: "Postgres extensions", href: "/docs/database/extensions" },
                  { label: "Branching", href: "/docs/database/branching" },
                  { label: "Migrations with Drizzle", href: "/docs/database/drizzle" },
                  { label: "Connection pooling", href: "/docs/database/pooling" },
                ],
              },
              {
                title: "Authentication",
                icon: "🔐",
                links: [
                  { label: "Overview", href: "/docs/auth/overview" },
                  { label: "Email & password", href: "/docs/auth/email" },
                  { label: "OAuth providers", href: "/docs/auth/oauth" },
                  { label: "Magic links", href: "/docs/auth/magic-link" },
                  { label: "MFA / TOTP", href: "/docs/auth/mfa" },
                  { label: "Session management", href: "/docs/auth/sessions" },
                  { label: "User management", href: "/docs/auth/users" },
                  { label: "Webhooks", href: "/docs/auth/webhooks" },
                ],
              },
              {
                title: "Storage",
                icon: "📦",
                links: [
                  { label: "Overview", href: "/docs/storage/overview" },
                  { label: "Creating buckets", href: "/docs/storage/buckets" },
                  { label: "Uploading files", href: "/docs/storage/upload" },
                  { label: "Downloading files", href: "/docs/storage/download" },
                  { label: "Presigned URLs", href: "/docs/storage/signed-urls" },
                  { label: "Image transforms", href: "/docs/storage/transforms" },
                  { label: "Access control", href: "/docs/storage/access-control" },
                  { label: "CDN configuration", href: "/docs/storage/cdn" },
                ],
              },
              {
                title: "Edge Functions",
                icon: "⚡",
                links: [
                  { label: "Overview", href: "/docs/functions/overview" },
                  { label: "Writing functions", href: "/docs/functions/writing" },
                  { label: "Deploying", href: "/docs/functions/deploy" },
                  { label: "Environment variables", href: "/docs/functions/env" },
                  { label: "Invoking functions", href: "/docs/functions/invoke" },
                  { label: "Scheduling (cron)", href: "/docs/functions/cron" },
                  { label: "Webhook handlers", href: "/docs/functions/webhooks" },
                  { label: "Logs & debugging", href: "/docs/functions/logs" },
                ],
              },
              {
                title: "Realtime",
                icon: "📡",
                links: [
                  { label: "Overview", href: "/docs/realtime/overview" },
                  { label: "Database subscriptions", href: "/docs/realtime/db-changes" },
                  { label: "Broadcast channels", href: "/docs/realtime/broadcast" },
                  { label: "Presence", href: "/docs/realtime/presence" },
                  { label: "Filtering events", href: "/docs/realtime/filters" },
                  { label: "Unsubscribing", href: "/docs/realtime/unsubscribe" },
                ],
              },
              {
                title: "Platform",
                icon: "🔧",
                links: [
                  { label: "CLI reference", href: "/docs/cli" },
                  { label: "Project settings", href: "/docs/settings" },
                  { label: "Custom domains", href: "/docs/custom-domains" },
                  { label: "API keys", href: "/docs/api-keys" },
                  { label: "Billing", href: "/docs/billing" },
                  { label: "Data export", href: "/docs/export" },
                  { label: "Status page", href: "/status" },
                ],
              },
            ].map(({ title, icon, links }) => (
              <div key={title}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[16px]">{icon}</span>
                  <h3 className="text-[13px] font-bold text-[#0d0d1a]">{title}</h3>
                </div>
                <div className="space-y-1.5">
                  {links.map(({ label, href }) => (
                    <a key={label} href={href} className="block text-[12px] text-[#6b6b80] hover:text-[#5890B8] transition-colors">{label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework guides */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Framework guides</p>
          <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] text-center mb-8">Start from your stack</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Next.js", icon: "▲" },
              { name: "React", icon: "⚛" },
              { name: "SvelteKit", icon: "🧡" },
              { name: "Remix", icon: "💿" },
              { name: "Nuxt", icon: "💚" },
              { name: "Astro", icon: "🚀" },
              { name: "React Native", icon: "📱" },
              { name: "Flutter", icon: "🦋" },
            ].map(({ name, icon }) => (
              <a key={name} href={`/docs/framework/${name.toLowerCase().replace(" ", "-")}`}
                className="stack-card border border-[#e8e8f0] rounded-[10px] px-4 py-3 flex items-center gap-3 hover:border-[#C5DCF0] transition-all">
                <span className="text-[16px]">{icon}</span>
                <span className="text-[12.5px] font-semibold text-[#0d0d1a]">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
