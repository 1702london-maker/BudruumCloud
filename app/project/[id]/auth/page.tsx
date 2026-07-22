"use client";
import { useEffect, useState } from "react";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
};

export default function AuthPage({ params }: { params: { id: string } }) {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/projects/' + params.id + '/auth-users')
      .then(r => r.json())
      .then(d => { setUsers(d.users || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">Authentication</h1>
          <p className="text-[12.5px] text-[#9494a8] mt-0.5">Manage users who have signed up to your project.</p>
        </div>
        <span className="text-[11px] font-semibold text-[#8BB8D8] bg-[#EEF5FB] border border-[#C5DCF0] px-3 py-1 rounded-full">
          {users.length} users
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total users", value: users.length },
          { label: "Verified", value: users.filter(u => u.emailVerified).length },
          { label: "Unverified", value: users.filter(u => !u.emailVerified).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-[#e8e8f0] rounded-[12px] p-4">
            <p className="text-[11px] font-semibold text-[#9494a8] uppercase tracking-wide mb-1">{label}</p>
            <p className="text-[22px] font-extrabold text-[#0d0d1a]">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e8e8f0] rounded-[14px] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#e8e8f0] flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by email or name..."
            className="flex-1 text-[12.5px] text-[#0d0d1a] placeholder-[#c0c0d0] bg-transparent focus:outline-none"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-16 flex-col gap-2">
            <p className="text-[13px] font-semibold text-[#0d0d1a]">No users yet</p>
            <p className="text-[12px] text-[#9494a8]">Users who sign up via your project will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-[12.5px]">
            <thead className="bg-[#fafafa] border-b border-[#e8e8f0]">
              <tr>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">User</th>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">Email</th>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">Status</th>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-[#f0f0f8] hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[10px] font-bold text-[#5890B8] flex-shrink-0">
                        {u.name?.[0]?.toUpperCase() || u.email[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium text-[#0d0d1a]">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#6b6b80] font-mono text-[11.5px]">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={"text-[10.5px] font-semibold px-2 py-0.5 rounded-full " + (u.emailVerified ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600")}>
                      {u.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#9494a8]">
                    {new Date(u.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-[#EEF5FB] border border-[#C5DCF0] rounded-[12px] p-4">
        <p className="text-[12px] font-semibold text-[#5890B8] mb-1">Email + Password auth is enabled</p>
        <p className="text-[11.5px] text-[#6b6b80]">Use the Budruum Auth SDK in your app to sign users up and in. Magic links, OAuth providers, and phone auth coming soon.</p>
      </div>
    </div>
  );
}