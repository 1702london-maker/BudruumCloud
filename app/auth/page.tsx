import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function AuthPage() {
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
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Authentication</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Auth that works.<br />Out of the <span className="gradient-text">box.</span>
          </h1>
          <p className="text-[16px] text-[#6b6b80] max-w-xl mx-auto mb-8 leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            Email, OAuth, magic links, and MFA — all in one SDK. No auth server to manage, no JWT headaches, no vendor lock-in.
          </p>
          <div className="flex items-center justify-center gap-3 anim-hero" style={{ animationDelay: "0.18s" }}>
            <a href="/signup" className="btn-primary bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px]">Start for free</a>
            <Link href="/docs" className="text-[13px] font-semibold text-[#0d0d1a] px-5 py-2.5 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">View documentation</Link>
          </div>
        </div>
      </section>

      {/* Provider grid */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] text-[#9494a8] text-center mb-6 uppercase tracking-widest font-semibold">Supported providers</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "Email / Password", badge: "Built-in" },
              { name: "Magic Link", badge: "Built-in" },
              { name: "Google", badge: "OAuth 2.0" },
              { name: "GitHub", badge: "OAuth 2.0" },
              { name: "Microsoft", badge: "OAuth 2.0" },
              { name: "Apple", badge: "OAuth 2.0" },
              { name: "Slack", badge: "OAuth 2.0" },
              { name: "Phone / OTP", badge: "Built-in" },
              { name: "SAML / SSO", badge: "Enterprise" },
              { name: "TOTP / MFA", badge: "Built-in" },
              { name: "Anonymous", badge: "Built-in" },
              { name: "Custom JWT", badge: "Pro" },
            ].map(({ name, badge }) => (
              <div key={name} className="stack-card border border-[#e8e8f0] rounded-[10px] px-4 py-3 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#0d0d1a]">{name}</span>
                <span className="text-[10px] text-[#8BB8D8] bg-[#EEF5FB] px-2 py-0.5 rounded-full font-semibold">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Full feature set</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">
            Everything auth needs to be.
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "🔐", title: "Session management", body: "JWTs with automatic refresh. Sessions persist across page loads. Configurable expiry from 1 hour to 30 days." },
              { icon: "🛡️", title: "Multi-factor auth", body: "TOTP (Google Authenticator, Authy) and SMS OTP. Enable MFA per user or enforce it globally across your workspace." },
              { icon: "📧", title: "Custom email templates", body: "Brand your confirmation, magic link, and password reset emails. Full HTML editor with variable interpolation." },
              { icon: "🔑", title: "Row Level Security sync", body: "Auth tokens automatically map to your RLS policies. The moment a user logs in, their data access is enforced." },
              { icon: "🧩", title: "Social OAuth in 2 minutes", body: "Add a Google or GitHub login button. Paste your OAuth credentials into the dashboard. Done." },
              { icon: "📱", title: "Deep link support", body: "Magic link callbacks work in mobile apps. Automatic redirect handling for React Native, Flutter, and Swift." },
              { icon: "👤", title: "User management UI", body: "Search, filter, ban, or delete users directly from the dashboard. View login history and active sessions." },
              { icon: "🔗", title: "Webhook events", body: "Fire a webhook on signup, login, token refresh, or logout. Perfect for syncing users to your CRM or billing." },
              { icon: "🔄", title: "Anonymous → real user", body: "Let visitors act without signing up. When they're ready, link the anonymous session to a real account." },
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
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">SDK reference</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              Four lines to<br />sign in with Google.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-6">
              The Budruum auth SDK handles token storage, refresh, and session rehydration automatically. You write the UI — we handle the rest.
            </p>
            <div className="space-y-4">
              {[
                { step: "1", label: "Install the SDK", detail: "npm install @budruum/client" },
                { step: "2", label: "Initialise with your project URL", detail: "Two lines of config. That's it." },
                { step: "3", label: "Call signInWithProvider", detail: "Redirect, callback, and session are handled automatically." },
              ].map(({ step, label, detail }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[11px] font-bold text-[#5890B8]">{step}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0d0d1a]">{label}</p>
                    <p className="text-[12px] text-[#9494a8] mt-0.5">{detail}</p>
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
              <span className="ml-2 text-[11px] text-[#9494a8]">auth.ts</span>
            </div>
            <pre className="p-5 text-[12px] leading-relaxed overflow-x-auto bg-white" style={{ fontFamily: "var(--font-mono)" }}>
              <code>{`import { createClient } from "@budruum/client"

const budruum = createClient(
  process.env.NEXT_PUBLIC_BUDRUUM_URL!,
  process.env.NEXT_PUBLIC_BUDRUUM_KEY!
)

// Sign in with OAuth
await budruum.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "https://yourapp.com/callback"
  }
})

// Sign up with email
const { user, error } = await budruum.auth
  .signUp({
    email: "founder@agency.co",
    password: "supersecure123",
    options: {
      data: { role: "owner", plan: "pro" }
    }
  })

// Get the current user (server-side safe)
const { data: { user } } = await budruum.auth
  .getUser()

// Listen to auth state changes
budruum.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") startDashboard(session)
  if (event === "SIGNED_OUT") goToLogin()
})`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">Authentication shouldn't slow you down.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">Set up complete auth in an afternoon. Free forever on the Starter plan.</p>
          <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Get started free</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

