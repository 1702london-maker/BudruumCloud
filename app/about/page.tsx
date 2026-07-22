import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.35) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF5FB] border border-[#C5DCF0] rounded-full px-3 py-1 mb-6 anim-logo">
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Our story</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Built for agencies.<br />By <span className="gradient-text">people who ran one.</span>
          </h1>
          <p className="text-[15px] text-[#6b6b80] max-w-xl mx-auto leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            Budruum started because we were tired of paying AWS bills that made no sense, managing Supabase quotas per client, and explaining infrastructure costs to founders who just wanted software that worked.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20 border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">Why we exist</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-5 leading-tight">
              The cloud shouldn't punish you for having clients.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-4">
              Most backend platforms are built for single-tenant products. You sign up, pick a plan, and build one app. But agencies and freelancers don't build one app — they build dozens. And the billing model punishes you for it.
            </p>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-4">
              Budruum is a multi-client backend platform. One account, unlimited projects. One flat monthly fee. Your clients get their own isolated environment — their own database, storage, auth — and you get a single dashboard to manage all of them.
            </p>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed">
              We believe the infrastructure layer should be invisible, not a negotiation. Your margin shouldn't shrink every time you take on a new client.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2024", label: "Founded" },
              { value: "London", label: "Headquartered" },
              { value: "100%", label: "Bootstrapped" },
              { value: "UK-first", label: "Compliance focus" },
            ].map(({ value, label }) => (
              <div key={label} className="border border-[#e8e8f0] rounded-[12px] p-5 hover:border-[#C5DCF0] hover:shadow-md transition-all">
                <p className="text-[28px] font-extrabold tracking-tight text-[#0d0d1a] leading-none mb-1.5">{value}</p>
                <p className="text-[12px] text-[#6b6b80] font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Principles</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">How we build Budruum</h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "🎯", title: "Simplicity first", body: "Every feature we ship has to make the platform simpler to use, not more powerful in a way that adds complexity. We say no to features that create configuration overhead." },
              { icon: "💷", title: "Transparent pricing", body: "One number. No egress fees, no per-seat charges, no usage spikes. Agencies should be able to quote infrastructure costs to clients without a spreadsheet." },
              { icon: "🔒", title: "Data sovereignty", body: "Your data stays in your region. We don't use it for training, we don't share it with third parties, and we make it trivial to export or migrate whenever you want." },
              { icon: "⚡", title: "Speed is a feature", body: "We obsess over cold start times, query performance, and API latency. Slow tooling kills productivity. Everything Budruum does should feel instant." },
              { icon: "🤝", title: "Developers first", body: "We talk to developers before we build. Every quarter we run agency feedback sessions, and the roadmap is public. If it's not useful in practice, it doesn't ship." },
              { icon: "🌍", title: "Open source", body: "The client SDK, migration tools, and CLI are fully open source. We believe in giving back to the ecosystem that makes Budruum possible." },
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

      {/* Team */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">The team</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-4">Small team. Big infrastructure.</h2>
          <p className="text-[13px] text-[#9494a8] text-center max-w-md mx-auto mb-12">We're a small, focused team of engineers and designers. We hire slowly and build deliberately.</p>
          <div className="grid grid-cols-4 gap-5">
            {[
              { name: "James H.", role: "CEO & Co-founder", bg: "#8BB8D8" },
              { name: "Amara O.", role: "CTO & Co-founder", bg: "#C5DCF0" },
              { name: "Tom W.", role: "Lead Engineer", bg: "#B8D4E8" },
              { name: "Priya S.", role: "Design Lead", bg: "#EEF5FB" },
            ].map(({ name, role, bg }) => (
              <div key={name} className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-[20px] font-extrabold text-white" style={{ background: bg }}>
                  {name[0]}
                </div>
                <p className="text-[13px] font-bold text-[#0d0d1a]">{name}</p>
                <p className="text-[11.5px] text-[#9494a8]">{role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-[13px] text-[#9494a8] mb-4">We're hiring. Remote-first, London-anchored.</p>
            <a href="mailto:careers@budruum.co.uk" className="text-[13px] font-semibold text-[#5890B8] hover:text-[#8BB8D8] transition-colors">View open roles →</a>
          </div>
        </div>
      </section>

      {/* Roadmap / milestones */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Timeline</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">From idea to infrastructure</h2>
          <div className="space-y-0">
            {[
              { date: "Q3 2024", label: "Founded", body: "Budruum incorporated in London after 6 months of user research with UK agencies." },
              { date: "Q4 2024", label: "Alpha launch", body: "First 20 agency partners onboarded. Core database + auth stack live." },
              { date: "Q1 2025", label: "Storage + Functions", body: "Cloudflare R2 storage and edge functions shipped. Zero egress pricing introduced." },
              { date: "Q2 2025", label: "Realtime", body: "WebSocket subscriptions and presence launched via Ably integration." },
              { date: "Q3 2025", label: "Public beta", body: "Open sign-up. 500 agencies on platform. Branch databases shipped." },
              { date: "Q1 2026", label: "Pro plan + Enterprise", body: "Paid tiers launched. First enterprise contracts signed." },
            ].map(({ date, label, body }, i) => (
              <div key={date} className="flex gap-5 pb-8">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#8BB8D8] border-2 border-white shadow-sm flex-shrink-0 mt-1" />
                  {i < 5 && <div className="w-px flex-1 bg-[#e8e8f0] mt-1" />}
                </div>
                <div className="pb-4">
                  <span className="text-[10.5px] font-bold text-[#8BB8D8] uppercase tracking-wide">{date}</span>
                  <p className="text-[13px] font-bold text-[#0d0d1a] mt-0.5">{label}</p>
                  <p className="text-[12px] text-[#6b6b80] mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Help us build the future of agency infrastructure.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">Join the platform. Or join the team.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Start building</a>
            <a href="mailto:careers@budruum.co.uk" className="text-[13px] font-semibold text-[#0d0d1a] px-7 py-3 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">Join the team</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
