"use client";
import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Copy, Eye, EyeOff, RefreshCw, Plus } from "lucide-react";

export default function ApiKeysPage() {
  const [showService, setShowService] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <Topbar title="API Keys" subtitle="Manage your project's API credentials" />
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Project URL */}
        <div className="border border-[#e8e8f0] rounded-[8px] p-5 mb-4 bg-white">
          <p className="text-[13px] font-semibold text-[#0d0d1a] mb-1">Project URL</p>
          <p className="text-[12px] text-[#9494a8] mb-3">Use this as your BUDRUUM_URL env variable in your project.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-[#f8f8fc] border border-[#e8e8f0] rounded-[6px] font-mono text-[12px] text-[#0d0d1a]">
              https://proj-dehadza.budruum.co
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[12px] font-medium text-[#6b6b80] hover:border-[#d0d0e0] hover:text-[#0d0d1a] bg-white transition-colors">
              <Copy size={12} /> Copy
            </button>
          </div>
        </div>

        {/* Anon key */}
        <div className="border border-[#e8e8f0] rounded-[8px] p-5 mb-4 bg-white">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[13px] font-semibold text-[#0d0d1a]">Anon / Public key</p>
            <span className="text-[11px] font-semibold bg-[#f0fdf4] text-[#16a34a] px-2 py-0.5 rounded-full">Safe to expose</span>
          </div>
          <p className="text-[12px] text-[#9494a8] mb-3">Use for client-side calls. Row Level Security (RLS) is enforced.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-[#f8f8fc] border border-[#e8e8f0] rounded-[6px] font-mono text-[12px] text-[#0d0d1a] overflow-hidden text-ellipsis whitespace-nowrap">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJidWRydXVtIiwicm9sZSI6ImFub24ifQ.xK9mP2...
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[12px] font-medium text-[#6b6b80] hover:border-[#d0d0e0] hover:text-[#0d0d1a] bg-white transition-colors">
              <Copy size={12} /> Copy
            </button>
          </div>
        </div>

        {/* Service key */}
        <div className="border border-[#fecaca] rounded-[8px] p-5 mb-4 bg-white">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[13px] font-semibold text-[#0d0d1a]">Service role key</p>
            <span className="text-[11px] font-semibold bg-[#fef2f2] text-[#dc2626] px-2 py-0.5 rounded-full">Server only — secret</span>
          </div>
          <p className="text-[12px] text-[#9494a8] mb-3">Bypasses RLS. Never expose in client-side code. Use in server-side environments only.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-[6px] font-mono text-[12px] text-[#0d0d1a] overflow-hidden text-ellipsis whitespace-nowrap">
              {showService ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJidWRydXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSJ9.zYqR8..." : "••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
            </div>
            <button onClick={() => setShowService(!showService)} className="flex items-center gap-1.5 px-3 py-2 border border-[#fecaca] rounded-[6px] text-[12px] font-medium text-[#dc2626] hover:bg-[#fef2f2] bg-white transition-colors">
              {showService ? <EyeOff size={12} /> : <Eye size={12} />}
              {showService ? "Hide" : "Show"}
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[12px] font-medium text-[#6b6b80] hover:border-[#d0d0e0] hover:text-[#0d0d1a] bg-white transition-colors">
              <Copy size={12} /> Copy
            </button>
          </div>
        </div>

        {/* JWT secret */}
        <div className="border border-[#e8e8f0] rounded-[8px] p-5 mb-6 bg-white">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[13px] font-semibold text-[#0d0d1a]">JWT secret</p>
            <span className="text-[11px] font-semibold bg-[#fef2f2] text-[#dc2626] px-2 py-0.5 rounded-full">Secret</span>
          </div>
          <p className="text-[12px] text-[#9494a8] mb-3">Used to sign JWTs. Rotate this to invalidate all existing sessions.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-[#f8f8fc] border border-[#e8e8f0] rounded-[6px] font-mono text-[12px] text-[#9494a8]">
              ••••••••••••••••••••••••••••••••
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[12px] font-medium text-[#dc2626] hover:border-[#fecaca] bg-white transition-colors">
              <RefreshCw size={12} /> Rotate
            </button>
          </div>
        </div>

        {/* Vercel env injection */}
        <div className="border border-[#e8e8f0] rounded-[8px] p-5 bg-[#f8f8fc]">
          <p className="text-[13px] font-semibold text-[#0d0d1a] mb-1">Vercel Integration</p>
          <p className="text-[12px] text-[#9494a8] mb-4">Connect this project to Vercel and all env vars will be auto-injected into your deployments.</p>
          <button className="flex items-center gap-2 bg-[#0d0d1a] text-white text-[12px] font-semibold px-4 py-2 rounded-[6px] hover:bg-[#252535] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 19.5h20L12 2z"/></svg>
            Connect to Vercel
          </button>
        </div>
      </div>
    </div>
  );
}
