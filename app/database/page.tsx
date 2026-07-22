import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function DatabasePage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.35) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF5FB] border border-[#C5DCF0] rounded-full px-3 py-1 mb-6 anim-logo">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8BB8D8]" />
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Postgres Database</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Every project starts<br />with a <span className="gradient-text">great database.</span>
          </h1>
          <p className="text-[16px] text-[#6b6b80] max-w-xl mx-auto mb-8 leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            Full Postgres. Zero compromise. Instant provisioning, branch environments per PR, and a visual table editor that agencies love.
          </p>
          <div className="flex items-center justify-center gap-3 anim-hero" style={{ animationDelay: "0.18s" }}>
            <a href="/signup" className="btn-primary bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px]">Start for free</a>
            <Link href="/docs" className="text-[13px] font-semibold text-[#0d0d1a] px-5 py-2.5 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">Read the docs</Link>
          </div>
        </div>
      </section>

      {/* DB visual — fake schema */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto rounded-[16px] border border-[#e8e8f0] overflow-hidden shadow-sm">
          <div className="bg-[#f8f8fc] border-b border-[#e8e8f0] px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e8e8f0]" />
            <div className="w-3 h-3 rounded-full bg-[#e8e8f0]" />
            <div className="w-3 h-3 rounded-full bg-[#e8e8f0]" />
            <span className="ml-3 text-[11.5px] text-[#9494a8] font-medium">Table Editor — projects</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#e8e8f0] bg-[#fafafa]">
                  {["id", "name", "owner_id", "region", "status", "created_at"].map(c => (
                    <th key={c} className="px-4 py-2.5 text-left font-semibold text-[#6b6b80] whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "agency-portal", "usr_9xk2", "eu-west-1", "active", "2026-01-12"],
                  ["2", "client-crm", "usr_9xk2", "eu-west-1", "active", "2026-02-08"],
                  ["3", "media-library", "usr_4ab7", "us-east-1", "active", "2026-03-15"],
                  ["4", "analytics-v2", "usr_4ab7", "ap-south-1", "paused", "2026-05-01"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#f0f0f8] hover:bg-[#EEF5FB] transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2.5 font-mono text-[#0d0d1a] whitespace-nowrap">
                        {j === 4 ? (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cell === "active" ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-[#f3f3f8] text-[#9494a8]"}`}>{cell}</span>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">What you get</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">
            Postgres. But the good version.
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Instant provisioning", body: "A fully configured Postgres database ready in under 60 seconds. No YAML, no CLI flags, no waiting." },
              { icon: "🌿", title: "Branch databases", body: "Every pull request gets its own preview DB with a snapshot of your schema. Merge and it's gone. Zero cost for previews." },
              { icon: "🛡️", title: "Row Level Security", body: "Policy-based access control built into Postgres itself. Secure your data at the row level without touching your application code." },
              { icon: "📦", title: "Extensions library", body: "Enable pgvector, PostGIS, pg_cron, uuid-ossp and 50+ more with a single toggle in the dashboard." },
              { icon: "🔄", title: "Drizzle ORM native", body: "Push and pull migrations with Drizzle Kit. The dashboard stays in sync. Your schema is always the source of truth." },
              { icon: "🔌", title: "Connection pooling", body: "PgBouncer runs in transaction mode by default. Handle thousands of serverless connections without overloading Postgres." },
              { icon: "💾", title: "Daily backups", body: "Automated backups every 24 hours, retained for 7 days on Starter and 30 days on Pro. Restore to any point in seconds." },
              { icon: "📊", title: "Query analytics", body: "Slow query log, index usage stats, and a live performance advisor that tells you exactly which indexes to add." },
              { icon: "🌍", title: "Multi-region", body: "Deploy your database in London, Frankfurt, New York, Singapore, or Sydney. Data stays in your region by default." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="feature-card bg-white border border-[#e8e8f0] rounded-[12px] p-5">
                <div className="card-icon w-9 h-9 rounded-[8px] border border-[#e8e8f0] bg-[#fafafa] flex items-center justify-center text-[18px] mb-4 transition-all">{icon}</div>
                <h3 className="text-[13px] font-bold text-[#0d0d1a] mb-1.5">{title}</h3>
                <p className="text-[12px] text-[#6b6b80] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">Developer experience</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              Write queries.<br />Not configuration.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-6">
              The Budruum client library gives you a typed query builder backed by your real schema. Auto-complete in VS Code, type errors at compile time, and zero-config connection management.
            </p>
            <div className="space-y-3">
              {["Auto-typed from your schema", "Works with Next.js, Remix, SvelteKit", "Edge-compatible client", "Connection pooling built-in"].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4l2 2L6.5 2" stroke="#5890B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  </div>
                  <span className="text-[12.5px] text-[#6b6b80]">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[12px] border border-[#e8e8f0] overflow-hidden shadow-sm">
            <div className="bg-[#f8f8fc] border-b border-[#e8e8f0] px-4 py-2.5 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <span className="ml-2 text-[11px] text-[#9494a8]">queries.ts</span>
            </div>
            <pre className="p-5 text-[12px] leading-relaxed overflow-x-auto bg-white" style={{ fontFamily: "var(--font-mono)" }}>
              <code>{`import { budruum } from "@budruum/client"

// Fully typed from your schema
const { data: projects } = await budruum
  .from("projects")
  .select("id, name, status, created_at")
  .eq("owner_id", user.id)
  .order("created_at", { ascending: false })
  .limit(10)

// RLS applies automatically — no WHERE clause needed
const { data: clients } = await budruum
  .from("clients")
  .select(\`
    id, company_name,
    contacts(id, name, email)
  \`)
  .eq("status", "active")

// Upsert with conflict resolution
await budruum.from("projects").upsert({
  id: project.id,
  name: "Rebrand 2026",
  status: "active"
}, { onConflict: "id" })`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* RLS explainer */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div className="rounded-[12px] border border-[#C5DCF0] bg-white overflow-hidden shadow-sm">
            <div className="border-b border-[#e8e8f0] px-4 py-2.5 bg-[#f8f8fc]">
              <span className="text-[11px] text-[#9494a8] font-medium">SQL — RLS Policy</span>
            </div>
            <pre className="p-5 text-[12px] leading-relaxed bg-white overflow-x-auto" style={{ fontFamily: "var(--font-mono)" }}>
              <code>{`-- Enable RLS on the projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Owners can always read their own projects
CREATE POLICY "owner_read_projects"
ON projects FOR SELECT
USING (owner_id = auth.uid());

-- Only the owner can update their project
CREATE POLICY "owner_update_projects"
ON projects FOR UPDATE
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Invited members get read access
CREATE POLICY "member_read_projects"
ON projects FOR SELECT
USING (
  id IN (
    SELECT project_id FROM memberships
    WHERE user_id = auth.uid()
  )
);`}
              </code>
            </pre>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">Row Level Security</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              Security that lives<br />in the database.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-5">
              Write access control policies in SQL — right next to your schema. They enforce at the database layer, not in your application. Even if your API has a bug, the data stays safe.
            </p>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed">
              The Budruum dashboard has a visual policy editor so non-Postgres developers can create, test, and audit RLS policies without writing raw SQL.
            </p>
          </div>
        </div>
      </section>

      {/* Migration section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4">Migrate in an afternoon.</h2>
          <p className="text-[13px] text-[#6b6b80] max-w-lg mx-auto mb-10">Already on Postgres somewhere else? We've built migration guides for the most common starting points.</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { from: "Firebase Firestore", time: "~2 hours", note: "Schema mapping tool included" },
              { from: "Heroku Postgres", time: "~30 min", note: "Direct pg_dump import" },
              { from: "PlanetScale / MySQL", time: "~4 hours", note: "Dialect converter + type map" },
            ].map(({ from, time, note }) => (
              <div key={from} className="stack-card border border-[#e8e8f0] rounded-[12px] p-5 text-left">
                <p className="text-[12px] font-semibold text-[#9494a8] mb-2">From</p>
                <p className="text-[14px] font-bold text-[#0d0d1a] mb-3">{from}</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-[#8BB8D8] font-semibold">{time}</span>
                </div>
                <p className="text-[11.5px] text-[#9494a8]">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Your first database is free.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">No credit card. No time limit. Start building and upgrade when you scale.</p>
          <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Create your database</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

