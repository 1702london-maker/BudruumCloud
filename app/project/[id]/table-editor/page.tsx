"use client";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Edit3, Plus, RefreshCw, Save, Search, Table2, Trash2, X } from "lucide-react";

type TableRow = Record<string, string | number | boolean | null>;
type ColumnMeta = {
  column_name: string;
  data_type: string;
  is_nullable: "YES" | "NO";
  column_default: string | null;
};

function rowIdentity(row: TableRow) {
  if ("id" in row) return { id: row.id };
  const firstKey = Object.keys(row)[0];
  return firstKey ? { [firstKey]: row[firstKey] } : {};
}

function blankRow(columns: ColumnMeta[]) {
  const next: TableRow = {};
  columns.forEach((column) => {
    if (column.column_default && column.column_name !== "id") return;
    if (column.column_name === "created_at" || column.column_name === "updated_at") return;
    next[column.column_name] = column.column_name === "id" ? `row_${Date.now()}` : "";
  });
  return next;
}

export default function TableEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tables, setTables] = useState<string[]>([]);
  const [activeTable, setActiveTable] = useState("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<ColumnMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editorMode, setEditorMode] = useState<"create" | "edit" | null>(null);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    fetch("/api/projects/" + id + "/tables")
      .then((r) => r.json())
      .then((data) => {
        const nextTables = data.tables || [];
        setTables(nextTables);
        setActiveTable((current) => current || nextTables[0] || "");
      })
      .catch(() => {
        setTables([]);
        setActiveTable("");
      });
  }, [id]);

  const loadRows = useCallback(() => {
    if (!activeTable) return;
    setLoading(true);
    setError("");
    fetch(`/api/projects/${id}/tables/${activeTable}/rows?limit=100`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || "Unable to load rows");
        setColumns(data.columns || []);
        setRows(data.rows || []);
      })
      .catch((err: Error) => {
        setColumns([]);
        setRows([]);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [activeTable, id]);

  useEffect(() => {
    setEditorMode(null);
    setSelectedRow(null);
    setDraft("");
    loadRows();
  }, [loadRows]);

  const columnNames = useMemo(() => columns.map((column) => column.column_name), [columns]);

  function openCreate() {
    setError("");
    setEditorMode("create");
    setSelectedRow(null);
    setDraft(JSON.stringify(blankRow(columns), null, 2));
  }

  function openEdit(row: TableRow) {
    setError("");
    setEditorMode("edit");
    setSelectedRow(row);
    setDraft(JSON.stringify(row, null, 2));
  }

  async function saveDraft() {
    if (!activeTable || !editorMode) return;
    setSaving(true);
    setError("");
    try {
      const values = JSON.parse(draft) as TableRow;
      const response = await fetch(`/api/projects/${id}/tables/${activeTable}/rows`, {
        method: editorMode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editorMode === "create" ? values : { match: rowIdentity(selectedRow || {}), values }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");
      setEditorMode(null);
      setSelectedRow(null);
      setDraft("");
      loadRows();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRow(row: TableRow) {
    if (!activeTable) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${id}/tables/${activeTable}/rows`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match: rowIdentity(row) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed");
      loadRows();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-[248px_1fr] gap-0 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-4">Table Editor</h1>
        <select className="w-full h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] mb-2">
          <option>schema public</option>
        </select>
        <button className="w-full h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold inline-flex items-center justify-center gap-2 mb-4" onClick={() => location.href = `/project/${id}/sql`}>
          <Plus size={14} /> New table
        </button>
        <div className="h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 flex items-center gap-2 mb-3">
          <Search size={14} className="text-[#9494a8]" />
          <input className="min-w-0 flex-1 text-[12px] bg-transparent outline-none" placeholder="Search tables..." />
        </div>
        <div className="space-y-1">
          {tables.map(table => (
            <button key={table} onClick={() => setActiveTable(table)} className={`w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] inline-flex items-center gap-2 ${activeTable === table ? "bg-[#EEF5FB] text-[#0d0d1a] font-bold" : "text-[#6b6b80] hover:bg-white"}`}>
              <Table2 size={14} className="text-[#9494a8]" /> {table}
            </button>
          ))}
          {tables.length === 0 && (
            <p className="px-2.5 py-2 text-[12px] text-[#9494a8]">No project tables found.</p>
          )}
        </div>
      </aside>

      <main className="min-w-0 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[18px] font-bold font-mono">{activeTable || "No table selected"}</h2>
            <p className="text-[12px] text-[#6b6b80]">Browse and edit rows in your project database.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadRows} className="h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold inline-flex items-center gap-2">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={openCreate} disabled={!activeTable || columns.length === 0} className="h-9 rounded-[7px] bg-[#8BB8D8] text-white px-3 text-[12px] font-bold inline-flex items-center gap-2 disabled:opacity-50">
              <Plus size={14} /> Insert row
            </button>
          </div>
        </div>

        {error && <div className="mb-3 rounded-[7px] border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">{error}</div>}

        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white" style={{ height: "calc(100vh - 185px)" }}>
          {loading ? (
            <div className="h-full flex items-center justify-center text-[12px] text-[#9494a8]">Loading table...</div>
          ) : columnNames.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <Table2 size={24} className="text-[#8BB8D8]" />
              <p className="text-[13px] font-bold">{activeTable ? "No columns found" : "No rows yet"}</p>
              <p className="text-[12px] text-[#9494a8]">{activeTable ? "Create columns in SQL Editor, then refresh." : "Create a table from SQL Editor to begin."}</p>
            </div>
          ) : (
            <div className="overflow-auto h-full">
              <table className="w-full text-[12px]">
                <thead className="sticky top-0 bg-[#fafafa] border-b border-[#e8e8f0]">
                  <tr>
                    <th className="w-[86px] px-3 py-2 border-r border-[#f0f0f6]"></th>
                    {columnNames.map(col => <th key={col} className="text-left px-4 py-2 font-semibold text-[#9494a8] whitespace-nowrap border-r border-[#f0f0f6]">{col}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#f0f0f8] hover:bg-[#fafafa]">
                      <td className="px-3 py-2 border-r border-[#f8f8fc] whitespace-nowrap">
                        <button title="Edit row" onClick={() => openEdit(row)} className="h-7 w-7 inline-flex items-center justify-center rounded-[6px] hover:bg-[#EEF5FB]">
                          <Edit3 size={14} />
                        </button>
                        <button title="Delete row" onClick={() => deleteRow(row)} disabled={saving} className="h-7 w-7 inline-flex items-center justify-center rounded-[6px] hover:bg-red-50 text-red-600 disabled:opacity-50">
                          <Trash2 size={14} />
                        </button>
                      </td>
                      {columnNames.map(col => (
                        <td key={col} className="px-4 py-2 text-[#0d0d1a] font-mono whitespace-nowrap max-w-[240px] truncate border-r border-[#f8f8fc]">
                          {row[col] === null ? <span className="text-[#c0c0d0]">null</span> : String(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={columnNames.length + 1} className="h-24 text-center text-[#9494a8]">No rows in this table yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {editorMode && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-6 z-50">
          <div className="w-full max-w-2xl rounded-[8px] bg-white border border-[#e8e8f0] shadow-xl">
            <div className="h-14 px-5 border-b border-[#e8e8f0] flex items-center justify-between">
              <div>
                <p className="text-[14px] font-bold">{editorMode === "create" ? "Insert row" : "Edit row"}</p>
                <p className="text-[11px] text-[#9494a8] font-mono">{activeTable}</p>
              </div>
              <button onClick={() => setEditorMode(null)} className="h-8 w-8 rounded-[6px] inline-flex items-center justify-center hover:bg-[#f6f6fb]">
                <X size={16} />
              </button>
            </div>
            <div className="p-5">
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} spellCheck={false} className="h-[360px] w-full resize-none rounded-[7px] border border-[#dfe1ea] bg-[#fbfbfd] p-4 font-mono text-[12px] outline-none focus:border-[#8BB8D8]" />
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => setEditorMode(null)} className="h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold">Cancel</button>
                <button onClick={saveDraft} disabled={saving} className="h-9 rounded-[7px] bg-[#8BB8D8] text-white px-3 text-[12px] font-bold inline-flex items-center gap-2 disabled:opacity-60">
                  <Save size={14} /> {saving ? "Saving..." : "Save row"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
