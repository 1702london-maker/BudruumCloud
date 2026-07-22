import { Topbar } from "@/components/layout/topbar";
import { Plus, Key, Link } from "lucide-react";

const TABLES = [
  { name: "users", rows: "1,284", size: "3.2 MB", rls: true, cols: 8 },
  { name: "products", rows: "342", size: "980 KB", rls: true, cols: 12 },
  { name: "orders", rows: "5,841", size: "8.1 MB", rls: true, cols: 10 },
  { name: "categories", rows: "24", size: "12 KB", rls: false, cols: 5 },
  { name: "reviews", rows: "891", size: "1.4 MB", rls: true, cols: 7 },
  { name: "sessions", rows: "428", size: "640 KB", rls: true, cols: 6 },
];

export default function DatabasePage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Database" subtitle="Tables, foreign keys, indexes, and triggers" />
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Actions */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-3">
            {["Tables", "Foreign keys", "Indexes", "Triggers", "Extensions"].map((tab, i) => (
              <button key={tab} className={`text-[13px] font-medium pb-2 border-b-2 transition-colors ${
                i === 0 ? "text-[#4231d0] border-[#4231d0]" : "text-[#6b6b80] border-transparent hover:text-[#0d0d1a]"
              }`}>
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-[6px] hover:bg-[#3520b8] transition-colors">
            <Plus size={13} /> New table
          </button>
        </div>

        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
                {["Table name", "Rows", "Size", "Columns", "RLS", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLES.map((t) => (
                <tr key={t.name} className="border-b border-[#e8e8f0] last:border-0 hover:bg-[#f8f8fc] transition-colors group cursor-pointer">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#ede9ff] flex items-center justify-center">
                        <Key size={10} className="text-[#4231d0]" />
                      </div>
                      <span className="font-mono text-[13px] font-semibold text-[#0d0d1a]">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-[#6b6b80]">{t.rows}</td>
                  <td className="px-5 py-3 text-[13px] text-[#6b6b80]">{t.size}</td>
                  <td className="px-5 py-3 text-[13px] text-[#6b6b80]">{t.cols} cols</td>
                  <td className="px-5 py-3">
                    {t.rls ? (
                      <span className="text-[11px] font-semibold bg-[#f0fdf4] text-[#16a34a] px-2 py-0.5 rounded-full">Enabled</span>
                    ) : (
                      <span className="text-[11px] font-semibold bg-[#fef2f2] text-[#dc2626] px-2 py-0.5 rounded-full">Disabled</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[12px] text-[#4231d0] transition-all">
                      <Link size={12} /> Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
