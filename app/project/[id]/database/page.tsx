"use client";
import Link from "next/link";
import { use } from "react";
import { Copy, Database, GitBranch, KeyRound, Lock, Network, RotateCcw, Table2 } from "lucide-react";

const TABLES = [
  { name: "user", columns: ["id", "name", "email", "emailVerified", "createdAt"] },
  { name: "session", columns: ["id", "userId", "token", "expiresAt", "createdAt"] },
  { name: "account", columns: ["id", "userId", "providerId", "accountId"] },
  { name: "verification", columns: ["id", "identifier", "value", "expiresAt"] },
  { name: "project", columns: ["id", "ownerId", "name", "slug", "region", "plan"] },
  { name: "api_key", columns: ["id", "projectId", "name", "type", "createdAt"] },
];

export default function DatabasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="grid grid-cols-[224px_1fr] gap-0 -m-8 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-6">Database</h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Database Management</p>
        {["Schema Visualizer", "Tables", "Functions", "Triggers", "Indexes"].map((item, index) => (
          <button key={item} className={`w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] ${index === 0 ? "bg-white font-bold text-[#0d0d1a]" : "text-[#6b6b80] hover:bg-white"}`}>{item}</button>
        ))}
        <div className="h-px bg-[#e8e8f0] my-4" />
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Access Control</p>
        {["Policies", "Roles"].map((item) => (
          <button key={item} className="w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">{item}</button>
        ))}
        <div className="h-px bg-[#e8e8f0] my-4" />
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Platform</p>
        {["Replication", "Backups", "Migrations"].map((item) => (
          <button key={item} className="w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">{item}</button>
        ))}
      </aside>

      <main className="min-w-0">
        <div className="h-12 border-b border-[#e8e8f0] flex items-center gap-2 px-4">
          <select className="h-8 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] bg-white"><option>schema public</option></select>
          <input className="h-8 w-52 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px]" placeholder="Find table..." />
          <button className="ml-auto h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2"><Copy size={13} /> Copy as SQL</button>
          <button className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">Auto layout</button>
        </div>

        <div className="relative min-h-[calc(100vh-108px)] bg-[radial-gradient(#dfe1ea_1px,transparent_1px)] [background-size:18px_18px] overflow-hidden">
          <div className="absolute left-10 top-10 grid grid-cols-3 gap-5">
            {TABLES.map((table, index) => (
              <div key={table.name} className="w-[230px] rounded-[8px] bg-white border border-[#dfe1ea] shadow-sm" style={{ transform: `translateY(${index % 2 === 0 ? 0 : 34}px)` }}>
                <div className="h-9 border-b border-[#e8e8f0] px-3 flex items-center gap-2">
                  <Table2 size={13} className="text-[#5890B8]" />
                  <span className="text-[12px] font-bold font-mono">{table.name}</span>
                </div>
                <div className="py-1">
                  {table.columns.map((column, i) => (
                    <div key={column} className="h-7 px-3 flex items-center gap-2 text-[11px] border-b border-[#f8f8fc] last:border-0">
                      {i === 0 ? <KeyRound size={11} className="text-[#d97706]" /> : <span className="w-[11px] h-[11px] rounded-full border border-[#c8c8d6]" />}
                      <span className="font-mono text-[#0d0d1a]">{column}</span>
                      <span className="ml-auto text-[#9494a8]">{i === 0 ? "uuid" : "text"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-8 bottom-8 w-[300px] rounded-[8px] border border-[#e8e8f0] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-[#5890B8]" />
              <h2 className="text-[13px] font-bold">Database readiness</h2>
            </div>
            {[
              { icon: Network, label: "Schema visualizer", value: "Ready" },
              { icon: Lock, label: "Access policies", value: "Planned" },
              { icon: RotateCcw, label: "Backups", value: "Planned" },
              { icon: GitBranch, label: "Branching", value: "Planned" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-t border-[#f0f0f6] first:border-t-0">
                <span className="inline-flex items-center gap-2 text-[12px] text-[#6b6b80]"><Icon size={13} /> {label}</span>
                <span className="text-[10px] font-bold uppercase text-[#5890B8]">{value}</span>
              </div>
            ))}
            <Link href={`/project/${id}/table-editor`} className="mt-3 h-8 w-full rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold flex items-center justify-center">Open Table Editor</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
