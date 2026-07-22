"use client";
import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Plus, Filter, Search, ChevronDown, MoreHorizontal, RefreshCw } from "lucide-react";

const TABLES = ["users", "products", "orders", "categories", "reviews", "sessions"];

const COLUMNS = ["id", "created_at", "email", "full_name", "role", "status"];
const ROWS = [
  { id: "1", created_at: "2026-07-20 09:14", email: "alice@example.com", full_name: "Alice Martins", role: "admin", status: "active" },
  { id: "2", created_at: "2026-07-19 14:22", email: "bob@example.com", full_name: "Bob Johnson", role: "user", status: "active" },
  { id: "3", created_at: "2026-07-18 11:03", email: "carol@example.com", full_name: "Carol Smith", role: "user", status: "inactive" },
  { id: "4", created_at: "2026-07-17 08:55", email: "dan@example.com", full_name: "Dan Williams", role: "editor", status: "active" },
  { id: "5", created_at: "2026-07-16 16:41", email: "emma@example.com", full_name: "Emma Davis", role: "user", status: "active" },
  { id: "6", created_at: "2026-07-15 12:30", email: "frank@example.com", full_name: "Frank Brown", role: "user", status: "inactive" },
  { id: "7", created_at: "2026-07-14 10:18", email: "grace@example.com", full_name: "Grace Wilson", role: "admin", status: "active" },
];

export default function EditorPage() {
  const [activeTable, setActiveTable] = useState("users");

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Table Editor" subtitle="View and edit your database records" />
      <div className="flex flex-1 overflow-hidden">
        {/* Table list sidebar */}
        <div className="w-[192px] border-r border-[#e8e8f0] bg-[#f8f8fc] flex flex-col shrink-0">
          <div className="px-3 pt-3 pb-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9494a8] px-1 mb-2">Tables</p>
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            {TABLES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTable(t)}
                className={`w-full text-left px-2.5 py-1.5 rounded-[5px] text-[13px] font-medium transition-colors ${
                  activeTable === t
                    ? "bg-[#ede9ff] text-[#4231d0]"
                    : "text-[#6b6b80] hover:bg-[#eeeeef] hover:text-[#0d0d1a]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-[#e8e8f0]">
            <button className="flex items-center gap-1.5 w-full px-2.5 py-1.5 rounded-[5px] text-[12px] font-medium text-[#6b6b80] hover:bg-[#eeeeef] hover:text-[#0d0d1a] transition-colors">
              <Plus size={13} /> New table
            </button>
          </div>
        </div>

        {/* Table content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e8e8f0] bg-white">
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#e8e8f0] rounded-[5px] bg-white text-[12px] text-[#9494a8] w-56">
                <Search size={12} />
                <span>Filter rows...</span>
              </div>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#e8e8f0] rounded-[5px] bg-white text-[12px] text-[#6b6b80] hover:border-[#d0d0e0] hover:text-[#0d0d1a] transition-colors">
                <Filter size={12} /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#e8e8f0] rounded-[5px] bg-white text-[12px] text-[#6b6b80] hover:border-[#d0d0e0] hover:text-[#0d0d1a] transition-colors">
                <ChevronDown size={12} /> Sort
              </button>
            </div>
            <button className="p-1.5 rounded-[5px] text-[#9494a8] hover:bg-[#f3f3f8] hover:text-[#0d0d1a] transition-colors">
              <RefreshCw size={13} />
            </button>
            <button className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-[5px] hover:bg-[#3520b8] transition-colors">
              <Plus size={13} /> Insert row
            </button>
          </div>

          {/* Data table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
                  <th className="w-10 px-3 py-2.5 border-r border-[#e8e8f0]">
                    <input type="checkbox" className="rounded" />
                  </th>
                  {COLUMNS.map((col) => (
                    <th key={col} className="text-left px-4 py-2.5 font-semibold text-[11px] uppercase tracking-wider text-[#9494a8] border-r border-[#e8e8f0] whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.id} className={`border-b border-[#e8e8f0] hover:bg-[#f8f8fc] transition-colors group ${i % 2 === 0 ? "bg-white" : "bg-white"}`}>
                    <td className="px-3 py-2.5 border-r border-[#e8e8f0]">
                      <input type="checkbox" className="rounded opacity-0 group-hover:opacity-100" />
                    </td>
                    {COLUMNS.map((col) => (
                      <td key={col} className="px-4 py-2.5 border-r border-[#e8e8f0] font-mono text-[12px] text-[#0d0d1a] whitespace-nowrap">
                        {col === "status" ? (
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            (row as Record<string,string>)[col] === "active"
                              ? "bg-[#f0fdf4] text-[#16a34a]"
                              : "bg-[#f3f3f8] text-[#9494a8]"
                          }`}>
                            {(row as Record<string,string>)[col]}
                          </span>
                        ) : (
                          (row as Record<string,string>)[col]
                        )}
                      </td>
                    ))}
                    <td className="px-2 py-2.5">
                      <button className="p-1 rounded text-[#9494a8] hover:text-[#0d0d1a] opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#e8e8f0] bg-[#f8f8fc]">
            <p className="text-[12px] text-[#9494a8]">Showing {ROWS.length} of 1,284 rows</p>
            <div className="flex items-center gap-2">
              <button className="text-[12px] text-[#6b6b80] px-2.5 py-1 border border-[#e8e8f0] rounded-[4px] hover:border-[#d0d0e0] bg-white transition-colors">Previous</button>
              <button className="text-[12px] text-[#6b6b80] px-2.5 py-1 border border-[#e8e8f0] rounded-[4px] hover:border-[#d0d0e0] bg-white transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
