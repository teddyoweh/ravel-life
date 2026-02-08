import Image from "next/image";
import Link from "next/link";

export default function LookNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/core.png"
                alt="Ravel"
                width={28}
                height={28}
                className="rounded-[8px] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-[15px] font-semibold tracking-[-0.01em]">
                Ravel
              </span>
            </Link>
          </div>
        </div>
        <div className="h-px bg-black/[0.04]" />
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-[400px]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#fafafa] border border-black/[0.04] flex items-center justify-center">
            <svg
              className="w-7 h-7 text-[#b0b0b0]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h1 className="text-[28px] leading-[1.14] font-semibold tracking-[-0.03em] text-[#0a0a0a] mb-3">
            Look not found
          </h1>

          <p className="text-[17px] leading-[1.5] text-[#737373] mb-8">
            This look may be private or no longer exists.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-[48px] px-7 rounded-full bg-[#0a0a0a] text-white text-[15px] font-medium transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              Go Home
            </Link>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#0a0a0a] font-medium underline decoration-[#d4d4d4] hover:decoration-[#0a0a0a] transition-colors"
            >
              Download App
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
