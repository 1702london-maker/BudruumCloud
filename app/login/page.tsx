"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

const BudruumLogo = () => (
  <svg viewBox="0 0 100 100" width="36" height="36">
    <ellipse cx="50" cy="40" rx="38" ry="30" fill="#C5DCF0" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <rect x="16" y="50" width="68" height="30" rx="5" fill="#B8D4E8" />
    <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="white" fontFamily="Georgia, serif">B</text>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn.email({ email, password });
    setLoading(false);
    if (res.error) {
      setError(res.error.message || "Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex w-[420px] flex-col bg-[#fafafa] border-r border-[#e8e8f0] p-10 justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <BudruumLogo />
          </div>
          <h2 className="text-[22px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3 leading-tight">
            The backend platform<br />built for agencies.
          </h2>
          <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-8">
            One flat monthly fee. Unlimited projects. Your clients get isolated infrastructure, and you get one dashboard.
          </p>
          <div className="space-y-3">
            {[
              "Managed database with branching",
              "Authentication out of the box",
              "Budruum Storage for files",
              "Global edge functions",
              "Real-time subscriptions",
            ].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4l2 2L6.5 2" stroke="#5890B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                </div>
                <span className="text-[12.5px] text-[#6b6b80]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#e8e8f0] rounded-[12px] p-4 bg-white">
          <p className="text-[12.5px] text-[#0d0d1a] leading-relaxed mb-3">&quot;We used to spend GBP 400/month across multiple platforms per client. Budruum covers it in one place.&quot;</p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8]">S</div>
            <div>
              <p className="text-[11.5px] font-semibold text-[#0d0d1a]">Sarah M.</p>
              <p className="text-[11px] text-[#9494a8]">Technical Director, Craft Studio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <BudruumLogo />
          </div>
          <h1 className="text-[24px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-1">Sign in</h1>
          <p className="text-[13px] text-[#9494a8] mb-7">Welcome back. Enter your credentials to continue.</p>

          {error && (
            <div className="mb-4 px-3 py-2.5 rounded-[8px] bg-red-50 border border-red-100 text-[12.5px] text-red-600">{error}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@agency.co" required
                className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
                className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#e8e8f0]" />
                <span className="text-[12px] text-[#6b6b80]">Remember me</span>
              </label>
              <a href="#" className="text-[12px] text-[#5890B8] hover:text-[#8BB8D8] transition-colors font-medium">Forgot password?</a>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#8BB8D8] text-white text-[13px] font-semibold py-2.5 rounded-[8px] mt-2 hover:bg-[#6aa0c4] transition-colors disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-[12.5px] text-[#9494a8] mt-7">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#5890B8] font-semibold hover:text-[#8BB8D8] transition-colors">Start for free</a>
          </p>
        </div>
      </div>
    </div>
  );
}
