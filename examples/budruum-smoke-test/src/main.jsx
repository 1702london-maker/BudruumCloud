import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const config = {
  baseUrl: import.meta.env.VITE_BUDRUUM_URL || "https://budruumcloud.vercel.app",
  projectId: import.meta.env.VITE_BUDRUUM_PROJECT_ID || "",
  anonKey: import.meta.env.VITE_BUDRUUM_ANON_KEY || "",
};

function makeId() {
  return `prod_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("First real Budruum product");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const ready = Boolean(config.projectId && config.anonKey);
  const endpoint = useMemo(() => {
    if (!ready) return "";
    return `${config.baseUrl}/api/v1/projects/${config.projectId}/rest/products`;
  }, [ready]);

  const request = useCallback(async function request(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error || "Request failed");
    return data.data || [];
  }, []);

  const loadProducts = useCallback(async function loadProducts() {
    if (!ready) return;
    setStatus("loading");
    setError("");
    try {
      const rows = await request(`${endpoint}?select=*&limit=20`);
      setProducts(rows);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load products");
      setStatus("error");
    }
  }, [endpoint, ready, request]);

  async function createProduct(event) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    try {
      await request(endpoint, {
        method: "POST",
        body: JSON.stringify({ id: makeId(), name, status: "active" }),
      });
      setName("");
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create product");
      setStatus("error");
    }
  }

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">Budruum Cloud Smoke Test</p>
        <h1>Real app, real backend.</h1>
        <p className="intro">
          This app writes to and reads from a Budruum project through the public REST API.
        </p>

        {!ready && (
          <div className="notice">
            Add <code>VITE_BUDRUUM_PROJECT_ID</code> and <code>VITE_BUDRUUM_ANON_KEY</code> in Vercel to connect a real project.
          </div>
        )}

        <form onSubmit={createProduct} className="form">
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Product name" disabled={!ready || status === "saving"} />
          <button disabled={!ready || !name.trim() || status === "saving"}>
            {status === "saving" ? "Saving..." : "Create product"}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        <div className="toolbar">
          <span>{products.length} products</span>
          <button type="button" onClick={loadProducts} disabled={!ready || status === "loading"}>
            {status === "loading" ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="list">
          {products.map((product) => (
            <article key={product.id} className="row">
              <div>
                <strong>{product.name}</strong>
                <span>{product.id}</span>
              </div>
              <mark>{product.status}</mark>
            </article>
          ))}
          {ready && products.length === 0 && <div className="empty">No products yet. Create one above.</div>}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
