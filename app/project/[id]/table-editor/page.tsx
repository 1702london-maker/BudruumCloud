"use client";
import { use, useEffect, useState } from "react";
import { Plus, Search, Table2 } from "lucide-react";

type TableRow = Record<string, string | number | boolean | null>;
const TABLES = ["user", "session", "account", "verification", "project", "api_key"];

export default function TableEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTable, setActiveTable] = useState("user");
  const [rows, setRows] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/projects/" + id + "/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sql: 'SELECT * FROM "' + activeTable + '" LIMIT 50' }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.rows?.length) { setColumns(Object.keys(d.rows[0])); setRows(d.rows); }
        else { setColumns([]); setRows([]); }
      })
      .catch(() => { setColumns([]); setRows([]); })
      .finally(() => setLoading(false));
  }, [activeTable, id]);

  return (
    <div className="grid grid-cols-[248px_1fr] gap-0 -m-8 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-4">Table Editor</h1>
        <select className="w-full h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] mb-2">
          <option>schema public</option>
        </select>
        <button className="w-full h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold inline-flex items-center justify-center gap-2 mb-4">
          <Plus size={14} /> New table
        </button>
        <div className="h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 flex items-center gap-2 mb-3">
          <Search size={14} className="text-[#9494a8]" />
          <input className="min-w-0 flex-1 text-[12px] bg-transparent outline-none" placeholder="Search tables..." />
        </div>
        <div className="space-y-1">
          {TABLES.map(table => (
            <button key={table} onClick={() => setActiveTable(table)} className={`w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] inline-flex items-center gap-2 ${activeTable === table ? "bg-[#EEF5FB] text-[#0d0d1a] font-bold" : "text-[#6b6b80] hover:bg-white"}`}>
              <Table2 size={14} className="text-[#9494a8]" /> {table}
            </button>
          ))}
        </div>
      </aside>

      <main className="min-w-0 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[18px] font-bold font-mono">{activeTable}</h2>
            <p className="text-[12px] text-[#6b6b80]">Browse rows from your project database.</p>
          </div>
          <span className="text-[11px] text-[#9494a8]">{rows.length} rows</span>
        </div>
        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white" style={{ height: "calc(100vh - 185px)" }}>
          {loading ? (
            <div className="h-full flex items-center justify-center text-[12px] text-[#9494a8]">Loading table...</div>
          ) : columns.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <Table2 size={24} className="text-[#8BB8D8]" />
              <p className="text-[13px] font-bold">No rows yet</p>
              <p className="text-[12px] text-[#9494a8]">This table is empty.</p>
            </div>
          ) : (
            <div className="overflow-auto h-full">
              <table className="w-full text-[12px]">
                <thead className="sticky top-0 bg-[#fafafa] border-b border-[#e8e8f0]">
                  <tr>{columns.map(col => <th key={col} className="text-left px-4 py-2 font-semibold text-[#9494a8] whitespace-nowrap border-r border-[#f0f0f6]">{col}</th>)}</tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#f0f0f8] hover:bg-[#fafafa]">
                      {columns.map(col => (
                        <td key={col} className="px-4 py-2 text-[#0d0d1a] font-mono whitespace-nowrap max-w-[240px] truncate border-r border-[#f8f8fc]">
                          {row[col] === null ? <span className="text-[#c0c0d0]">null</span> : String(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
