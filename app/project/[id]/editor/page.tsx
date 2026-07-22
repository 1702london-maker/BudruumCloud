"use client";
import { use, useState } from "react";

type QueryRow = Record<string, string | number | boolean | null>;

export default function SQLEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [sql, setSql] = useState('SELECT * FROM "user" LIMIT 10;');
  const [rows, setRows] = useState<QueryRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState<number | null>(null);

  async function run() {
    setRunning(true); setError(""); setRows([]); setColumns([]);
    const start = performance.now();
    try {
      const res = await fetch('/api/projects/' + id + '/query', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
      });
      const data = await res.json();
      setTime(Math.round(performance.now() - start));
      if (!res.ok) { setError(data.error || "Query failed."); }
      else {
        const r = data.rows || [];
        if (r.length > 0) { setColumns(Object.keys(r[0])); setRows(r); }
      }
    } catch { setError("Network error."); }
    finally { setRunning(false); }
  }

  return (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 180px)" }}>
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">SQL Editor</h1>
        <button onClick={run} disabled={running || !sql.trim()}
          className="bg-[#8BB8D8] text-white text-[12px] font-semibold px-5 py-2 rounded-[7px] hover:bg-[#6aa0c4] transition-colors disabled:opacity-60 flex items-center gap-2">
          {running ? "Running..." : "Run"}
        </button>
      </div>
      <div className="bg-white border border-[#e8e8f0] rounded-[12px] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#e8e8f0] flex items-center gap-2">
          <span className="text-[10.5px] font-semibold text-[#9494a8] uppercase tracking-wide">Query</span>
          <span className="text-[10px] text-[#c0c0d0]">Ctrl+Enter to run</span>
        </div>
        <textarea value={sql} onChange={e => setSql(e.target.value)}
          onKeyDown={e => { if (e.ctrlKey && e.key === "Enter") run(); }}
          rows={6} spellCheck={false}
          className="w-full px-4 py-3 text-[12.5px] font-mono text-[#0d0d1a] bg-[#fafafa] resize-none focus:outline-none" />
      </div>
      <div className="flex-1 bg-white border border-[#e8e8f0] rounded-[12px] overflow-hidden flex flex-col">
        <div className="px-4 py-2.5 border-b border-[#e8e8f0] flex items-center gap-3">
          <span className="text-[11.5px] font-semibold text-[#0d0d1a]">Results</span>
          {time !== null && <span className="text-[11px] text-[#9494a8]">{rows.length} rows - {time}ms</span>}
        </div>
        {error ? (
          <div className="px-4 py-3 text-[12px] font-mono text-red-600 bg-red-50">{error}</div>
        ) : rows.length === 0 ? (
          <div className="flex items-center justify-center flex-1 text-[12.5px] text-[#9494a8]">
            {running ? "Running..." : "Run a query to see results."}
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
                      <td key={col} className="px-4 py-2 font-mono text-[#0d0d1a] whitespace-nowrap max-w-[240px] truncate">
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
  );
}
