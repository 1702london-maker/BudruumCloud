import Link from "next/link";

const BudruumLogo = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <ellipse cx="50" cy="40" rx="38" ry="30" fill="#C5DCF0" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <rect x="16" y="50" width="68" height="30" rx="5" fill="#B8D4E8" />
    <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="white" fontFamily="Georgia, serif">B</text>
  </svg>
);

const GH = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const VC = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>;
const DC = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>;
const IG = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TT = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>;

export function Footer() {
  return (
    <footer className="border-t border-[#e8e8f0] bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-7">
        <div className="grid grid-cols-5 gap-7 mb-9">
          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"] },
            { title: "Developers", links: ["Documentation", "API Reference", "@budruum/client", "Open Source", "Community"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Privacy", "Terms"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">{title}</p>
              <div className="space-y-2">
                {links.map((l) => (
                  <a key={l} href="#" className="block text-[12px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">{l}</a>
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Connect</p>
            <div className="space-y-2">
              {[{ l: "GitHub", I: GH }, { l: "Vercel", I: VC }, { l: "Discord", I: DC }, { l: "Instagram", I: IG }, { l: "TikTok", I: TT }].map(({ l, I }) => (
                <a key={l} href="#" className="flex items-center gap-2 text-[12px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">
                  <I />{l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-widest text-[#9494a8] mb-3.5">Newsletter</p>
            <p className="text-[11px] text-[#9494a8] mb-3 leading-snug">Platform updates and developer resources.</p>
            <input type="email" placeholder="your@email.com"
              className="w-full border border-[#e8e8f0] rounded-[6px] px-3 py-1.5 text-[11.5px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] mb-2" />
            <button className="w-full bg-[#8BB8D8] text-white text-[11.5px] font-semibold py-1.5 rounded-[6px] hover:bg-[#6FA3C8] transition-colors">Subscribe</button>
          </div>
        </div>
        <div className="border-t border-[#e8e8f0] pt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BudruumLogo size={18} />
            <span className="text-[11.5px] text-[#9494a8]">© 2026 Budruum. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            {[
              { href: "/database", l: "Database" },
              { href: "/auth", l: "Auth" },
              { href: "/storage", l: "Storage" },
              { href: "/functions", l: "Functions" },
              { href: "/realtime", l: "Realtime" },
            ].map(({ href, l }) => (
              <Link key={l} href={href} className="text-[11px] text-[#c0c0d0] hover:text-[#9494a8] transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
