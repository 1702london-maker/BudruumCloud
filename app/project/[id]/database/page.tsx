"use client";

import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { Copy, Database, KeyRound, Lock, Network, RefreshCw, Table2 } from "lucide-react";

type ColumnMeta = { column_name: string; data_type: string; is_nullable: string };
type TableMeta = { name: string; columns: ColumnMeta[] };
type Policy = { tableName: string; readMode: string; writeMode: string };

export default function DatabasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [schema, setSchema] = useState<TableMeta[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);

  const load = useCallback(() => {
    fetch(`/api/projects/${id}/database/schema`)
      .then((response) => response.json())
      .then((data) => {
        setSchema(data.schema || []);
        setPolicies(data.policies || []);
      });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  function policyFor(table: string) {
    return policies.find((policy) => policy.tableName === table);
  }

  return (
    <div className="grid grid-cols-[224px_1fr] gap-0 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-6">Database</h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Database Management</p>
        {[
          ["Schema Visualizer", `/project/${id}/database`],
          ["Tables", `/project/${id}/table-editor`],
          ["Functions", `/project/${id}/database/functions`],
          ["Triggers", `/project/${id}/database/triggers`],
          ["Indexes", `/project/${id}/database/indexes`],
        ].map(([item, href], index) => (
          <Link key={item} href={href} className={`flex items-center w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] ${index === 0 ? "bg-white font-bold text-[#0d0d1a]" : "text-[#6b6b80] hover:bg-white"}`}>{item}</Link>
        ))}
        <div className="h-px bg-[#e8e8f0] my-4" />
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Access Control</p>
        <Link href={`/project/${id}/database/policies`} className="flex items-center w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">Policies</Link>
        <Link href={`/project/${id}/database/roles`} className="flex items-center w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">Roles</Link>
      </aside>

      <main className="min-w-0">
        <div className="h-12 border-b border-[#e8e8f0] flex items-center gap-2 px-4">
          <select className="h-8 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] bg-white"><option>schema public</option></select>
          <button onClick={load} className="ml-auto h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2"><RefreshCw size={13} /> Refresh</button>
          <button onClick={() => navigator.clipboard.writeText(schema.map((table) => table.name).join("\n"))} className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2"><Copy size={13} /> Copy table list</button>
        </div>

        <div className="relative min-h-[calc(100vh-108px)] bg-[radial-gradient(#dfe1ea_1px,transparent_1px)] [background-size:18px_18px] overflow-auto p-10">
          <div className="grid grid-cols-3 gap-5">
            {schema.map((table, index) => {
              const policy = policyFor(table.name);
              return (
                <div key={table.name} className="w-[260px] rounded-[8px] bg-white border border-[#dfe1ea] shadow-sm" style={{ transform: `translateY(${index % 2 === 0 ? 0 : 34}px)` }}>
                  <div className="h-9 border-b border-[#e8e8f0] px-3 flex items-center gap-2">
                    <Table2 size={13} className="text-[#5890B8]" />
                    <span className="text-[12px] font-bold font-mono">{table.name}</span>
                    <span className="ml-auto text-[10px] font-bold text-[#5890B8]">{policy?.readMode || "public"}</span>
                  </div>
                  <div className="py-1">
                    {table.columns.map((column, i) => (
                      <div key={column.column_name} className="h-7 px-3 flex items-center gap-2 text-[11px] border-b border-[#f8f8fc] last:border-0">
                        {i === 0 ? <KeyRound size={11} className="text-[#d97706]" /> : <span className="w-[11px] h-[11px] rounded-full border border-[#c8c8d6]" />}
                        <span className="font-mono text-[#0d0d1a]">{column.column_name}</span>
                        <span className="ml-auto text-[#9494a8]">{column.data_type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed right-8 bottom-8 w-[300px] rounded-[8px] border border-[#e8e8f0] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-[#5890B8]" />
              <h2 className="text-[13px] font-bold">Database readiness</h2>
            </div>
            {[
              { icon: Network, label: "Schema visualizer", value: "Live" },
              { icon: Lock, label: "Access policies", value: "Live" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-t border-[#f0f0f6] first:border-t-0">
                <span className="inline-flex items-center gap-2 text-[12px] text-[#6b6b80]"><Icon size={13} /> {label}</span>
                <span className="text-[10px] font-bold uppercase text-[#5890B8]">{value}</span>
              </div>
            ))}
            <Link href={`/project/${id}/database/policies`} className="mt-3 h-8 w-full rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold flex items-center justify-center">Open Policies</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
