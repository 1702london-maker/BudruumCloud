import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

export default function RealtimePage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.35) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF5FB] border border-[#C5DCF0] rounded-full px-3 py-1 mb-6 anim-logo">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8BB8D8] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Realtime</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Live data.<br />No <span className="gradient-text">polling required.</span>
          </h1>
          <p className="text-[16px] text-[#6b6b80] max-w-xl mx-auto mb-8 leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            WebSocket subscriptions for database changes, presence tracking, and broadcast channels — powered by Ably's globally distributed infrastructure.
          </p>
          <div className="flex items-center justify-center gap-3 anim-hero" style={{ animationDelay: "0.18s" }}>
            <a href="/signup" className="btn-primary bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px]">Start building</a>
            <a href="/docs" className="text-[13px] font-semibold text-[#0d0d1a] px-5 py-2.5 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">Documentation</a>
          </div>
        </div>
      </section>

      {/* Live chat visual */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto rounded-[16px] border border-[#e8e8f0] overflow-hidden shadow-sm">
          <div className="bg-[#f8f8fc] border-b border-[#e8e8f0] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span className="text-[11.5px] text-[#9494a8] font-medium">project-alpha — Live channel</span>
            </div>
            <span className="text-[10.5px] text-[#8BB8D8] bg-[#EEF5FB] px-2 py-0.5 rounded-full font-semibold">3 online</span>
          </div>
          <div className="p-4 space-y-3 bg-white">
            {[
              { user: "Sophie K.", time: "14:32", msg: "Just pushed the new nav component. Can you review?", self: false },
              { user: "You", time: "14:33", msg: "On it — looks great so far. Tweaking the mobile breakpoint.", self: true },
              { user: "Marcus T.", time: "14:34", msg: "Client approved the colour palette 🎉", self: false },
              { user: "Sophie K.", time: "14:34", msg: "Amazing! Merging to staging now.", self: false },
            ].map(({ user, time, msg, self }) => (
              <div key={time + msg} className={`flex gap-3 ${self ? "flex-row-reverse" : ""}`}>
                <div className="w-7 h-7 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8] flex-shrink-0">
                  {user[0]}
                </div>
                <div className={`max-w-[75%] ${self ? "items-end" : "items-start"} flex flex-col`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[11px] font-semibold text-[#0d0d1a]">{user}</span>
                    <span className="text-[10px] text-[#9494a8]">{time}</span>
                  </div>
                  <div className={`px-3 py-2 rounded-[10px] text-[12px] leading-snug ${self ? "bg-[#EEF5FB] border border-[#C5DCF0] text-[#0d0d1a]" : "bg-[#fafafa] border border-[#e8e8f0] text-[#0d0d1a]"}`}>
                    {msg}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1 text-[11px] text-[#9494a8]">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-[#C5DCF0] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1 h-1 rounded-full bg-[#C5DCF0] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1 h-1 rounded-full bg-[#C5DCF0] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span>Marcus is typing...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Three realtime primitives</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">
            Subscribe. Broadcast. Presence.
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: "📡",
                title: "Database changes",
                body: "Subscribe to INSERT, UPDATE, and DELETE events on any Postgres table. Events arrive over WebSocket with the full before/after row data.",
                tags: ["INSERT", "UPDATE", "DELETE"],
              },
              {
                icon: "📣",
                title: "Broadcast channels",
                body: "Send arbitrary messages between connected clients in under 100ms. Use for notifications, cursor positions, live comments, or multiplayer cursors.",
                tags: ["Low latency", "Any payload", "Client → Client"],
              },
              {
                icon: "👥",
                title: "Presence",
                body: "Track who is online in a room, what they're doing, and where their cursor is. Built for collaboration tools and live dashboards.",
                tags: ["Who's online", "User state", "Leave events"],
              },
            ].map(({ icon, title, body, tags }) => (
              <div key={title} className="feature-card bg-white border border-[#e8e8f0] rounded-[12px] p-6">
                <div className="card-icon w-9 h-9 rounded-[8px] border border-[#e8e8f0] bg-[#fafafa] flex items-center justify-center text-[18px] mb-4 transition-all">{icon}</div>
                <h3 className="text-[14px] font-bold text-[#0d0d1a] mb-2">{title}</h3>
                <p className="text-[12px] text-[#6b6b80] leading-relaxed mb-4">{body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => (
                    <span key={t} className="text-[10.5px] font-semibold text-[#5890B8] bg-[#EEF5FB] border border-[#C5DCF0] px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">SDK</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              Subscribe to your<br />database in 3 lines.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-6">
              No message broker to configure, no WebSocket server to run. Realtime is built into your project and respects the same RLS policies as your database queries.
            </p>
            <div className="space-y-4">
              {[
                { label: "Powered by Ably", body: "99.999% uptime SLA. 300+ global edge nodes. Automatic reconnection." },
                { label: "RLS enforcement", body: "Users only receive events for rows they have permission to read." },
                { label: "Filter by column", body: "Only receive events where project_id = your value — no client-side filtering needed." },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-1 bg-[#C5DCF0] rounded-full flex-shrink-0" />
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#0d0d1a]">{label}</p>
                    <p className="text-[12px] text-[#9494a8] mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[12px] border border-[#e8e8f0] overflow-hidden shadow-sm">
            <div className="bg-[#f8f8fc] border-b border-[#e8e8f0] px-4 py-2.5 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <span className="ml-2 text-[11px] text-[#9494a8]">realtime.ts</span>
            </div>
            <pre className="p-5 text-[12px] leading-relaxed overflow-x-auto bg-white" style={{ fontFamily: "var(--font-mono)" }}>
              <code>{`import { budruum } from "@budruum/client"

// Subscribe to database changes
const channel = budruum
  .channel("project-tasks")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "tasks",
      filter: "project_id=eq." + projectId
    },
    (payload) => {
      console.log("Change received:", payload)
      updateTaskList(payload.new)
    }
  )
  .subscribe()

// Broadcast to all clients in a channel
await budruum
  .channel("project-cursors")
  .send({
    type: "broadcast",
    event: "cursor_move",
    payload: { x: 240, y: 180, user: session.user.id }
  })

// Track presence
const room = budruum.channel("project-room")
await room.track({
  user_id: session.user.id,
  online_at: new Date().toISOString()
})

room.on("presence", { event: "sync" }, () => {
  const state = room.presenceState()
  setOnlineUsers(Object.values(state).flat())
})`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-10">What teams build with Realtime</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "💬", title: "Team chat", body: "In-app messaging between agency staff and clients." },
              { icon: "📊", title: "Live dashboards", body: "Metrics that update the moment data changes." },
              { icon: "🖱️", title: "Multiplayer editing", body: "Show collaborators' cursors in shared documents." },
              { icon: "🔔", title: "Notifications", body: "Push alerts when a task is assigned or a comment posted." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="stack-card border border-[#e8e8f0] rounded-[12px] p-5 text-left bg-white">
                <span className="text-[22px] mb-3 block">{icon}</span>
                <p className="text-[13px] font-bold text-[#0d0d1a] mb-1.5">{title}</p>
                <p className="text-[11.5px] text-[#6b6b80] leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Make your app feel alive.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">Realtime is included on every Budruum project. Free to start.</p>
          <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Get started free</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
