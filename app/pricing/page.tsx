import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

const CHECK = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 mt-0.5">
    <circle cx="7" cy="7" r="7" fill="#EEF5FB" />
    <path d="M4 7l2 2 4-4" stroke="#5890B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CROSS = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 mt-0.5">
    <circle cx="7" cy="7" r="7" fill="#f3f3f8" />
    <path d="M5 5l4 4M9 5l-4 4" stroke="#c0c0d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.3) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-4 anim-hero">
            Simple pricing.<br /><span className="gradient-text">Scale as you grow.</span>
          </h1>
          <p className="text-[15px] text-[#6b6b80] max-w-md mx-auto anim-hero" style={{ animationDelay: "0.08s" }}>
            One flat monthly fee. All infrastructure included. You set your client billing on top.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5">
          {/* Starter */}
          <div className="pricing-card border border-[#e8e8f0] rounded-[16px] p-7">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-2">Starter</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-[40px] font-extrabold tracking-tight text-[#0d0d1a] leading-none">£0</span>
              <span className="text-[13px] text-[#9494a8] mb-2">/month</span>
            </div>
            <p className="text-[12px] text-[#9494a8] mb-6">Perfect for side projects and exploration. No card required.</p>
            <a href="/signup" className="block w-full text-center border border-[#e8e8f0] text-[13px] font-semibold py-2.5 rounded-[8px] text-[#0d0d1a] hover:border-[#C5DCF0] hover:bg-[#EEF5FB] transition-colors mb-7">Start for free</a>
            <div className="space-y-2.5">
              {[
                "2 active projects",
                "500 MB database",
                "5 GB storage",
                "500K function invocations",
                "50K realtime messages",
                "Community support",
              ].map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <CHECK />
                  <span className="text-[12.5px] text-[#6b6b80]">{f}</span>
                </div>
              ))}
              {["Custom domains", "Branching environments", "Priority support"].map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <CROSS />
                  <span className="text-[12.5px] text-[#9494a8]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro */}
          <div className="pricing-card relative border-2 border-[#8BB8D8] rounded-[16px] p-7 shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#8BB8D8] text-white text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most popular</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#8BB8D8] mb-2">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-[40px] font-extrabold tracking-tight text-[#0d0d1a] leading-none">£25</span>
              <span className="text-[13px] text-[#9494a8] mb-2">/month</span>
            </div>
            <p className="text-[12px] text-[#9494a8] mb-6">For agencies and teams shipping to real clients.</p>
            <a href="/signup" className="btn-primary block w-full text-center bg-[#8BB8D8] text-white text-[13px] font-semibold py-2.5 rounded-[8px] mb-7">Get Pro</a>
            <div className="space-y-2.5">
              {[
                "Unlimited active projects",
                "8 GB database per project",
                "100 GB storage",
                "5M function invocations",
                "2M realtime messages",
                "Branch databases (per PR)",
                "Custom domains",
                "30-day backup retention",
                "Email support (24h SLA)",
              ].map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <CHECK />
                  <span className="text-[12.5px] text-[#6b6b80]">{f}</span>
                </div>
              ))}
              {["Dedicated infrastructure", "SSO / SAML", "SLA agreement"].map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <CROSS />
                  <span className="text-[12.5px] text-[#9494a8]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise */}
          <div className="pricing-card border border-[#e8e8f0] rounded-[16px] p-7">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#9494a8] mb-2">Enterprise</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-[40px] font-extrabold tracking-tight text-[#0d0d1a] leading-none">Custom</span>
            </div>
            <p className="text-[12px] text-[#9494a8] mb-6">For large agencies and teams with compliance requirements.</p>
            <a href="mailto:enterprise@budruum.co.uk" className="block w-full text-center border border-[#0d0d1a] text-[13px] font-semibold py-2.5 rounded-[8px] text-[#0d0d1a] hover:bg-[#fafafa] transition-colors mb-7">Contact sales</a>
            <div className="space-y-2.5">
              {[
                "Everything in Pro",
                "Dedicated Postgres cluster",
                "SSO / SAML authentication",
                "Custom data residency",
                "GDPR DPA agreement",
                "99.99% uptime SLA",
                "Dedicated Slack channel",
                "Onboarding engineer",
                "Volume pricing discounts",
              ].map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <CHECK />
                  <span className="text-[12.5px] text-[#6b6b80]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">Full plan comparison</h2>
          <div className="rounded-[14px] border border-[#e8e8f0] overflow-hidden">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-[#e8e8f0] bg-[#fafafa]">
                  <th className="px-5 py-3 text-left font-bold text-[#0d0d1a]">Feature</th>
                  <th className="px-5 py-3 text-center font-bold text-[#9494a8]">Starter</th>
                  <th className="px-5 py-3 text-center font-bold text-[#8BB8D8]">Pro</th>
                  <th className="px-5 py-3 text-center font-bold text-[#0d0d1a]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Active projects", s: "2", p: "Unlimited", e: "Unlimited" },
                  { label: "Database size", s: "500 MB", p: "8 GB", e: "Dedicated" },
                  { label: "Storage", s: "5 GB", p: "100 GB", e: "Custom" },
                  { label: "Egress fees", s: "£0", p: "£0", e: "£0" },
                  { label: "Function invocations", s: "500K / mo", p: "5M / mo", e: "Custom" },
                  { label: "Realtime messages", s: "50K / mo", p: "2M / mo", e: "Custom" },
                  { label: "Branch databases", s: "—", p: "✓", e: "✓" },
                  { label: "Custom domains", s: "—", p: "✓", e: "✓" },
                  { label: "Backup retention", s: "7 days", p: "30 days", e: "90 days" },
                  { label: "PITR recovery", s: "—", p: "1 hour", e: "Any point" },
                  { label: "SSO / SAML", s: "—", p: "—", e: "✓" },
                  { label: "GDPR DPA", s: "—", p: "—", e: "✓" },
                  { label: "SLA", s: "99.9%", p: "99.9%", e: "99.99%" },
                  { label: "Support", s: "Community", p: "Email 24h", e: "Dedicated Slack" },
                ].map(({ label, s, p, e }) => (
                  <tr key={label} className="border-b border-[#f0f0f8] hover:bg-[#EEF5FB] transition-colors">
                    <td className="px-5 py-3 font-medium text-[#0d0d1a]">{label}</td>
                    <td className="px-5 py-3 text-center text-[#9494a8]">{s}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#5890B8]">{p}</td>
                    <td className="px-5 py-3 text-center text-[#0d0d1a]">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-5">
            {[
              {
                q: "Can I upgrade or downgrade at any time?",
                a: "Yes. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle. No penalties, no minimum terms."
              },
              {
                q: "What happens if I exceed my plan limits?",
                a: "We'll send you an email notification when you hit 80% of any limit. You can upgrade before hitting the cap, or your project will be rate-limited (not deleted)."
              },
              {
                q: "Is there a free trial for Pro?",
                a: "The Starter plan is free forever and includes all core features. You can try the full Pro feature set with a 14-day trial — no card required."
              },
              {
                q: "Do you offer agency discounts?",
                a: "Yes. Agencies running 5 or more active client projects get 20% off Pro. Email us at agencies@budruum.co.uk with your use case."
              },
              {
                q: "What counts as a 'project'?",
                a: "One project = one Postgres database instance with its own storage bucket, auth configuration, and function environment. Each client you build for typically gets their own project."
              },
              {
                q: "How does billing work for Enterprise?",
                a: "Enterprise is invoiced annually or quarterly, with terms agreed upfront. We can work with purchase orders and bank transfer if needed."
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-[#e8e8f0] rounded-[12px] p-5 hover:border-[#C5DCF0] transition-colors">
                <p className="text-[13px] font-semibold text-[#0d0d1a] mb-2">{q}</p>
                <p className="text-[12.5px] text-[#6b6b80] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Start building today.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">Free plan, no credit card. Upgrade when you're ready.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Get started free</a>
            <a href="mailto:enterprise@budruum.co.uk" className="text-[13px] font-semibold text-[#0d0d1a] px-7 py-3 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">Talk to sales</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
