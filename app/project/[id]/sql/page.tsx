"use client";
import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Play, Plus, Save, Clock } from "lucide-react";

const SNIPPETS = [
  { name: "Get all users", query: "SELECT * FROM users ORDER BY created_at DESC LIMIT 50;" },
  { name: "Active orders", query: "SELECT * FROM orders WHERE status = 'active';" },
  { name: "Top products", query: "SELECT p.name, COUNT(o.id) as orders\nFROM products p\nJOIN order_items o ON o.product_id = p.id\nGROUP BY p.name\nORDER BY orders DESC\nLIMIT 10;" },
];

const RESULT_COLS = ["id", "email", "full_name", "role", "created_at"];
const RESULT_ROWS = [
  { id: "1", email: "alice@example.com", full_name: "Alice Martins", role: "admin", created_at: "2026-07-20" },
  { id: "2", email: "bob@example.com", full_name: "Bob Johnson", role: "user", created_at: "2026-07-19" },
  { id: "3", email: "carol@example.com", full_name: "Carol Smith", role: "user", created_at: "2026-07-18" },
];

export default function SqlPage() {
  const [query, setQuery] = useState("SELECT * FROM users\nORDER BY created_at DESC\nLIMIT 50;");
  const [ran, setRan] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <Topbar title="SQL Editor" subtitle="Run queries against your database" />
      <div className="flex flex-1 overflow-hidden">
        {/* Snippets sidebar */}
        <div className="w-[192px] border-r border-[#e8e8f0] bg-[#f8f8fc] flex flex-col shrink-0">
          <div className="px-3 pt-3 pb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Saved</p>
            <button className="text-[#9494a8] hover:text-[#4231d0] transition-colors">
              <Plus size={13} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            {SNIPPETS.map((s) => (
              <button
                key={s.name}
                onClick={() => setQuery(s.query)}
                className="w-full text-left px-2.5 py-2 rounded-[5px] text-[12px] font-medium text-[#6b6b80] hover:bg-[#eeeeef] hover:text-[#0d0d1a] transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Clock size={11} className="shrink-0 text-[#9494a8]" />
                  <span className="truncate">{s.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor + results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Query editor */}
          <div className="relative border-b border-[#e8e8f0]" style={{ height: "220px" }}>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-full px-5 py-4 font-mono text-[13px] text-[#0d0d1a] bg-white resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#e8e8f0] rounded-[5px] text-[12px] font-medium text-[#6b6b80] hover:border-[#d0d0e0] hover:text-[#0d0d1a] bg-white transition-colors">
                <Save size={12} /> Save
              </button>
              <button
                onClick={() => setRan(true)}
                className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-[5px] hover:bg-[#3520b8] transition-colors"
              >
                <Play size={12} /> Run
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-auto">
            {ran && (
              <>
                <div className="flex items-center gap-3 px-5 py-2.5 border-b border-[#e8e8f0] bg-[#f8f8fc]">
                  <span className="text-[12px] font-semibold text-[#16a34a]">✓ Query executed</span>
                  <span className="text-[12px] text-[#9494a8]">3 rows · 2ms</span>
                </div>
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-white border-b border-[#e8e8f0]">
                      {RESULT_COLS.map((col) => (
                        <th key={col} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8] border-r border-[#e8e8f0]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RESULT_ROWS.map((row) => (
                      <tr key={row.id} className="border-b border-[#e8e8f0] hover:bg-[#f8f8fc] transition-colors">
                        {RESULT_COLS.map((col) => (
                          <td key={col} className="px-5 py-2.5 font-mono text-[12px] text-[#0d0d1a] border-r border-[#e8e8f0] whitespace-nowrap">
                            {(row as Record<string,string>)[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
