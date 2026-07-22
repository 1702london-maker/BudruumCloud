"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, BarChart3, Clock, Database, Filter, Globe2, HardDrive, Shield, Zap } from "lucide-react";

type SummaryRow = { service: string; requests: number; latency: number; errors: number };

const SERVICES = [
  { key: "api", name: "API Gateway", icon: Globe2 },
  { key: "database", name: "Database", icon: Database },
  { key: "auth", name: "Auth", icon: Shield },
  { key: "storage", name: "Storage", icon: HardDrive },
  { key: "functions", name: "Edge Functions", icon: Zap },
  { key: "realtime", name: "Realtime", icon: Activity },
];

export default function ObservabilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [summary, setSummary] = useState<SummaryRow[]>([]);

  useEffect(() => {
    fetch(`/api/projects/${id}/logs?limit=1`)
      .then((response) => response.json())
      .then((data) => setSummary(data.summary || []))
      .catch(() => setSummary([]));
  }, [id]);

  const rows = useMemo(() => SERVICES.map((service) => {
    const data = summary.find((item) => item.service === service.key);
    return {
      ...service,
      requests: data?.requests || 0,
      latency: `${data?.latency || 0} ms`,
      errors: data?.errors || 0,
    };
  }), [summary]);

  const totalRequests = rows.reduce((sum, row) => sum + row.requests, 0);
  const totalErrors = rows.reduce((sum, row) => sum + row.errors, 0);
  const successRate = totalRequests ? (((totalRequests - totalErrors) / totalRequests) * 100).toFixed(1) : "0.0";
  const avgLatency = totalRequests ? Math.round(rows.reduce((sum, row) => sum + (parseInt(row.latency) * row.requests), 0) / totalRequests) : 0;

  return (
    <div className="grid grid-cols-[224px_1fr] gap-0 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-6">Observability</h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">General</p>
        {[
          ["API Gateway", `/project/${id}/observability/api-overview`],
          ["Query Performance", `/project/${id}/observability/query-performance`],
        ].map(([item, href], index) => (
          <Link key={item} href={href} className={`flex items-center w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] ${index === 0 ? "bg-white font-bold text-[#0d0d1a]" : "text-[#6b6b80] hover:bg-white"}`}>{item}</Link>
        ))}
        <div className="h-px bg-[#e8e8f0] my-4" />
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Product</p>
        {SERVICES.slice(1).map((item) => (
          <Link key={item.name} href={`/project/${id}/observability/${item.name === "Edge Functions" ? "functions" : item.name.toLowerCase()}`} className="flex items-center w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">{item.name}</Link>
        ))}
      </aside>

      <main className="min-w-0 p-6 space-y-5">
        <div className="flex items-center gap-3">
          <h2 className="text-[24px] font-bold tracking-[-0.02em]">API Gateway</h2>
          <button className="ml-auto h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2"><Clock size={13} /> Last 60 minutes</button>
          <button className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2"><Filter size={13} /> Add filter</button>
        </div>

        <section className="grid grid-cols-4 gap-4">
          {[
            { label: "Total requests", value: String(totalRequests) },
            { label: "Success rate", value: `${successRate}%` },
            { label: "Avg latency", value: `${avgLatency} ms` },
            { label: "Error rate", value: totalRequests ? `${((totalErrors / totalRequests) * 100).toFixed(1)}%` : "0.0%" },
          ].map((metric) => (
            <div key={metric.label} className="border border-[#e8e8f0] rounded-[8px] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8]">{metric.label}</p>
              <p className="text-[26px] font-bold mt-2">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="border border-[#e8e8f0] rounded-[8px] bg-white overflow-hidden">
          <div className="h-12 border-b border-[#e8e8f0] px-4 flex items-center justify-between">
            <h3 className="text-[14px] font-bold">Requests by service</h3>
            <BarChart3 size={16} className="text-[#9494a8]" />
          </div>
          <div className="divide-y divide-[#f0f0f6]">
            {rows.map(({ name, requests, latency, errors, icon: Icon }) => (
              <div key={name} className="grid grid-cols-[1fr_120px_120px_120px] items-center px-4 py-3 text-[12.5px]">
                <div className="flex items-center gap-2 font-semibold"><Icon size={15} className="text-[#5890B8]" /> {name}</div>
                <div className="text-[#6b6b80]">{requests} requests</div>
                <div className="text-[#6b6b80]">{latency}</div>
                <div className={errors ? "text-red-600" : "text-[#6b6b80]"}>{errors} errors</div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-dashed border-[#dfe1ea] rounded-[8px] min-h-[180px] flex flex-col items-center justify-center">
          <Globe2 size={28} className="text-[#8BB8D8] mb-3" />
          <h3 className="text-[15px] font-bold">Gateway events are being collected</h3>
          <p className="text-[12.5px] text-[#6b6b80] mt-1">Use your deployed app or the dashboard tools, then refresh Logs for raw events.</p>
        </section>
      </main>
    </div>
  );
}
