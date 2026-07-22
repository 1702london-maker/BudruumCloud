"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Gauge, RefreshCw, Shield } from "lucide-react";

type HealthCheck = { name: string; status: string; detail: string };

function statusTone(status: string) {
  if (status === "ok" || status === "configured") return "text-green-700 bg-green-50 border-green-100";
  if (status === "dev-default") return "text-amber-700 bg-amber-50 border-amber-100";
  return "text-red-700 bg-red-50 border-red-100";
}

export default function AdvisorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => setChecks(data.checks || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  const errors = checks.filter((check) => check.status === "missing").length;
  const warnings = checks.filter((check) => check.status === "dev-default").length;

  return (
    <div className="grid grid-cols-[224px_1fr] gap-0 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-6">Advisors</h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Advisors</p>
        {[
          ["Security Advisor", `/project/${id}/advisors/security`],
          ["Performance Advisor", `/project/${id}/advisors/performance`],
          ["Query Performance", `/project/${id}/advisors/query-performance`],
        ].map(([item, href], index) => (
          <Link key={item} href={href} className={`flex items-center w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] ${index === 0 ? "bg-white font-bold text-[#0d0d1a]" : "text-[#6b6b80] hover:bg-white"}`}>{item}</Link>
        ))}
      </aside>

      <main className="min-w-0">
        <div className="h-14 border-b border-[#e8e8f0] flex items-center gap-4 px-6">
          <h2 className="text-[20px] font-bold">Security Advisor</h2>
          <button onClick={load} className="ml-auto h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-3 border-b border-[#e8e8f0]">
          {[
            { label: "Errors", value: errors, icon: AlertTriangle, color: "text-red-600" },
            { label: "Warnings", value: warnings, icon: Gauge, color: "text-amber-600" },
            { label: "Info", value: checks.length - errors - warnings, icon: CheckCircle2, color: "text-green-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="h-16 px-6 flex items-center gap-3 border-r border-[#e8e8f0] last:border-r-0">
              <Icon size={16} className={color} />
              <div>
                <p className="text-[12px] font-bold">{value} {label.toLowerCase()}</p>
                <p className="text-[11px] text-[#9494a8]">Current project checks</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6">
          <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden">
            <div className="grid grid-cols-[180px_1fr_160px] bg-[#fafafa] border-b border-[#e8e8f0] text-[11px] font-bold uppercase tracking-[0.12em] text-[#9494a8]">
              <div className="px-4 py-3">Issue type</div>
              <div className="px-4 py-3 border-l border-[#e8e8f0]">Description</div>
              <div className="px-4 py-3 border-l border-[#e8e8f0]">Status</div>
            </div>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-[12px] text-[#9494a8]">Running advisor checks...</div>
            ) : checks.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-[12px] text-[#9494a8]">No checks available.</div>
            ) : (
              checks.map((check) => (
                <div key={check.name} className="grid grid-cols-[180px_1fr_160px] border-b border-[#f0f0f6] last:border-b-0 text-[12.5px]">
                  <div className="px-4 py-3 font-semibold flex items-center gap-2"><Shield size={13} className="text-[#5890B8]" /> {check.name}</div>
                  <div className="px-4 py-3 border-l border-[#f0f0f6] text-[#6b6b80]">{check.detail}</div>
                  <div className="px-4 py-3 border-l border-[#f0f0f6]">
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${statusTone(check.status)}`}>{check.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
