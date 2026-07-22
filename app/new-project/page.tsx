import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const REGIONS = [
  { id: "eu-west-2", label: "EU West 2", sub: "London, UK", recommended: true },
  { id: "eu-central-1", label: "EU Central 1", sub: "Frankfurt, Germany" },
  { id: "us-east-1", label: "US East 1", sub: "N. Virginia, USA" },
  { id: "ap-southeast-1", label: "AP Southeast 1", sub: "Singapore" },
];

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-[#f8f8fc]">
      <nav className="border-b border-[#e8e8f0] bg-white">
        <div className="max-w-3xl mx-auto px-6 h-[56px] flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-[13px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">
            <ArrowLeft size={14} /> All projects
          </Link>
          <span className="text-[#e8e8f0]">/</span>
          <span className="text-[13px] font-medium text-[#0d0d1a]">New project</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-[24px] font-bold text-[#0d0d1a] mb-1">Create a new project</h1>
        <p className="text-[14px] text-[#9494a8] mb-10">A project holds your database, storage, auth, and edge functions.</p>

        <div className="space-y-5">
          {/* Organisation */}
          <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white">
            <div className="px-5 py-4 border-b border-[#e8e8f0] bg-[#f8f8fc]">
              <p className="text-[13px] font-semibold text-[#0d0d1a]">Organisation</p>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 p-3 border border-[#4231d0] rounded-[6px] bg-[#ede9ff]">
                <div className="w-6 h-6 rounded-[4px] bg-[#4231d0] flex items-center justify-center text-white text-[10px] font-bold">B</div>
                <span className="text-[13px] font-semibold text-[#0d0d1a]">Budruum Agency</span>
              </div>
            </div>
          </div>

          {/* Project details */}
          <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white">
            <div className="px-5 py-4 border-b border-[#e8e8f0] bg-[#f8f8fc]">
              <p className="text-[13px] font-semibold text-[#0d0d1a]">Project details</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-[13px] font-medium text-[#0d0d1a] block mb-1.5">Project name</label>
                <input
                  type="text"
                  placeholder="e.g. client-webapp-prod"
                  className="w-full px-3 py-2.5 border border-[#e8e8f0] rounded-[6px] text-[13px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] bg-white"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#0d0d1a] block mb-1.5">Database password</label>
                <input
                  type="password"
                  placeholder="Min. 12 characters"
                  className="w-full px-3 py-2.5 border border-[#e8e8f0] rounded-[6px] text-[13px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Region */}
          <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white">
            <div className="px-5 py-4 border-b border-[#e8e8f0] bg-[#f8f8fc]">
              <p className="text-[13px] font-semibold text-[#0d0d1a]">Region</p>
              <p className="text-[12px] text-[#9494a8] mt-0.5">Choose the region closest to your users for the lowest latency.</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {REGIONS.map((r) => (
                <label key={r.id} className="flex items-start gap-3 p-3.5 border border-[#e8e8f0] rounded-[7px] cursor-pointer hover:border-[#c4b8f8] hover:bg-[#f8f8fc] transition-all has-[:checked]:border-[#4231d0] has-[:checked]:bg-[#ede9ff]">
                  <input type="radio" name="region" value={r.id} defaultChecked={r.recommended} className="mt-0.5 accent-[#4231d0]" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#0d0d1a]">
                      {r.label}
                      {r.recommended && <span className="ml-2 text-[10px] font-semibold text-[#4231d0] bg-[#ede9ff] border border-[#c4b8f8] px-1.5 py-0.5 rounded-full">Recommended</span>}
                    </p>
                    <p className="text-[12px] text-[#9494a8]">{r.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Plan */}
          <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white">
            <div className="px-5 py-4 border-b border-[#e8e8f0] bg-[#f8f8fc]">
              <p className="text-[13px] font-semibold text-[#0d0d1a]">Plan</p>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {[
                { name: "Starter", price: "£29/mo", features: "500MB DB · 1k auth users" },
                { name: "Pro", price: "£79/mo", features: "5GB DB · Unlimited users", recommended: true },
                { name: "Agency", price: "£249/mo", features: "Unlimited projects" },
              ].map((p) => (
                <label key={p.name} className="flex flex-col p-3.5 border border-[#e8e8f0] rounded-[7px] cursor-pointer hover:border-[#c4b8f8] transition-all has-[:checked]:border-[#4231d0] has-[:checked]:bg-[#ede9ff]">
                  <div className="flex items-center justify-between mb-2">
                    <input type="radio" name="plan" defaultChecked={p.recommended} className="accent-[#4231d0]" />
                    {p.recommended && <span className="text-[10px] font-bold text-[#4231d0]">POPULAR</span>}
                  </div>
                  <p className="text-[14px] font-bold text-[#0d0d1a]">{p.name}</p>
                  <p className="text-[13px] font-semibold text-[#4231d0] mb-1">{p.price}</p>
                  <p className="text-[12px] text-[#9494a8]">{p.features}</p>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/dashboard" className="text-[13px] font-medium text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">
              Cancel
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-[#4231d0] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[7px] hover:bg-[#3520b8] transition-colors"
            >
              Create project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
