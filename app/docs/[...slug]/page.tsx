import MegaNav from "@/components/home/mega-nav";
import { Footer } from "@/components/layout/footer";
import { docFor } from "@/lib/content";

export default async function DocsArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = docFor(slug || []);

  return (
    <div className="min-h-screen bg-white">
      <MegaNav />
      <main className="px-6 pt-28 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-[220px_1fr] gap-10">
          <aside className="border-r border-[#e8e8f0] pr-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-3">Docs</p>
            {["quickstart", "client", "database", "auth", "storage", "functions", "realtime", "api-keys"].map((item) => (
              <a key={item} href={`/docs/${item}`} className="block h-8 rounded-[7px] px-2.5 py-1.5 text-[12.5px] text-[#6b6b80] hover:bg-[#fbfbfd] hover:text-[#0d0d1a] capitalize">{item.replace(/-/g, " ")}</a>
            ))}
          </aside>
          <article>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">{doc.product}</p>
            <h1 className="text-[36px] font-extrabold tracking-[-0.03em] text-[#0d0d1a] mb-4">{doc.title}</h1>
            <p className="text-[15px] text-[#6b6b80] leading-7 mb-8">This page documents the current live Budruum Cloud behavior. Features marked as planned are intentionally called out so builders know what is safe to rely on today.</p>
            <section className="border border-[#e8e8f0] rounded-[10px] bg-white overflow-hidden">
              {doc.bullets.map((item) => (
                <div key={item} className="px-5 py-4 border-b border-[#f0f0f6] last:border-b-0 text-[13.5px] text-[#242436]">{item}</div>
              ))}
            </section>
            <h2 className="text-[18px] font-bold mt-10 mb-3">Basic client setup</h2>
            <pre className="rounded-[8px] border border-[#e8e8f0] bg-[#fbfbfd] p-4 text-[12px] overflow-auto">{`import { createClient } from "@budruum/client";

const budruum = createClient("https://budruumcloud.vercel.app", "bud_anon_xxx", {
  projectId: "your_project_id"
});`}</pre>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
