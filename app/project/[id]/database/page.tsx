"use client";
import { useEffect, useState } from "react";

type TableRow = Record<string, string | number | boolean | null>;
const TABLES = ["user", "session", "account", "verification", "project", "api_key"];

export default function DatabasePage({ params }: { params: { id: string } }) {
  const [activeTable, setActiveTable] = useState("user");
  const [rows, setRows] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/projects/' + params.id + '/query', {
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
  }, [activeTable, params.id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">Table Editor</h1>
        <span className="text-[11.5px] text-[#9494a8]">Postgres - Neon - eu-west-2</span>
      </div>
      <div className="flex gap-4" style={{ height: "calc(100vh - 220px)", minHeight: "400px" }}>
        <div className="w-44 flex-shrink-0 bg-white border border-[#e8e8f0] rounded-[12px] p-2 overflow-y-auto">
          <p className="text-[10px] font-bold text-[#9494a8] uppercase tracking-wide px-2 py-1.5">Tables</p>
          {TABLES.map(t => (
            <button key={t} onClick={() => setActiveTable(t)}
              className={"w-full text-left px-2.5 py-1.5 rounded-[7px] text-[12.5px] transition-colors " + (activeTable === t ? "bg-[#EEF5FB] text-[#5890B8] font-semibold" : "text-[#6b6b80] hover:bg-[#fafafa]")}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white border border-[#e8e8f0] rounded-[12px] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#e8e8f0] flex items-center justify-between">
            <span className="text-[12.5px] font-semibold text-[#0d0d1a] font-mono">{activeTable}</span>
            <span className="text-[11.5px] text-[#9494a8]">{rows.length} rows</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : columns.length === 0 ? (
            <div className="flex items-center justify-center flex-1 flex-col gap-2">
              <p className="text-[13px] font-semibold text-[#0d0d1a]">No rows yet</p>
              <p className="text-[12px] text-[#9494a8]">This table is empty.</p>
            </div>
          ) : (
            <div className="overflow-auto flex-1">
              <table className="w-full text-[12px]">
                <thead className="sticky top-0 bg-[#fafafa] border-b border-[#e8e8f0]">
                  <tr>{columns.map(col => <th key={col} className="text-left px-4 py-2 font-semibold text-[#9494a8] whitespace-nowrap">{col}</th>)}</tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#f0f0f8] hover:bg-[#fafafa]">
                      {columns.map(col => (
                        <td key={col} className="px-4 py-2 text-[#0d0d1a] font-mono whitespace-nowrap max-w-[200px] truncate">
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
      </div>
    </div>
  );
}