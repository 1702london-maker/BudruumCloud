import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

export default function SecurityPage() {
  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        <div className="hero-glow absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,220,240,0.35) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF5FB] border border-[#C5DCF0] rounded-full px-3 py-1 mb-6 anim-logo">
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Security & Compliance</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Your clients trust you.<br /><span className="gradient-text">Trust us to protect that.</span>
          </h1>
          <p className="text-[15px] text-[#6b6b80] max-w-xl mx-auto leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            End-to-end encryption, GDPR-ready infrastructure, row-level access control, and full audit trails — built into every Budruum project by default.
          </p>
        </div>
      </section>

      {/* Security pillars */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-5">
          {[
            {
              icon: "🔐",
              title: "Encryption everywhere",
              body: "All data is encrypted at rest with AES-256 and in transit with TLS 1.3. Database backups are encrypted before leaving your region. Keys are managed via AWS KMS with automatic rotation.",
              tags: ["AES-256", "TLS 1.3", "KMS"],
            },
            {
              icon: "🛡️",
              title: "Row Level Security",
              body: "Access control that lives inside Postgres. Users can only read or write the rows they're authorised to see — regardless of what the application layer does. Even bugs in your code can't expose data they shouldn't.",
              tags: ["Postgres native", "Policy-based", "Zero-trust"],
            },
            {
              icon: "📋",
              title: "Full audit logging",
              body: "Every API call, database query, auth event, and admin action is logged with a timestamp, user ID, IP address, and outcome. Logs are immutable and retained for 90 days on Enterprise.",
              tags: ["Immutable", "90-day retention", "SIEM-ready"],
            },
            {
              icon: "🌍",
              title: "Data residency",
              body: "Choose where your data lives: London, Frankfurt, New York, Singapore, or Sydney. Data stays in your region — it is never replicated internationally without explicit opt-in.",
              tags: ["UK/EU/US/APAC", "GDPR-ready", "No cross-border transfer"],
            },
          ].map(({ icon, title, body, tags }) => (
            <div key={title} className="feature-card border border-[#e8e8f0] rounded-[14px] p-6">
              <div className="card-icon w-10 h-10 rounded-[10px] border border-[#e8e8f0] bg-[#fafafa] flex items-center justify-center text-[20px] mb-4 transition-all">{icon}</div>
              <h3 className="text-[14px] font-bold text-[#0d0d1a] mb-2">{title}</h3>
              <p className="text-[12.5px] text-[#6b6b80] leading-relaxed mb-4">{body}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="text-[10.5px] font-semibold text-[#5890B8] bg-[#EEF5FB] border border-[#C5DCF0] px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GDPR section */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">GDPR compliance</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              GDPR-ready from<br />day one.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-5">
              Budruum processes personal data under GDPR as a Data Processor. You are the Data Controller. We provide a signed Data Processing Agreement (DPA) on Enterprise plans, and all data remains in the EU by default.
            </p>
            <div className="space-y-3">
              {[
                { label: "Right to erasure", body: "Delete user data via API or dashboard. Purge cascades across auth, storage, and database." },
                { label: "Data export", body: "Full data export in JSON or SQL format at any time. No lock-in, no friction." },
                { label: "Sub-processor list", body: "Full list of sub-processors published and updated with 30-day notice of changes." },
                { label: "Breach notification", body: "We notify you within 24 hours of any confirmed data breach — well ahead of the 72-hour GDPR requirement." },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-1 bg-[#C5DCF0] rounded-full flex-shrink-0 self-stretch" />
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#0d0d1a]">{label}</p>
                    <p className="text-[12px] text-[#9494a8] mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: "SOC 2 Type II", status: "In progress", note: "Audit scheduled Q3 2026" },
              { title: "GDPR", status: "Compliant", note: "UK & EU. DPA available on Enterprise" },
              { title: "ISO 27001", status: "Roadmap", note: "Planned Q1 2027" },
              { title: "Pen testing", status: "Annual", note: "Last conducted: March 2026" },
              { title: "UK DSPT", status: "Applicable", note: "For NHS / public sector clients" },
            ].map(({ title, status, note }) => (
              <div key={title} className="flex items-center justify-between p-4 border border-[#e8e8f0] rounded-[10px] hover:border-[#C5DCF0] transition-colors">
                <div>
                  <p className="text-[13px] font-semibold text-[#0d0d1a]">{title}</p>
                  <p className="text-[11.5px] text-[#9494a8]">{note}</p>
                </div>
                <span className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full ${
                  status === "Compliant" ? "bg-[#f0fdf4] text-[#16a34a]" :
                  status === "Annual" ? "bg-[#EEF5FB] text-[#5890B8]" :
                  "bg-[#f3f3f8] text-[#9494a8]"
                }`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network security */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Network security</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">Layers of protection.</h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "🚧", title: "IP allowlisting", body: "Restrict database access to specific IP ranges. Useful for CI/CD pipelines, office networks, or VPN exit nodes." },
              { icon: "🔑", title: "API key scoping", body: "Create API keys with specific table and operation permissions. Service keys for your backend, anon keys for your client." },
              { icon: "🔏", title: "Database roles", body: "Postgres role separation between anon, authenticated, and service_role. Each role has only the permissions it needs." },
              { icon: "📊", title: "DDoS protection", body: "Cloudflare's global network absorbs volumetric attacks before they reach your database. Rate limiting configurable per endpoint." },
              { icon: "🧪", title: "Vulnerability scanning", body: "Automated CVE scanning on all container images. Critical vulnerabilities patched within 24 hours." },
              { icon: "🔍", title: "SIEM integration", body: "Ship audit logs to Datadog, Splunk, or any SIEM via webhook or S3 export. Filter by event type, user, or severity." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="feature-card border border-[#e8e8f0] rounded-[12px] p-5">
                <div className="card-icon w-9 h-9 rounded-[8px] border border-[#e8e8f0] bg-[#fafafa] flex items-center justify-center text-[18px] mb-4 transition-all">{icon}</div>
                <h3 className="text-[13px] font-bold text-[#0d0d1a] mb-1.5">{title}</h3>
                <p className="text-[12px] text-[#6b6b80] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report a vulnerability */}
      <section className="px-6 py-16 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] mb-3">Found a vulnerability?</h2>
          <p className="text-[13px] text-[#6b6b80] max-w-md mx-auto mb-5">
            We take security reports seriously and respond to all disclosures within 24 hours. Responsible disclosure is rewarded.
          </p>
          <a href="mailto:security@budruum.co.uk" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-6 py-2.5 rounded-[8px]">Email security@budruum.co.uk</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
