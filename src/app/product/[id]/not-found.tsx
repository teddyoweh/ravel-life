import Image from "next/image";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]">
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

      <main className="flex-1 flex items-center justify-center pt-16 px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[#fafafa] border border-black/[0.04] flex items-center justify-center">
            <svg
              className="w-9 h-9 text-[#b0b0b0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h1 className="text-[28px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-3">
            Product Not Found
          </h1>
          <p className="text-[16px] text-[#737373] leading-relaxed mb-8">
            This product doesn&apos;t exist or is no longer available.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-[48px] px-7 rounded-full bg-[#0a0a0a] text-white text-[15px] font-medium transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}
