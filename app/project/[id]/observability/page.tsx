"use client";
import { use } from "react";
import Link from "next/link";
import { Activity, BarChart3, Clock, Database, Filter, Globe2, HardDrive, Shield, Zap } from "lucide-react";

const SERVICE_ROWS = [
  { name: "API Gateway", requests: 0, latency: "0 ms", errors: 0, icon: Globe2 },
  { name: "Database", requests: 0, latency: "0 ms", errors: 0, icon: Database },
  { name: "Auth", requests: 0, latency: "0 ms", errors: 0, icon: Shield },
  { name: "Storage", requests: 0, latency: "0 ms", errors: 0, icon: HardDrive },
  { name: "Edge Functions", requests: 0, latency: "0 ms", errors: 0, icon: Zap },
  { name: "Realtime", requests: 0, latency: "0 ms", errors: 0, icon: Activity },
];

export default function ObservabilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

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
        {SERVICE_ROWS.slice(1).map((item) => (
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
            { label: "Total requests", value: "0" },
            { label: "Success rate", value: "0.0%" },
            { label: "P95 latency", value: "0 ms" },
            { label: "Error rate", value: "0.0%" },
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
            {SERVICE_ROWS.map(({ name, requests, latency, errors, icon: Icon }) => (
              <div key={name} className="grid grid-cols-[1fr_120px_120px_120px] items-center px-4 py-3 text-[12.5px]">
                <div className="flex items-center gap-2 font-semibold"><Icon size={15} className="text-[#5890B8]" /> {name}</div>
                <div className="text-[#6b6b80]">{requests} requests</div>
                <div className="text-[#6b6b80]">{latency}</div>
                <div className={errors ? "text-red-600" : "text-[#6b6b80]"}>{errors} errors</div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-dashed border-[#dfe1ea] rounded-[8px] min-h-[230px] flex flex-col items-center justify-center">
          <Globe2 size={28} className="text-[#8BB8D8] mb-3" />
          <h3 className="text-[15px] font-bold">Traffic map will appear here</h3>
          <p className="text-[12.5px] text-[#6b6b80] mt-1">Live request analytics will populate after Budruum starts collecting gateway events.</p>
        </section>
      </main>
    </div>
  );
}
