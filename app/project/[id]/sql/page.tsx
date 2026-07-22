"use client";
import { use, useState } from "react";
import { Play, Plus, Save } from "lucide-react";

type QueryRow = Record<string, string | number | boolean | null>;

const SNIPPETS = [
  { name: "List users", query: 'SELECT * FROM "user" ORDER BY "createdAt" DESC LIMIT 50;' },
  { name: "List projects", query: 'SELECT * FROM "project" ORDER BY "createdAt" DESC LIMIT 50;' },
  { name: "List API keys", query: 'SELECT id, name, type, "createdAt" FROM "api_key" LIMIT 50;' },
];

export default function SqlPage({ params }: { params: Promise<{ id: string }> }) {
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
      const res = await fetch("/api/projects/" + id + "/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
      });
      const data = await res.json();
      setTime(Math.round(performance.now() - start));
      if (!res.ok) setError(data.error || "Query failed.");
      else {
        const resultRows = data.rows || [];
        if (resultRows.length > 0) { setColumns(Object.keys(resultRows[0])); setRows(resultRows); }
      }
    } catch {
      setError("Network error.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="grid grid-cols-[248px_1fr] gap-0 -m-8 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-4">SQL Editor</h1>
        <button className="w-full h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold inline-flex items-center justify-center gap-2 mb-4">
          <Plus size={14} /> New query
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Templates</p>
        <div className="space-y-1">
          {SNIPPETS.map(snippet => (
            <button key={snippet.name} onClick={() => setSql(snippet.query)} className="w-full rounded-[7px] px-2.5 py-2 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">
              {snippet.name}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex flex-col min-w-0">
        <div className="h-12 border-b border-[#e8e8f0] flex items-center gap-2 px-4">
          <span className="text-[12px] text-[#6b6b80]">Autosave enabled</span>
          <select className="ml-auto h-8 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] bg-white"><option>Primary Database</option></select>
          <select className="h-8 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] bg-white"><option>Limit 100 rows</option></select>
          <button onClick={run} disabled={running || !sql.trim()} className="h-8 px-4 rounded-[7px] bg-[#8BB8D8] text-white text-[12px] font-bold inline-flex items-center gap-2 disabled:opacity-60">
            <Play size={13} /> {running ? "Running" : "Run"}
          </button>
        </div>
        <textarea value={sql} onChange={e => setSql(e.target.value)} onKeyDown={e => { if (e.ctrlKey && e.key === "Enter") run(); }} spellCheck={false}
          className="h-[300px] w-full border-b border-[#e8e8f0] px-6 py-4 font-mono text-[13px] leading-relaxed outline-none resize-none" />
        <div className="h-11 border-b border-[#e8e8f0] flex items-center gap-4 px-4">
          <span className="text-[12px] font-bold">Results</span>
          <span className="text-[12px] text-[#9494a8]">Chart</span>
          {time !== null && <span className="text-[12px] text-[#9494a8]">{rows.length} rows - {time}ms</span>}
          <button className="ml-auto text-[12px] text-[#6b6b80] inline-flex items-center gap-1"><Save size={13} /> Save query</button>
        </div>
        <div className="flex-1 overflow-auto">
          {error ? (
            <div className="m-4 rounded-[8px] border border-red-100 bg-red-50 p-3 text-[12px] font-mono text-red-600">{error}</div>
          ) : rows.length === 0 ? (
            <div className="h-full flex items-center justify-center text-[12.5px] text-[#9494a8]">{running ? "Running..." : "Click Run to execute your query."}</div>
          ) : (
            <table className="w-full text-[12px]">
              <thead className="sticky top-0 bg-[#fafafa] border-b border-[#e8e8f0]">
                <tr>{columns.map(col => <th key={col} className="text-left px-4 py-2 font-semibold text-[#9494a8] whitespace-nowrap border-r border-[#f0f0f6]">{col}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-[#f0f0f8] hover:bg-[#fafafa]">
                    {columns.map(col => <td key={col} className="px-4 py-2 font-mono whitespace-nowrap max-w-[240px] truncate border-r border-[#f8f8fc]">{row[col] === null ? "null" : String(row[col])}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
