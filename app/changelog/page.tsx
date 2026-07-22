import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

const RELEASES = [
  {
    version: "v2.4.0",
    date: "July 18, 2026",
    tag: "New feature",
    tagColor: "bg-[#EEF5FB] text-[#5890B8]",
    title: "Branch databases — now available on Starter",
    body: "Branch databases were previously a Pro-only feature. After strong feedback from the community, we've opened up 2 branch environments per project to Starter plan users. Preview PRs with real Postgres snapshots, for free.",
    items: [
      { type: "new", text: "Branch databases on Starter (2 branches per project)" },
      { type: "new", text: "Branch merge UI redesign — cleaner diff view" },
      { type: "fix", text: "Fixed a race condition when merging branches with conflicting migrations" },
      { type: "fix", text: "Branch status now updates in real-time on the dashboard" },
    ],
  },
  {
    version: "v2.3.0",
    date: "June 30, 2026",
    tag: "Performance",
    tagColor: "bg-[#f0fdf4] text-[#16a34a]",
    title: "Image transforms now run on Cloudflare's edge",
    body: "Storage image transformations previously processed in-region, adding 80–120ms to transform requests outside the database region. They now execute at the Cloudflare edge node closest to the requesting user.",
    items: [
      { type: "new", text: "Image transforms run at edge — avg 50ms globally (was 140ms)" },
      { type: "new", text: "Added WebP output format support" },
      { type: "new", text: "Added `quality` parameter for JPEG and WebP compression" },
      { type: "fix", text: "PNG transparency preserved correctly in resize operations" },
    ],
  },
  {
    version: "v2.2.0",
    date: "June 12, 2026",
    tag: "New feature",
    tagColor: "bg-[#EEF5FB] text-[#5890B8]",
    title: "Edge Functions: cron scheduling and scheduled invocations",
    body: "You can now schedule edge functions to run on a cron expression directly from the dashboard. No external scheduler, no Vercel crons config. Just a cron field in the function settings.",
    items: [
      { type: "new", text: "Cron scheduling for edge functions via dashboard" },
      { type: "new", text: "Manual trigger button for immediate one-off invocations" },
      { type: "new", text: "Invocation history with duration, status code, and log preview" },
      { type: "fix", text: "Environment variables now available in local `budruum functions serve`" },
    ],
  },
  {
    version: "v2.1.0",
    date: "May 20, 2026",
    tag: "Security",
    tagColor: "bg-[#fef2f2] text-[#dc2626]",
    title: "API key scoping and IP allowlisting",
    body: "Two highly-requested security features shipped together. API keys can now be scoped to specific tables and operations. Database access can be restricted to allowlisted IP ranges.",
    items: [
      { type: "new", text: "API key scoping — restrict keys to specific tables and HTTP methods" },
      { type: "new", text: "IP allowlisting for direct database connections" },
      { type: "new", text: "Key usage audit log — see which key made which request" },
      { type: "improved", text: "API key list now shows last-used timestamp and usage count" },
    ],
  },
  {
    version: "v2.0.0",
    date: "April 1, 2026",
    tag: "Major release",
    tagColor: "bg-[#fffbeb] text-[#d97706]",
    title: "Budruum 2.0 — Realtime, new dashboard, and Pro plan",
    body: "The biggest release since launch. Realtime subscriptions, a completely redesigned dashboard, paid plans, and a new @budruum/client SDK that replaces the previous beta client.",
    items: [
      { type: "new", text: "Realtime WebSocket subscriptions (Postgres CDC via Ably)" },
      { type: "new", text: "Presence and broadcast channels" },
      { type: "new", text: "Full dashboard redesign — faster, cleaner, keyboard-first" },
      { type: "new", text: "Pro plan at £25/month" },
      { type: "new", text: "@budruum/client v2 SDK (breaking changes — see migration guide)" },
      { type: "new", text: "SQL editor in dashboard with autocomplete" },
      { type: "improved", text: "Database provisioning time reduced from 90s to <20s" },
    ],
  },
];

const typeStyle: Record<string, { dot: string; label: string }> = {
  new: { dot: "bg-[#8BB8D8]", label: "New" },
  fix: { dot: "bg-[#9494a8]", label: "Fix" },
  improved: { dot: "bg-[#16a34a]", label: "Improved" },
};

export default function ChangelogPage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="pt-24 pb-12 px-6 border-b border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] mb-2 anim-hero">Changelog</h1>
          <p className="text-[14px] text-[#9494a8] anim-hero" style={{ animationDelay: "0.07s" }}>
            Every update, improvement, and fix to the Budruum platform — newest first.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-14">
            {RELEASES.map((release) => (
              <div key={release.version} className="grid grid-cols-[160px_1fr] gap-8">
                {/* Left col */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-[#9494a8] block">{release.date}</span>
                  <span className="text-[12px] font-bold text-[#0d0d1a] block mt-1 font-mono">{release.version}</span>
                  <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${release.tagColor}`}>{release.tag}</span>
                </div>

                {/* Right col */}
                <div className="border border-[#e8e8f0] rounded-[14px] p-6 hover:border-[#C5DCF0] transition-colors">
                  <h2 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] mb-3">{release.title}</h2>
                  <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-5">{release.body}</p>
                  <div className="border-t border-[#f0f0f8] pt-4 space-y-2.5">
                    {release.items.map(({ type, text }) => (
                      <div key={text} className="flex items-start gap-2.5">
                        <div className={`w-2 h-2 rounded-full ${typeStyle[type].dot} flex-shrink-0 mt-1.5`} />
                        <div className="flex gap-2 items-start">
                          <span className="text-[10px] font-bold text-[#9494a8] uppercase tracking-wide mt-0.5 w-14 flex-shrink-0">{typeStyle[type].label}</span>
                          <span className="text-[12.5px] text-[#0d0d1a]">{text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-[12.5px] text-[#9494a8] mb-4">Older releases are available on GitHub.</p>
            <a href="https://github.com" className="text-[12.5px] font-semibold text-[#5890B8] hover:text-[#8BB8D8] transition-colors">View full history on GitHub →</a>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="px-6 py-16 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] mb-2">Stay up to date</h2>
          <p className="text-[12.5px] text-[#6b6b80] mb-5">Get an email when we ship something worth reading about.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com"
              className="flex-1 border border-[#C5DCF0] rounded-[8px] px-3 py-2 text-[12.5px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8]" />
            <button className="btn-primary bg-[#8BB8D8] text-white text-[12.5px] font-semibold px-4 py-2 rounded-[8px]">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
