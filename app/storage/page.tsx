import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function StoragePage() {
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
            <span className="text-[11px] font-semibold text-[#5890B8] tracking-wide uppercase">Storage</span>
          </div>
          <h1 className="text-[44px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] leading-[1.1] mb-5 anim-hero" style={{ animationDelay: "0.06s" }}>
            Store anything.<br />Pay <span className="gradient-text">nothing for egress.</span>
          </h1>
          <p className="text-[16px] text-[#6b6b80] max-w-xl mx-auto mb-8 leading-relaxed anim-hero" style={{ animationDelay: "0.12s" }}>
            S3-compatible object storage on Cloudflare R2 — with zero egress fees, a built-in CDN, and access control that plugs into your existing RLS policies.
          </p>
          <div className="flex items-center justify-center gap-3 anim-hero" style={{ animationDelay: "0.18s" }}>
            <a href="/signup" className="btn-primary bg-[#8BB8D8] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px]">Start for free</a>
            <Link href="/docs" className="text-[13px] font-semibold text-[#0d0d1a] px-5 py-2.5 rounded-[8px] border border-[#e8e8f0] hover:border-[#C5DCF0] transition-colors">Documentation</Link>
          </div>
        </div>
      </section>

      {/* Bucket browser visual */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto rounded-[16px] border border-[#e8e8f0] overflow-hidden shadow-sm">
          <div className="bg-[#f8f8fc] border-b border-[#e8e8f0] px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e8e8f0]" />
            <div className="w-3 h-3 rounded-full bg-[#e8e8f0]" />
            <div className="w-3 h-3 rounded-full bg-[#e8e8f0]" />
            <span className="ml-3 text-[11.5px] text-[#9494a8] font-medium">Storage — media-assets bucket</span>
          </div>
          <div className="flex">
            <div className="w-48 border-r border-[#e8e8f0] p-3 bg-[#fafafa]">
              <p className="text-[10px] uppercase tracking-widest text-[#9494a8] font-semibold mb-2 px-2">Buckets</p>
              {["media-assets", "documents", "avatars", "exports"].map((b, i) => (
                <div key={b} className={`px-2 py-1.5 rounded-[6px] text-[12px] font-medium mb-0.5 cursor-default ${i === 0 ? "bg-[#EEF5FB] text-[#5890B8]" : "text-[#6b6b80] hover:bg-[#f0f0f8]"}`}>{b}</div>
              ))}
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[#e8e8f0] bg-[#fafafa]">
                    {["Name", "Size", "Type", "Last modified", "Access"].map(c => (
                      <th key={c} className="px-4 py-2.5 text-left font-semibold text-[#6b6b80] whitespace-nowrap">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["hero-brand-v3.png", "2.4 MB", "image/png", "2026-07-18", "Public"],
                    ["campaign-video-q3.mp4", "148 MB", "video/mp4", "2026-07-15", "Private"],
                    ["logo-pack.zip", "8.1 MB", "application/zip", "2026-07-10", "Signed URL"],
                    ["client-brief.pdf", "340 KB", "application/pdf", "2026-07-08", "Private"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#f0f0f8] hover:bg-[#EEF5FB] transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2.5 text-[#0d0d1a] whitespace-nowrap font-mono text-[11px]">
                          {j === 4 ? (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              cell === "Public" ? "bg-[#f0fdf4] text-[#16a34a]" :
                              cell === "Private" ? "bg-[#f3f3f8] text-[#6b6b80]" :
                              "bg-[#EEF5FB] text-[#5890B8]"
                            }`}>{cell}</span>
                          ) : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-[#fafafa] border-y border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] text-center mb-3">Storage features</p>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] text-center mb-12">
            Built for files agencies actually store.
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "💰", title: "Zero egress fees", body: "Built on Cloudflare R2. Download your files as many times as you want — to any region, to any user — without paying for bandwidth." },
              { icon: "🌐", title: "Global CDN", body: "Every public file is served from Cloudflare's 300+ edge nodes. Average TTFB under 50ms from London to Tokyo." },
              { icon: "🔒", title: "RLS-aware access", body: "Plug your storage policies into the same RLS you use for your database. One security model for your entire stack." },
              { icon: "🔗", title: "Presigned URLs", body: "Generate expiring signed URLs for private file access. Set expiry from 60 seconds to 7 days. Perfect for client portals." },
              { icon: "🖼️", title: "Image transformations", body: "Resize, crop, convert formats, and optimise images on the fly via URL parameters. No extra service required." },
              { icon: "📂", title: "Bucket policies", body: "Public buckets for marketing assets. Private for client documents. Per-file ACL for fine-grained sharing." },
              { icon: "⬆️", title: "Resumable uploads", body: "Large files upload in chunks. Interrupted? Resume from where you left off. Works seamlessly on mobile networks." },
              { icon: "🗂️", title: "Folder emulation", body: "Organise files in nested paths. The API understands / as a folder separator, so your existing folder logic works." },
              { icon: "📡", title: "S3-compatible API", body: "Use any S3 SDK or tool you already know. boto3, aws-sdk, s3cmd — they all work without modification." },
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
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">SDK</p>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-4 leading-tight">
              Upload, list, and share<br />in three calls.
            </h2>
            <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-5">
              The storage SDK wraps Cloudflare R2 with helpers for multipart uploads, presigned URLs, and image transforms.
            </p>
            <div className="bg-[#EEF5FB] border border-[#C5DCF0] rounded-[10px] p-4">
              <p className="text-[11.5px] font-semibold text-[#5890B8] mb-1">Egress cost comparison</p>
              <div className="space-y-1.5 mt-2">
                {[
                  { label: "Budruum / Cloudflare R2", cost: "£0.00 / GB" },
                  { label: "AWS S3", cost: "£0.085 / GB" },
                  { label: "Google Cloud Storage", cost: "£0.08 / GB" },
                  { label: "Firebase Storage", cost: "£0.12 / GB" },
                ].map(({ label, cost }) => (
                  <div key={label} className="flex justify-between text-[12px]">
                    <span className={label.startsWith("Budruum") ? "font-semibold text-[#0d0d1a]" : "text-[#9494a8]"}>{label}</span>
                    <span className={label.startsWith("Budruum") ? "font-bold text-[#5890B8]" : "text-[#9494a8]"}>{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[12px] border border-[#e8e8f0] overflow-hidden shadow-sm">
            <div className="bg-[#f8f8fc] border-b border-[#e8e8f0] px-4 py-2.5 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8e8f0]" />
              <span className="ml-2 text-[11px] text-[#9494a8]">storage.ts</span>
            </div>
            <pre className="p-5 text-[12px] leading-relaxed overflow-x-auto bg-white" style={{ fontFamily: "var(--font-mono)" }}>
              <code>{`import { budruum } from "@budruum/client"

// Upload a file
const { data, error } = await budruum
  .storage
  .from("media-assets")
  .upload("campaigns/hero-v3.png", file, {
    cacheControl: "3600",
    upsert: true
  })

// Get a public URL
const { data: { publicUrl } } = budruum
  .storage
  .from("media-assets")
  .getPublicUrl("campaigns/hero-v3.png")

// Generate a presigned URL (expires in 1 hour)
const { data: { signedUrl } } = await budruum
  .storage
  .from("documents")
  .createSignedUrl("briefs/q3-brand.pdf", 3600)

// List all files in a folder
const { data: files } = await budruum
  .storage
  .from("media-assets")
  .list("campaigns", {
    limit: 50,
    sortBy: { column: "created_at", order: "desc" }
  })

// Image transform on the fly
const optimised = budruum.storage
  .from("media-assets")
  .getPublicUrl("avatars/user-1.jpg", {
    transform: {
      width: 200, height: 200,
      resize: "cover", format: "webp"
    }
  })`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#EEF5FB] border-y border-[#C5DCF0]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3">5 GB of storage, free forever.</h2>
          <p className="text-[13px] text-[#6b6b80] mb-7">Upgrade when you need more. Egress is always zero.</p>
          <a href="/signup" className="btn-primary inline-block bg-[#8BB8D8] text-white text-[13px] font-semibold px-7 py-3 rounded-[8px]">Start uploading</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

