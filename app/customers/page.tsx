import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

export default function CustomersPage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.35) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF5FB] border border-[#C5DCF0] rounded-full px-3 py-1 mb-6 anim-logo">
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Customers</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Agencies who moved<br />their <span className="gradient-text">entire stack here.</span>
          </h1>
          <p className="text-[15px] text-[#6b6b80] max-w-xl mx-auto leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            Hundreds of digital agencies and freelancers use Budruum to power their client work. Here's what they say.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
          {[
            { value: "600+", label: "Agencies onboard" },
            { value: "4,800+", label: "Projects live" },
            { value: "99.9%", label: "Platform uptime" },
            { value: "£0", label: "Avg monthly egress" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-5 border border-[#e8e8f0] rounded-[12px] hover:border-[#C5DCF0] hover:shadow-md transition-all">
              <p className="text-[30px] font-extrabold tracking-tight text-[#0d0d1a] leading-none mb-1.5">{value}</p>
              <p className="text-[11.5px] text-[#6b6b80] font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured testimonials */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">In their words</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">What agencies actually say</h2>
          <div className="grid grid-cols-3 gap-5 mb-8">
            {[
              {
                quote: "We used to spend £400/month across Heroku, Cloudinary, and Firebase per client. Budruum is £25 total and covers all of it. The maths was embarrassing.",
                name: "Sarah M.",
                role: "Technical Director",
                company: "Craft Studio, London",
                emoji: "S",
              },
              {
                quote: "Branch databases for every PR was the thing that sold me. We can show the client a preview of database changes before anything touches production. Game changer.",
                name: "Kwame A.",
                role: "Founder",
                company: "Pixel & Co, Manchester",
                emoji: "K",
              },
              {
                quote: "The table editor in the dashboard means our project managers can update content directly without coming to us. That alone saved us 3 hours a week per client.",
                name: "Emma L.",
                role: "Lead Developer",
                company: "Bloom Digital, Bristol",
                emoji: "E",
              },
            ].map(({ quote, name, role, company, emoji }) => (
              <div key={name} className="feature-card bg-white border border-[#e8e8f0] rounded-[14px] p-6">
                <p className="text-[13px] text-[#0d0d1a] leading-relaxed mb-5">"{quote}"</p>
                <div className="flex items-center gap-3 border-t border-[#f0f0f8] pt-4">
                  <div className="w-8 h-8 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[13px] font-bold text-[#5890B8]">{emoji}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0d0d1a]">{name}</p>
                    <p className="text-[11px] text-[#9494a8]">{role} · {company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              {
                quote: "The auth setup took 20 minutes for our first project. Now we have a template workspace that gets cloned for every new client. What used to take 2 days takes 2 hours.",
                name: "Ravi P.",
                role: "CTO",
                company: "Starfield Labs, Birmingham",
                emoji: "R",
              },
              {
                quote: "Budruum's support team actually replied on a Sunday when our client's launch was at risk. That's not something you get with AWS.",
                name: "Jade H.",
                role: "Head of Engineering",
                company: "Verge Agency, Glasgow",
                emoji: "J",
              },
            ].map(({ quote, name, role, company, emoji }) => (
              <div key={name} className="feature-card bg-white border border-[#e8e8f0] rounded-[14px] p-6">
                <p className="text-[13px] text-[#0d0d1a] leading-relaxed mb-5">"{quote}"</p>
                <div className="flex items-center gap-3 border-t border-[#f0f0f8] pt-4">
                  <div className="w-8 h-8 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[13px] font-bold text-[#5890B8]">{emoji}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0d0d1a]">{name}</p>
                    <p className="text-[11px] text-[#9494a8]">{role} · {company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use case breakdown */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Who uses Budruum</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">Built for every kind of agency</h2>
          <div className="grid grid-cols-2 gap-5">
            {[
              {
                icon: "🎨",
                title: "Creative & design studios",
                body: "Use Budruum to power CMS-backed portfolio sites, campaign landing pages, and client portals. The table editor replaces Contentful for simple content updates.",
                projects: "Avg 8 projects",
              },
              {
                icon: "⚙️",
                title: "Development agencies",
                body: "Branch databases per PR. Drizzle migrations. Edge functions for webhooks. Everything a full-stack team needs without the infrastructure overhead.",
                projects: "Avg 24 projects",
              },
              {
                icon: "🚀",
                title: "Growth & marketing agencies",
                body: "Build referral systems, form backends, and event tracking pipelines. Use edge functions to connect Stripe, HubSpot, and Klaviyo without a Node server.",
                projects: "Avg 6 projects",
              },
              {
                icon: "🤝",
                title: "Freelancers",
                body: "One Budruum account powers every client. Isolated databases, separate storage buckets, per-project API keys. Professional infrastructure at solo prices.",
                projects: "Avg 4 projects",
              },
            ].map(({ icon, title, body, projects }) => (
              <div key={title} className="feature-card border border-[#e8e8f0] rounded-[14px] p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="card-icon w-10 h-10 rounded-[10px] border border-[#e8e8f0] bg-[#fafafa] flex items-center justify-center text-[20px] transition-all">{icon}</div>
                  <span className="text-[10.5px] font-semibold text-[#8BB8D8] bg-[#EEF5FB] px-2.5 py-1 rounded-full">{projects}</span>
                </div>
                <h3 className="text-[14px] font-bold text-[#0d0d1a] mb-2">{title}</h3>
                <p className="text-[12.5px] text-[#6b6b80] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Join 600+ agencies already building on Budruum.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">Start for free. No card. No commitment.</p>
          <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Get started free</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
