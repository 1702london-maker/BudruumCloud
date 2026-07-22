import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";

const POSTS = [
  {
    slug: "branch-databases-agencies",
    category: "Engineering",
    title: "How branch databases changed the way we ship client projects",
    excerpt: "Every pull request now spins up its own Postgres snapshot. Here's how that works under the hood and why it made our staging workflow redundant.",
    date: "July 14, 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "zero-egress-r2",
    category: "Infrastructure",
    title: "Why we moved storage to Cloudflare R2 (and made egress free)",
    excerpt: "We ran the numbers on what agencies were paying in S3 egress. The result was impossible to justify. Here's the architectural decision that changed it.",
    date: "June 28, 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "realtime-ably-postgres-cdc",
    category: "Engineering",
    title: "Building realtime subscriptions on top of Postgres CDC with Ably",
    excerpt: "A technical deep-dive into how we turn Postgres Write-Ahead Logs into WebSocket events that land in your client in under 100ms.",
    date: "June 15, 2026",
    readTime: "9 min",
    featured: false,
  },
  {
    slug: "rls-agencies-guide",
    category: "Guide",
    title: "Row Level Security for agencies: a practical guide",
    excerpt: "RLS is the most powerful — and misunderstood — feature in Postgres. Here's how to use it to build truly multi-tenant applications for your clients.",
    date: "June 2, 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "drizzle-budruum",
    category: "Guide",
    title: "Type-safe database migrations with Drizzle ORM and Budruum",
    excerpt: "Drizzle Kit generates migrations from your TypeScript schema. Budruum applies them in your dev, preview, and production environments automatically.",
    date: "May 22, 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "agency-pricing-model",
    category: "Product",
    title: "The pricing model built for agencies (not SaaS startups)",
    excerpt: "We spent 6 months researching how agencies think about infrastructure costs. What we found changed how we priced Budruum entirely.",
    date: "May 10, 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "edge-functions-typescript",
    category: "Engineering",
    title: "Writing production edge functions in TypeScript on Cloudflare Workers",
    excerpt: "A walkthrough of our function runtime: how we handle secrets, database access, cold starts, and error tracing in a globally distributed context.",
    date: "April 28, 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "mfa-auth-agencies",
    category: "Security",
    title: "Enforcing MFA across all your client projects in one dashboard",
    excerpt: "Multi-factor authentication shouldn't be an afterthought. Here's how to enable and audit MFA at the platform level, not project by project.",
    date: "April 15, 2026",
    readTime: "4 min",
    featured: false,
  },
];

const categoryColor: Record<string, string> = {
  Engineering: "bg-[#EEF5FB] text-[#5890B8]",
  Infrastructure: "bg-[#f0fdf4] text-[#16a34a]",
  Guide: "bg-[#fffbeb] text-[#d97706]",
  Product: "bg-[#f3f3f8] text-[#6b6b80]",
  Security: "bg-[#fef2f2] text-[#dc2626]",
};

export default function BlogPage() {
  const featured = POSTS.find(p => p.featured)!;
  const rest = POSTS.filter(p => !p.featured);

  return (
    <div className="bg-white min-h-screen">
      <MegaNav />

      {/* Hero */}
      <section className="pt-24 pb-12 px-6 border-b border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] mb-2 anim-hero">The Budruum Blog</h1>
          <p className="text-[14px] text-[#9494a8] anim-hero" style={{ animationDelay: "0.07s" }}>Engineering deep-dives, product guides, and infrastructure thinking for modern agencies.</p>
        </div>
      </section>

      {/* Featured post */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <a href={`/blog/${featured.slug}`} className="feature-card group flex gap-8 border border-[#e8e8f0] rounded-[16px] p-8 hover:border-[#8BB8D8] transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${categoryColor[featured.category]}`}>{featured.category}</span>
                <span className="text-[11px] text-[#9494a8]">{featured.date}</span>
                <span className="text-[11px] text-[#9494a8]">{featured.readTime} read</span>
              </div>
              <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] mb-3 leading-tight group-hover:text-[#5890B8] transition-colors">{featured.title}</h2>
              <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-5">{featured.excerpt}</p>
              <span className="text-[12.5px] font-semibold text-[#8BB8D8]">Read article →</span>
            </div>
            <div className="w-60 h-40 rounded-[12px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center flex-shrink-0">
              <span className="text-[40px]">🌿</span>
            </div>
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          {["All", "Engineering", "Infrastructure", "Guide", "Product", "Security"].map(c => (
            <button key={c} className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors ${c === "All" ? "bg-[#0d0d1a] text-white" : "bg-[#fafafa] text-[#9494a8] hover:bg-[#EEF5FB] hover:text-[#5890B8] border border-[#e8e8f0]"}`}>{c}</button>
          ))}
        </div>
      </section>

      {/* Post grid */}
      <section className="px-6 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5">
          {rest.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`}
              className="feature-card group flex flex-col border border-[#e8e8f0] rounded-[14px] overflow-hidden hover:border-[#8BB8D8] transition-all">
              <div className="h-28 bg-[#EEF5FB] flex items-center justify-center">
                <span className="text-[32px]">
                  {post.category === "Engineering" ? "⚙️" :
                   post.category === "Infrastructure" ? "🏗️" :
                   post.category === "Guide" ? "📖" :
                   post.category === "Product" ? "📦" : "🔐"}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColor[post.category]}`}>{post.category}</span>
                  <span className="text-[10.5px] text-[#9494a8]">{post.readTime}</span>
                </div>
                <h3 className="text-[13px] font-bold text-[#0d0d1a] mb-2 leading-snug group-hover:text-[#5890B8] transition-colors flex-1">{post.title}</h3>
                <p className="text-[11.5px] text-[#9494a8] leading-snug mb-3 line-clamp-2">{post.excerpt}</p>
                <p className="text-[11px] text-[#c0c0d0]">{post.date}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 py-16 bg-[#EEF5FB] border-y border-[#C5DCF0] mt-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] mb-2">Engineering thinking, in your inbox.</h2>
          <p className="text-[12.5px] text-[#6b6b80] mb-5">New posts every two weeks. No noise.</p>
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
