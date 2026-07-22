import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8f8fc] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#4231d0] rounded-[7px] flex items-center justify-center text-white text-[13px] font-bold">B</div>
          <span className="text-[16px] font-bold text-[#0d0d1a]">Budruum Cloud</span>
        </div>

        <div className="bg-white border border-[#e8e8f0] rounded-[10px] p-8 shadow-sm">
          <h1 className="text-[20px] font-bold text-[#0d0d1a] mb-1">Welcome back</h1>
          <p className="text-[13px] text-[#9494a8] mb-7">Sign in to your Budruum Cloud account</p>

          <form className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#0d0d1a]">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-[#0d0d1a]">Password</label>
                <Link href="/forgot-password" className="text-[12px] text-[#4231d0] hover:text-[#3520b8] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors"
              />
            </div>
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-full bg-[#4231d0] text-white text-[13px] font-semibold py-2.5 rounded-[6px] hover:bg-[#3520b8] transition-colors mt-2"
            >
              Sign in
            </Link>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#e8e8f0]" />
            <span className="text-[12px] text-[#9494a8]">or continue with</span>
            <div className="flex-1 h-px bg-[#e8e8f0]" />
          </div>

          <button className="flex items-center justify-center gap-2.5 w-full py-2.5 border border-[#e8e8f0] rounded-[6px] text-[13px] font-medium text-[#0d0d1a] hover:bg-[#f8f8fc] hover:border-[#d0d0e0] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-[13px] text-[#6b6b80] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#4231d0] font-medium hover:text-[#3520b8] transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
