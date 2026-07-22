import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

export default function FunctionsPage() {
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
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Edge Functions</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Run code at the edge.<br /><span className="gradient-text">In under 5ms.</span>
          </h1>
          <p className="text-[16px] text-[#6b6b80] max-w-xl mx-auto mb-8 leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            TypeScript functions that execute on Cloudflare's global network. Webhooks, cron jobs, AI inference, custom APIs — all in your project dashboard.
          </p>
          <div className="flex items-center justify-center gap-3 anim-hero" style={{ animationDelay: "0.18s" }}>
            <a href="/signup" className="btn-primary bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px]">Deploy your first function</a>
            <a href="/docs" className="text-[13px] font-semibold text-[#0d0d1a] px-5 py-2.5 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">View docs</a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
          {[
            { value: "< 5ms", label: "Cold start time" },
            { value: "130+", label: "Edge locations" },
            { value: "50ms", label: "Global avg latency" },
            { value: "∞", label: "Invocations / month" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-5 border border-[#e8e8f0] rounded-[12px] hover:border-[#C5DCF0] hover:shadow-md transition-all">
              <p className="text-[28px] font-extrabold tracking-tight text-[#0d0d1a] leading-none mb-1.5">{value}</p>
              <p className="text-[11.5px] text-[#6b6b80] font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">What you can build</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">
            Custom logic. No servers.
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "🔔", title: "Webhooks", body: "Receive Stripe, GitHub, or any third-party webhook. Validate signatures, transform data, and write to your database." },
              { icon: "⏱️", title: "Cron jobs", body: "Schedule functions to run on any cron expression. Daily reports, weekly digests, hourly cache refreshes." },
              { icon: "🤖", title: "AI inference", body: "Call Claude, GPT-4, or any LLM from a function. Process user input, generate content, and stream responses." },
              { icon: "📧", title: "Transactional email", body: "Send via Resend or SendGrid without exposing API keys to the client. Full control over rendering logic." },
              { icon: "🔐", title: "Auth middleware", body: "Validate tokens, check permissions, and enforce rate limits before requests reach your data layer." },
              { icon: "🔁", title: "Background jobs", body: "Kick off async processes after a form submit. Thumbnail generation, PDF creation, data enrichment." },
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

      {/* Code */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">TypeScript native</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              Write TypeScript.<br />Deploy instantly.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-6">
              No build step, no CI config. Push a file to your project and it's live in seconds. The Budruum dashboard includes an inline editor with type checking and logs.
            </p>
            <div className="space-y-3">
              {[
                "TypeScript and Deno runtime",
                "Access to budruum client and database",
                "Environment variables via dashboard",
                "Real-time logs and error traces",
                "Local dev with budruum functions serve",
              ].map(f => (
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
              <span className="ml-2 text-[11px] text-[#9494a8]">functions/stripe-webhook.ts</span>
            </div>
            <pre className="p-5 text-[12px] leading-relaxed overflow-x-auto bg-white" style={{ fontFamily: "var(--font-mono)" }}>
              <code>{`import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "@budruum/client"
import Stripe from "https://esm.sh/stripe"

const stripe = new Stripe(Deno.env.get("STRIPE_KEY")!)
const budruum = createClient(
  Deno.env.get("BUDRUUM_URL")!,
  Deno.env.get("BUDRUUM_SERVICE_KEY")!
)

serve(async (req) => {
  const signature = req.headers.get("stripe-signature")!
  const body = await req.text()

  const event = stripe.webhooks.constructEvent(
    body, signature,
    Deno.env.get("STRIPE_WEBHOOK_SECRET")!
  )

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object
    await budruum.from("orders").update({
      status: "paid",
      paid_at: new Date().toISOString()
    }).eq("stripe_pi_id", pi.id)
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" }
  })
})`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Server logic without a server.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">500,000 function invocations per month on the free plan.</p>
          <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Deploy a function</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
