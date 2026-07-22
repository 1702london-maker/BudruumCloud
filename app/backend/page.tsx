type HealthCheck = {
  name: string;
  status: string;
  detail: string;
};

async function getHealth() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
  return response.json() as Promise<{
    service: string;
    environment: string;
    checks: HealthCheck[];
  }>;
}

function statusClass(status: string) {
  if (status === "ok" || status === "configured") return "bg-green-50 text-green-700 border-green-100";
  if (status === "dev-default") return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-red-50 text-red-700 border-red-100";
}

export default async function BackendPage() {
  const health = await getHealth();

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8BB8D8] mb-2">Local Backend</p>
          <h1 className="text-[28px] font-extrabold tracking-[-0.025em] text-[#0d0d1a]">{health.service}</h1>
          <p className="text-[13px] text-[#6b6b80] mt-2">Environment: {health.environment}</p>
        </div>

        <div className="grid gap-3">
          {health.checks.map((check) => (
            <section key={check.name} className="bg-white border border-[#e8e8f0] rounded-[12px] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[14px] font-bold text-[#0d0d1a]">{check.name}</h2>
                  <p className="text-[12.5px] text-[#6b6b80] mt-1">{check.detail}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${statusClass(check.status)}`}>
                  {check.status}
                </span>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 bg-white border border-[#e8e8f0] rounded-[12px] p-5">
          <h2 className="text-[14px] font-bold text-[#0d0d1a] mb-3">Useful Local URLs</h2>
          <div className="grid gap-2 text-[12.5px]">
            <a className="text-[#5890B8] hover:text-[#0d0d1a]" href="/api/health">/api/health</a>
            <a className="text-[#5890B8] hover:text-[#0d0d1a]" href="/dashboard">/dashboard</a>
            <a className="text-[#5890B8] hover:text-[#0d0d1a]" href="/signup">/signup</a>
            <a className="text-[#5890B8] hover:text-[#0d0d1a]" href="/login">/login</a>
          </div>
        </div>
      </div>
    </main>
  );
}
