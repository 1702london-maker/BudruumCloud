"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Project = { id: string; name: string; slug: string; region: string; plan: string; createdAt: string; };
type ApiKey = { id: string; name: string; key: string; type: string; createdAt: string; };

export default function ProjectOverviewPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/projects/' + params.id)
      .then(r => r.json())
      .then(d => { setProject(d.project); setKeys(d.apiKeys || []); });
  }, [params.id]);

  function copy(val: string, label: string) {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  const anonKey = keys.find(k => k.type === "anon");
  const serviceKey = keys.find(k => k.type === "service");

  if (!project) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold tracking-[-0.025em] text-[#0d0d1a]">{project.name}</h1>
          <p className="text-[12.5px] text-[#9494a8] mt-0.5">{project.region}</p>
        </div>
        <span className="text-[11px] font-semibold text-[#8BB8D8] bg-[#EEF5FB] border border-[#C5DCF0] px-3 py-1 rounded-full capitalize">{project.plan}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Database", detail: "Postgres - Neon - " + project.region },
          { label: "Storage", detail: "Cloudflare R2 - Western Europe" },
          { label: "Realtime", detail: "Ably - WebSocket ready" },
        ].map(({ label, detail }) => (
          <div key={label} className="bg-white border border-[#e8e8f0] rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-semibold text-[#0d0d1a]">{label}</span>
              <span className="ml-auto flex items-center gap-1 text-[10.5px] font-semibold text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Active
              </span>
            </div>
            <p className="text-[11.5px] text-[#9494a8]">{detail}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-[#e8e8f0] rounded-[14px] p-5">
        <h2 className="text-[13px] font-bold text-[#0d0d1a] mb-4">API Keys</h2>
        <div className="space-y-3">
          {[
            { label: "Anon key", value: anonKey?.key || "Generating..." },
            { label: "Service key", value: serviceKey?.key || "Generating..." },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-semibold text-[#9494a8] uppercase tracking-wide mb-1">{label}</p>
              <div className="flex items-center gap-2 bg-[#fafafa] border border-[#e8e8f0] rounded-[8px] px-3 py-2">
                <code className="text-[11.5px] text-[#0d0d1a] font-mono flex-1 truncate">{value}</code>
                <button onClick={() => copy(value, label)} className="text-[11px] font-semibold text-[#8BB8D8] hover:text-[#5890B8] flex-shrink-0">
                  {copied === label ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link href={'/project/' + project.id + '/editor'} className="bg-white border border-[#e8e8f0] rounded-[12px] p-4 hover:border-[#C5DCF0] transition-all flex items-center gap-3">
          <div className="w-9 h-9 rounded-[9px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8]">SQL</div>
          <div><p className="text-[13px] font-semibold text-[#0d0d1a]">SQL Editor</p><p className="text-[11.5px] text-[#9494a8]">Run queries</p></div>
        </Link>
        <Link href={'/project/' + project.id + '/api-keys'} className="bg-white border border-[#e8e8f0] rounded-[12px] p-4 hover:border-[#C5DCF0] transition-all flex items-center gap-3">
          <div className="w-9 h-9 rounded-[9px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8]">KEY</div>
          <div><p className="text-[13px] font-semibold text-[#0d0d1a]">API Keys</p><p className="text-[11.5px] text-[#9494a8]">Manage credentials</p></div>
        </Link>
      </div>
    </div>
  );
}