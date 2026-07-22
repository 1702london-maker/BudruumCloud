import { notFound } from "next/navigation";
import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <MegaNav />
      <main className="px-6 pt-28 pb-16">
        <article className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#EEF5FB] text-[#5890B8]">{post.category}</span>
            <span className="text-[12px] text-[#9494a8]">{post.date}</span>
            <span className="text-[12px] text-[#9494a8]">{post.readTime} read</span>
          </div>
          <h1 className="text-[40px] font-extrabold tracking-[-0.035em] text-[#0d0d1a] leading-[1.05] mb-5">{post.title}</h1>
          <p className="text-[16px] text-[#6b6b80] leading-7 mb-10">{post.excerpt}</p>
          <div className="space-y-6 text-[15px] leading-7 text-[#242436]">
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
