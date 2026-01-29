import Image from "next/image";
import Link from "next/link";

export default function CollectionNotFound() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl backdrop-saturate-150">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="h-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/core.png"
                alt="Ravel"
                width={24}
                height={24}
                className="rounded-[6px]"
              />
              <span className="text-[15px] font-medium text-[#1d1d1f] tracking-[-0.01em]">
                Ravel
              </span>
            </Link>
          </div>
        </div>
        <div className="h-px bg-[#d2d2d7]/60" />
      </nav>

      {/* Content */}
      <main className="pt-12 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-[400px]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f5f5f7] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#86868b]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>

          <h1 className="text-[28px] leading-[1.14] font-semibold text-[#1d1d1f] mb-3">
            Collection not found
          </h1>
          
          <p className="text-[17px] leading-[1.47] text-[#86868b] mb-8">
            This collection may be private or no longer exists.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-[44px] px-[22px] rounded-full bg-[#0071e3] text-white text-[17px] font-normal transition-all hover:bg-[#0077ed]"
            >
              Go Home
            </Link>
            
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] text-[#0066cc] hover:underline"
            >
              Download App
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
