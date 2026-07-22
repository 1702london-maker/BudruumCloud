"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const BudruumLogo = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <ellipse cx="50" cy="40" rx="38" ry="30" fill="#C5DCF0" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <rect x="16" y="50" width="68" height="30" rx="5" fill="#B8D4E8" />
    <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="white" fontFamily="Georgia, serif">B</text>
  </svg>
);

type MenuKey = "Product" | "Developers" | "Solutions" | null;

export function MegaNav() {
  const [open, setOpen] = useState<MenuKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-md border-b border-[#e8e8f0]">
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Logo only — no text */}
        <Link href="/" className="flex items-center">
          <BudruumLogo size={36} />
        </Link>

        {/* Nav items */}
        <div className="hidden md:flex items-center gap-0.5">
          {(["Product", "Developers", "Solutions"] as MenuKey[]).map((key) => (
            <div key={key} className="relative" onMouseEnter={() => show(key)} onMouseLeave={hide}>
              <button className={`flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium rounded-[6px] transition-colors ${
                open === key ? "text-[#1b1b23] bg-[#EEF5FB]" : "text-[#555566] hover:text-[#1b1b23] hover:bg-[#f5f5f9]"
              }`}>
                {key}
                <ChevronDown size={13} className={`transition-transform duration-200 ${open === key ? "rotate-180" : ""}`} />
              </button>

              {open === key && (
                <div
                  className="mega-dropdown absolute top-[calc(100%+4px)] bg-white border border-[#e8e8f0] rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden"
                  style={{ left: key === "Product" ? 0 : key === "Developers" ? -120 : -80, minWidth: key === "Product" ? 640 : 480 }}
                  onMouseEnter={() => show(key)}
                  onMouseLeave={hide}
                >
                  {key === "Product" && (
                    <div className="grid grid-cols-3 gap-0">
                      {/* Platform */}
                      <div className="p-6 border-r border-[#f0f0f5]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">Platform</p>
                        <div className="space-y-0.5">
                          {[
                            { label: "Database", sub: "Managed Postgres with branching" },
                            { label: "Authentication", sub: "Email, OAuth, magic links, MFA" },
                            { label: "Storage", sub: "S3-compatible via Cloudflare R2" },
                            { label: "Edge Functions", sub: "Serverless on Cloudflare Workers" },
                            { label: "Realtime", sub: "WebSocket subscriptions" },
                          ].map((item) => (
                            <a key={item.label} href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#EEF5FB] transition-colors group">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5DCF0] shrink-0 mt-[6px] group-hover:bg-[#8BB8D8] transition-colors" />
                              <div>
                                <p className="text-[13px] font-semibold text-[#1b1b23] leading-none mb-0.5">{item.label}</p>
                                <p className="text-[11.5px] text-[#9494a8] leading-tight">{item.sub}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Add-ons */}
                      <div className="p-6 border-r border-[#f0f0f5]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">Add-ons</p>
                        <div className="space-y-0.5 mb-6">
                          {[
                            { label: "GitHub Integration", sub: "Branch preview databases on PRs" },
                            { label: "Vercel Connect", sub: "Auto env injection on deploy" },
                            { label: "Analytics", sub: "API usage, errors and latency" },
                          ].map((item) => (
                            <a key={item.label} href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#EEF5FB] transition-colors group">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5DCF0] shrink-0 mt-[6px] group-hover:bg-[#8BB8D8] transition-colors" />
                              <div>
                                <p className="text-[13px] font-semibold text-[#1b1b23] leading-none mb-0.5">{item.label}</p>
                                <p className="text-[11.5px] text-[#9494a8] leading-tight">{item.sub}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="border-t border-[#f0f0f5] pt-4">
                          <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-3">Migrate</p>
                          {["From AWS Amplify", "From PlanetScale", "From Neon"].map((t) => (
                            <a key={t} href="#" className="block text-[12.5px] text-[#6b6b80] hover:text-[#1b1b23] py-1.5 px-3 rounded-[6px] hover:bg-[#EEF5FB] transition-colors">{t}</a>
                          ))}
                        </div>
                      </div>

                      {/* Right feature callout */}
                      <div className="p-6 bg-[#fafafa]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">Highlight</p>
                        <div className="rounded-[10px] border border-[#C5DCF0] bg-[#EEF5FB] p-4 mb-4">
                          <p className="text-[13px] font-bold text-[#1b1b23] mb-1">Branch preview databases</p>
                          <p className="text-[12px] text-[#6b6b80] leading-relaxed">Every pull request gets its own isolated Postgres database, automatically.</p>
                          <a href="#" className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#8BB8D8] mt-3 hover:text-[#5890B8]">
                            Learn more <ArrowRight size={11} />
                          </a>
                        </div>
                        <div className="rounded-[10px] border border-[#e8e8f0] bg-white p-4">
                          <p className="text-[13px] font-bold text-[#1b1b23] mb-1">Vercel auto-inject</p>
                          <p className="text-[12px] text-[#6b6b80] leading-relaxed">Connect once and all env vars push to every Vercel deploy.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {key === "Developers" && (
                    <div className="grid grid-cols-2 gap-0">
                      <div className="p-6 border-r border-[#f0f0f5]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">Resources</p>
                        <div className="space-y-0.5">
                          {[
                            { label: "Documentation", sub: "Guides and full API reference" },
                            { label: "SDK Reference", sub: "@budruum/client — quick start" },
                            { label: "Open Source", sub: "Core libraries on GitHub" },
                            { label: "Changelog", sub: "Latest platform updates" },
                            { label: "Status", sub: "Uptime and incident history" },
                          ].map((item) => (
                            <a key={item.label} href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#EEF5FB] transition-colors group">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5DCF0] shrink-0 mt-[6px] group-hover:bg-[#8BB8D8] transition-colors" />
                              <div>
                                <p className="text-[13px] font-semibold text-[#1b1b23] leading-none mb-0.5">{item.label}</p>
                                <p className="text-[11.5px] text-[#9494a8] leading-tight">{item.sub}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 bg-[#fafafa]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">Blog</p>
                        <div className="space-y-3">
                          {[
                            { label: "Budruum v1.0 is live", sub: "Announcing our public launch and what's next" },
                            { label: "Branch preview DBs explained", sub: "How isolated preview databases work under the hood" },
                            { label: "Building at the edge", sub: "Why Cloudflare Workers power our functions" },
                          ].map((item) => (
                            <a key={item.label} href="#" className="block p-3.5 rounded-[9px] border border-[#e8e8f0] bg-white hover:border-[#C5DCF0] hover:bg-[#EEF5FB] transition-all">
                              <p className="text-[12.5px] font-semibold text-[#1b1b23] mb-1 leading-snug">{item.label}</p>
                              <p className="text-[11.5px] text-[#9494a8] leading-snug">{item.sub}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {key === "Solutions" && (
                    <div className="grid grid-cols-2 gap-0">
                      <div className="p-6 border-r border-[#f0f0f5]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">Who it&apos;s for</p>
                        <div className="space-y-0.5">
                          {[
                            { label: "Agencies", sub: "All client projects under one roof" },
                            { label: "Startups", sub: "Ship fast on solid infrastructure" },
                            { label: "Enterprise", sub: "Custom SLAs and dedicated infra" },
                            { label: "Freelancers", sub: "Your own BaaS, your margins" },
                          ].map((item) => (
                            <a key={item.label} href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#EEF5FB] transition-colors group">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5DCF0] shrink-0 mt-[6px] group-hover:bg-[#8BB8D8] transition-colors" />
                              <div>
                                <p className="text-[13px] font-semibold text-[#1b1b23] leading-none mb-0.5">{item.label}</p>
                                <p className="text-[11.5px] text-[#9494a8] leading-tight">{item.sub}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 bg-[#fafafa]">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9494a8] mb-4">App type</p>
                        <div className="space-y-0.5">
                          {[
                            { label: "SaaS", sub: "Multi-tenant web applications" },
                            { label: "B2B platforms", sub: "Client portals and dashboards" },
                            { label: "Mobile backends", sub: "React Native & Flutter" },
                            { label: "AI applications", sub: "Vector search and edge functions" },
                          ].map((item) => (
                            <a key={item.label} href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#EEF5FB] transition-colors group">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5DCF0] shrink-0 mt-[6px] group-hover:bg-[#8BB8D8] transition-colors" />
                              <div>
                                <p className="text-[13px] font-semibold text-[#1b1b23] leading-none mb-0.5">{item.label}</p>
                                <p className="text-[11.5px] text-[#9494a8] leading-tight">{item.sub}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <a href="#pricing" className="px-4 py-2 text-[13.5px] font-medium text-[#555566] hover:text-[#1b1b23] hover:bg-[#f5f5f9] rounded-[6px] transition-colors">Pricing</a>
          <a href="#" className="px-4 py-2 text-[13.5px] font-medium text-[#555566] hover:text-[#1b1b23] hover:bg-[#f5f5f9] rounded-[6px] transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-[13.5px] font-medium text-[#555566] hover:text-[#1b1b23] transition-colors px-3 py-2">
            Sign in
          </Link>
          <Link href="/signup" className="flex items-center gap-1.5 bg-[#8BB8D8] text-white text-[13px] font-semibold px-4 py-2 rounded-[7px] hover:bg-[#6FA3C8] transition-colors shadow-sm">
            Get started <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
