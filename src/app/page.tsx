import Image from "next/image";
import Link from "next/link";

const marqueeWords = [
  "Save",
  "Curate",
  "Share",
  "Discover",
  "Collect",
  "Style",
  "Organize",
  "Inspire",
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ravel.life/#organization",
        name: "Ravel",
        url: "https://ravel.life",
        logo: {
          "@type": "ImageObject",
          url: "https://ravel.life/core.png",
          width: 512,
          height: 512,
        },
        sameAs: ["https://twitter.com/ravelapp"],
        description:
          "Save, organize, and share your favorite fashion finds. Build collections of items you love and discover new styles.",
      },
      {
        "@type": "WebSite",
        "@id": "https://ravel.life/#website",
        url: "https://ravel.life",
        name: "Ravel",
        publisher: { "@id": "https://ravel.life/#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "MobileApplication",
        name: "Ravel",
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        url: "https://apps.apple.com/app/ravel",
        downloadUrl: "https://apps.apple.com/app/ravel",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Curate your style. Save pieces you love, build collections, and share your aesthetic with the world.",
        screenshot: "https://ravel.life/core.png",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  NAVIGATION                                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
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

            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-5 py-2 rounded-full bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              Get the app
            </a>
          </div>
        </div>
        <div className="h-px bg-black/[0.04]" />
      </nav>

      <main>
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO                                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
          {/* Animated background glow */}
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] hero-glow animate-glow pointer-events-none" />

          {/* Floating collection cards — desktop only */}
          <div className="hidden lg:block">
            <div
              className="absolute animate-float-1"
              style={{ top: "16%", left: "9%" }}
            >
              <div className="w-[56px] h-[72px] rounded-2xl bg-[#f0ebe4] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.03]" />
            </div>
            <div
              className="absolute animate-float-2"
              style={{ top: "12%", right: "11%" }}
            >
              <div className="w-[80px] h-[56px] rounded-2xl bg-[#f0e4eb] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.03]" />
            </div>
            <div
              className="absolute animate-float-3"
              style={{ top: "44%", left: "5%" }}
            >
              <div className="w-[48px] h-[64px] rounded-xl bg-[#e4ebf0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.03]" />
            </div>
            <div
              className="absolute animate-float-4"
              style={{ top: "48%", right: "7%" }}
            >
              <div className="w-[64px] h-[80px] rounded-2xl bg-[#ede5db] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.03]" />
            </div>
            <div
              className="absolute animate-float-5"
              style={{ top: "74%", left: "13%" }}
            >
              <div className="w-[72px] h-[52px] rounded-xl bg-[#f5f0e8] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.03]" />
            </div>
            <div
              className="absolute animate-float-1"
              style={{
                top: "76%",
                right: "14%",
                animationDelay: "2s",
              }}
            >
              <div className="w-[52px] h-[68px] rounded-2xl bg-[#e8e4f0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.03]" />
            </div>
          </div>

          {/* Hero content */}
          <div className="relative z-10 text-center max-w-[900px]">
            <h1
              className="text-[clamp(56px,12vw,128px)] leading-[0.92] tracking-[-0.045em] font-semibold mb-8 opacity-0"
              style={{ animation: "fade-up 1s ease-out 0.1s forwards" }}
            >
              <span className="display-font italic font-normal">Style,</span>
              <br />
              curated.
            </h1>

            <p
              className="text-[clamp(17px,2.2vw,21px)] leading-[1.5] text-[#737373] max-w-[520px] mx-auto mb-12 opacity-0"
              style={{ animation: "fade-up 1s ease-out 0.3s forwards" }}
            >
              Save the pieces that catch your eye. Build collections that tell
              your story. Share your aesthetic with the world.
            </p>

            <div
              className="opacity-0"
              style={{ animation: "fade-up 1s ease-out 0.5s forwards" }}
            >
              <a
                href="https://apps.apple.com/app/ravel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 h-[56px] px-9 rounded-full bg-[#0a0a0a] text-white text-[16px] font-medium tracking-[-0.01em] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                Download for iPhone
                <span className="text-white/50">&#8594;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  MARQUEE                                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="border-y border-black/[0.04] py-5 overflow-hidden">
          <div className="animate-marquee flex shrink-0">
            {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map(
              (word, i) => (
                <span key={i} className="shrink-0 flex items-center">
                  <span className="mx-6 text-[13px] text-[#c8c8c8] font-medium tracking-[0.2em] uppercase select-none">
                    {word}
                  </span>
                  <span className="text-[#e0e0e0] select-none">&middot;</span>
                </span>
              )
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FEATURES                                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-28 lg:py-36 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Section header */}
            <div className="text-center mb-20">
              <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.035em] font-semibold mb-5">
                Everything in its place.
              </h2>
              <p className="text-[18px] leading-[1.5] text-[#737373] max-w-[460px] mx-auto">
                Three simple actions. One beautifully organized world.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {/* ── Save ── */}
              <div className="group relative p-8 lg:p-10 rounded-[28px] bg-[#fafafa] border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 rounded-2xl bg-[#f0ebe4] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-[#0a0a0a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] uppercase mb-4 block">
                  01
                </span>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-3">
                  Capture anything
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#737373]">
                  See something you love? One tap and it&apos;s in your
                  collection. From anywhere on the internet.
                </p>
              </div>

              {/* ── Curate ── */}
              <div className="group relative p-8 lg:p-10 rounded-[28px] bg-[#fafafa] border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 rounded-2xl bg-[#f0e4eb] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-[#0a0a0a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                </div>
                <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] uppercase mb-4 block">
                  02
                </span>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-3">
                  Build your edit
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#737373]">
                  Arrange pieces into collections. Minimal wardrobes, mood
                  boards, wishlists — however you see it.
                </p>
              </div>

              {/* ── Share ── */}
              <div className="group relative p-8 lg:p-10 rounded-[28px] bg-[#fafafa] border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 rounded-2xl bg-[#e4ebf0] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-[#0a0a0a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </div>
                <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] uppercase mb-4 block">
                  03
                </span>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-3">
                  Show your world
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#737373]">
                  Go public or keep it personal. Share collections with friends
                  or let everyone discover your eye.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  APP SHOWCASE                                             */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-28 lg:py-36 px-6 bg-[#fafafa] border-y border-black/[0.04]">
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Copy */}
            <div className="order-2 md:order-1">
              <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase mb-6">
                Designed for iPhone
              </p>
              <h2 className="text-[clamp(36px,5vw,52px)] leading-[1.05] tracking-[-0.035em] font-semibold mb-6">
                Crafted with
                <br />
                obsessive care.
              </h2>
              <p className="text-[17px] leading-[1.65] text-[#737373] max-w-[380px] mb-10">
                Every pixel considered. Every interaction refined. Ravel feels
                native because it is — built exclusively for iOS with the
                details you&apos;d expect.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[14px] text-[#999]">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
                  Native iOS
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
                  Fast &amp; fluid
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
                  Private by default
                </span>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-[260px]">
                {/* Outer frame — titanium gradient */}
                <div className="aspect-[9/19.5] rounded-[48px] bg-gradient-to-b from-[#e5e0da] via-[#d8d3cd] to-[#ccc7c1] p-[5px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.03)]">
                  <div className="w-full h-full rounded-[43px] bg-white overflow-hidden flex flex-col">
                    {/* Dynamic Island */}
                    <div className="pt-[14px] pb-3 flex justify-center">
                      <div className="w-[90px] h-[26px] bg-[#0a0a0a] rounded-full" />
                    </div>

                    {/* Mini app UI */}
                    <div className="flex-1 px-5 pb-3">
                      <p className="text-[11px] font-bold text-[#0a0a0a] tracking-[-0.01em] mb-1">
                        Collections
                      </p>
                      <p className="text-[8px] text-[#b0b0b0] mb-3">
                        4 collections
                      </p>
                      <div className="grid grid-cols-2 gap-[6px]">
                        <div className="aspect-square rounded-xl bg-[#f0ebe4]" />
                        <div className="aspect-square rounded-xl bg-[#f0e4eb]" />
                        <div className="aspect-square rounded-xl bg-[#e4ebf0]" />
                        <div className="aspect-square rounded-xl bg-[#ede5db]" />
                      </div>
                    </div>

                    {/* Tab bar */}
                    <div className="border-t border-black/[0.04] px-6 py-2.5 flex items-center justify-around">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#e8e8e8]" />
                      <div className="w-[18px] h-[18px] rounded-full bg-[#e8e8e8]" />
                      <div className="w-[18px] h-[18px] rounded-full bg-[#0a0a0a]" />
                      <div className="w-[18px] h-[18px] rounded-full bg-[#e8e8e8]" />
                    </div>

                    {/* Home indicator */}
                    <div className="pb-[7px] flex justify-center">
                      <div className="w-[100px] h-[4px] bg-[#0a0a0a]/15 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  STATEMENT                                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-28 lg:py-40 px-6">
          <div className="max-w-[860px] mx-auto text-center">
            <p className="text-[clamp(28px,4.5vw,48px)] leading-[1.25] tracking-[-0.025em]">
              <span className="display-font italic">Fashion is personal.</span>{" "}
              <span className="text-[#b0b0b0]">
                Ravel gives your taste a home — organized, beautiful, and
                entirely yours.
              </span>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FINAL CTA                                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-28 lg:py-36 px-6 border-t border-black/[0.04]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.035em] font-semibold mb-5">
              Start curating.
            </h2>
            <p className="text-[18px] leading-[1.5] text-[#737373] mb-10">
              Download Ravel and build your first collection in seconds.
              It&apos;s free.
            </p>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-[56px] px-9 rounded-full bg-[#0a0a0a] text-white text-[16px] font-medium tracking-[-0.01em] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Get Ravel for iPhone
              <span className="text-white/50">&#8594;</span>
            </a>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  FOOTER                                                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-black/[0.04] py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/core.png"
              alt="Ravel"
              width={18}
              height={18}
              className="rounded-[5px] opacity-40"
            />
            <span className="text-[13px] text-[#b0b0b0]">
              &copy; 2026 Ravel
            </span>
          </div>
          <div className="flex items-center gap-8 text-[13px] text-[#b0b0b0]">
            <Link
              href="/privacy"
              className="hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
