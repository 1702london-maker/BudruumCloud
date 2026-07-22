"use client";

import { use, useCallback, useEffect, useState } from "react";
import { Lock, RefreshCw, Save } from "lucide-react";

type Policy = { tableName: string; readMode: string; writeMode: string };
type TableMeta = { name: string };

export default function PoliciesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tables, setTables] = useState<TableMeta[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [saving, setSaving] = useState("");

  const load = useCallback(() => {
    fetch(`/api/projects/${id}/database/schema`)
      .then((response) => response.json())
      .then((data) => {
        setTables(data.schema || []);
        setPolicies(data.policies || []);
      });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  function policyFor(table: string) {
    return policies.find((policy) => policy.tableName === table) || { tableName: table, readMode: "public", writeMode: "public" };
  }

  async function save(tableName: string, next: Partial<Policy>) {
    const current = policyFor(tableName);
    setSaving(tableName);
    await fetch(`/api/projects/${id}/database/policies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...current, ...next, tableName }),
    });
    setSaving("");
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Policies</h1>
          <p className="text-[13px] text-[#6b6b80] mt-1">Control whether anon keys can read or write each table. Service keys always bypass policies.</p>
        </div>
        <button onClick={load} className="h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold inline-flex items-center gap-2">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <section className="border border-[#e8e8f0] rounded-[8px] bg-white overflow-hidden">
        <div className="grid grid-cols-[1fr_180px_180px_110px] px-5 py-3 border-b border-[#e8e8f0] text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8]">
          <span>Table</span>
          <span>Anon read</span>
          <span>Anon write</span>
          <span></span>
        </div>
        {tables.map((table) => {
          const policy = policyFor(table.name);
          return (
            <div key={table.name} className="grid grid-cols-[1fr_180px_180px_110px] items-center px-5 py-3 border-b border-[#f0f0f6] last:border-b-0">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[#5890B8]" />
                <span className="font-mono text-[13px] font-bold">{table.name}</span>
              </div>
              <select value={policy.readMode} onChange={(event) => save(table.name, { readMode: event.target.value })} className="h-8 w-32 rounded-[7px] border border-[#dfe1ea] px-2 text-[12px]">
                <option value="public">Allowed</option>
                <option value="service">Service only</option>
              </select>
              <select value={policy.writeMode} onChange={(event) => save(table.name, { writeMode: event.target.value })} className="h-8 w-32 rounded-[7px] border border-[#dfe1ea] px-2 text-[12px]">
                <option value="public">Allowed</option>
                <option value="service">Service only</option>
              </select>
              <span className="text-[11px] text-[#9494a8] inline-flex items-center gap-1">
                <Save size={12} /> {saving === table.name ? "Saving" : "Saved"}
              </span>
            </div>
          );
        })}
        {tables.length === 0 && (
          <div className="py-16 text-center text-[12.5px] text-[#9494a8]">No tables found. Create tables in SQL Editor first.</div>
        )}
      </section>
    </div>
  );
}
