import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl backdrop-saturate-150">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="h-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
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
            
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#0066cc] hover:underline"
            >
              Download
            </a>
          </div>
        </div>
        <div className="h-px bg-[#d2d2d7]/60" />
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-[980px] mx-auto text-center">
            <h1 className="text-[56px] leading-[1.07] font-semibold tracking-[-0.005em] text-[#1d1d1f] mb-6">
              Curate your style.
            </h1>
            
            <p className="text-[21px] leading-[1.381] font-normal text-[#1d1d1f] max-w-[600px] mx-auto mb-8">
              Save your favorite pieces. Organize them into collections. Share with the people who matter.
            </p>

            <div className="flex items-center justify-center gap-5">
              <a
                href="https://apps.apple.com/app/ravel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[44px] px-[22px] rounded-full bg-[#0071e3] text-white text-[17px] font-normal tracking-[-0.01em] transition-all hover:bg-[#0077ed]"
              >
                Download for iPhone
              </a>
            </div>
          </div>
        </section>

        {/* App Preview */}
        <section className="pb-24 px-6">
          <div className="max-w-[980px] mx-auto">
            <div className="relative mx-auto max-w-[320px]">
              <div className="aspect-[9/19.5] rounded-[44px] bg-gradient-to-b from-[#f5f5f7] to-[#e8e8ed] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
                <div className="w-full h-full rounded-[32px] bg-white flex items-center justify-center overflow-hidden">
                  <div className="text-center p-6">
                    <Image
                      src="/core.png"
                      alt="Ravel App"
                      width={64}
                      height={64}
                      className="mx-auto mb-4 rounded-2xl shadow-lg"
                    />
                    <p className="text-[15px] text-[#86868b]">Your collections await</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-[#d2d2d7]/60 max-w-[980px] mx-auto" />

        {/* Features */}
        <section className="py-24 px-6">
          <div className="max-w-[980px] mx-auto">
            <h2 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.005em] text-[#1d1d1f] text-center mb-4">
              Simple by design.
            </h2>
            <p className="text-[17px] leading-[1.47] text-[#86868b] text-center max-w-[500px] mx-auto mb-16">
              Every detail crafted to help you discover and share what you love.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">
                  Save
                </h3>
                <p className="text-[15px] leading-[1.47] text-[#86868b]">
                  Bookmark anything you love from anywhere on the web.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">
                  Organize
                </h3>
                <p className="text-[15px] leading-[1.47] text-[#86868b]">
                  Group items into collections that reflect your taste.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">
                  Share
                </h3>
                <p className="text-[15px] leading-[1.47] text-[#86868b]">
                  Invite friends or make collections public for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-[#d2d2d7]/60 max-w-[980px] mx-auto" />

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-[580px] mx-auto text-center">
            <h2 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.005em] text-[#1d1d1f] mb-4">
              Get started today.
            </h2>
            <p className="text-[17px] leading-[1.47] text-[#86868b] mb-8">
              Download Ravel and create your first collection in seconds.
            </p>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-[44px] px-[22px] rounded-full bg-[#0071e3] text-white text-[17px] font-normal tracking-[-0.01em] transition-all hover:bg-[#0077ed]"
            >
              Download for iPhone
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d2d2d7]/60 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#86868b]">
            <p>Copyright © 2026 Ravel. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-[#1d1d1f] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#1d1d1f] transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
