import Image from "next/image";
import Link from "next/link";

const valueProps = [
  "Free on iPhone",
  "Privacy-first",
  "No ads, ever",
  "Unlimited collections",
  "Share anywhere",
  "Native iOS",
  "Lightning fast",
  "Your data, your control",
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
        logo: { "@type": "ImageObject", url: "https://ravel.life/core.png", width: 512, height: 512 },
        sameAs: ["https://twitter.com/ravelapp"],
        description: "Save, organize, and share your favorite fashion finds.",
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
        description: "Curate your style. Save pieces you love, build collections, and share your aesthetic.",
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
        {/* ══════════════ NAV ══════════════ */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <Image src="/core.png" alt="Ravel" width={28} height={28} className="rounded-[8px] transition-transform duration-300 group-hover:scale-105" />
                <span className="text-[15px] font-semibold tracking-[-0.01em]">Ravel</span>
              </Link>
              <a href="https://apps.apple.com/app/ravel" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium px-5 py-2 rounded-full bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                Get the app
              </a>
            </div>
          </div>
          <div className="h-px bg-black/[0.04]" />
        </nav>

        <main>
          {/* ══════════════ HERO ══════════════ */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
            <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] hero-glow animate-glow pointer-events-none" />

            {/* Floating mini collection cards — desktop */}
            <div className="hidden lg:block">
              {/* Card 1 — top left */}
              <div className="absolute animate-float-1" style={{ top: "14%", left: "7%" }}>
                <div className="w-[88px] rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden">
                  <div className="h-[56px] bg-gradient-to-br from-[#f0ebe4] to-[#e5ddd3]" />
                  <div className="p-2.5">
                    <div className="h-[5px] w-[52px] bg-[#e8e8e8] skel mb-1.5" />
                    <div className="h-[4px] w-[34px] bg-[#f0f0f0] skel" />
                  </div>
                </div>
              </div>
              {/* Card 2 — top right */}
              <div className="absolute animate-float-2" style={{ top: "11%", right: "9%" }}>
                <div className="w-[96px] rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden">
                  <div className="h-[52px] bg-gradient-to-br from-[#f0e4eb] to-[#e5d8e0]" />
                  <div className="p-2.5">
                    <div className="h-[5px] w-[58px] bg-[#e8e8e8] skel mb-1.5" />
                    <div className="h-[4px] w-[38px] bg-[#f0f0f0] skel" />
                  </div>
                </div>
              </div>
              {/* Card 3 — mid left */}
              <div className="absolute animate-float-3" style={{ top: "52%", left: "4%" }}>
                <div className="w-[80px] rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden">
                  <div className="h-[50px] bg-gradient-to-br from-[#e4ebf0] to-[#d8e0e5]" />
                  <div className="p-2">
                    <div className="h-[4px] w-[44px] bg-[#e8e8e8] skel mb-1" />
                    <div className="h-[3px] w-[28px] bg-[#f0f0f0] skel" />
                  </div>
                </div>
              </div>
              {/* Card 4 — bottom right */}
              <div className="absolute animate-float-4" style={{ top: "58%", right: "6%" }}>
                <div className="w-[84px] rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden">
                  <div className="h-[54px] bg-gradient-to-br from-[#ede5db] to-[#e0d8ce]" />
                  <div className="p-2">
                    <div className="h-[4px] w-[48px] bg-[#e8e8e8] skel mb-1" />
                    <div className="h-[3px] w-[30px] bg-[#f0f0f0] skel" />
                  </div>
                </div>
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
              <div className="opacity-0" style={{ animation: "fade-up 1s ease-out 0.5s forwards" }}>
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

          {/* ══════════════ VALUE PROP STRIP ══════════════ */}
          <div className="border-y border-black/[0.04] py-4 overflow-hidden">
            <div className="animate-marquee flex shrink-0">
              {[...valueProps, ...valueProps, ...valueProps].map((text, i) => (
                <span key={i} className="shrink-0 flex items-center">
                  <span className="mx-7 text-[13px] text-[#c8c8c8] font-medium tracking-[0.12em] uppercase select-none">
                    {text}
                  </span>
                  <span className="text-[#e0e0e0] select-none">&middot;</span>
                </span>
              ))}
            </div>
          </div>

          {/* ══════════════ BENTO FEATURES ══════════════ */}
          <section className="py-28 lg:py-36 px-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.035em] font-semibold mb-5">
                  Everything in its place.
                </h2>
                <p className="text-[18px] leading-[1.5] text-[#737373] max-w-[460px] mx-auto">
                  Three simple actions. One beautifully organized world.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* ── SAVE · large hero card ── */}
                <div className="lg:col-span-2 lg:row-span-2 group p-6 lg:p-8 rounded-[28px] bg-[#fafafa] border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                  {/* Visual: cascading saved items */}
                  <div className="relative h-[260px] lg:h-[320px] rounded-2xl bg-gradient-to-br from-[#faf8f5] to-[#f2ede6] overflow-hidden mb-6">
                    {/* Card stack */}
                    <div className="absolute" style={{ top: "18%", left: "10%", transform: "rotate(-8deg)" }}>
                      <div className="w-[120px] lg:w-[140px] rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden transition-transform duration-700 group-hover:translate-x-[-4px] group-hover:rotate-[-2deg]">
                        <div className="h-[72px] lg:h-[88px] bg-gradient-to-br from-[#f0ebe4] to-[#e5ddd3]" />
                        <div className="p-2.5"><div className="h-[5px] w-[65%] bg-[#e8e8e8] skel mb-1.5" /><div className="h-[4px] w-[40%] bg-[#f0f0f0] skel" /></div>
                      </div>
                    </div>
                    <div className="absolute" style={{ top: "12%", left: "28%", transform: "rotate(-2deg)" }}>
                      <div className="w-[120px] lg:w-[140px] rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/[0.04] overflow-hidden transition-transform duration-700 group-hover:translate-y-[-4px]">
                        <div className="h-[72px] lg:h-[88px] bg-gradient-to-br from-[#f0e4eb] to-[#e5d8e0]" />
                        <div className="p-2.5"><div className="h-[5px] w-[55%] bg-[#e8e8e8] skel mb-1.5" /><div className="h-[4px] w-[35%] bg-[#f0f0f0] skel" /></div>
                      </div>
                    </div>
                    <div className="absolute" style={{ top: "6%", left: "46%", transform: "rotate(4deg)" }}>
                      <div className="w-[120px] lg:w-[140px] rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-black/[0.04] overflow-hidden transition-transform duration-700 group-hover:translate-x-[4px] group-hover:rotate-[2deg]">
                        <div className="h-[72px] lg:h-[88px] bg-gradient-to-br from-[#e4ebf0] to-[#d8e0e5]" />
                        <div className="p-2.5"><div className="h-[5px] w-[60%] bg-[#e8e8e8] skel mb-1.5" /><div className="h-[4px] w-[38%] bg-[#f0f0f0] skel" /></div>
                      </div>
                    </div>
                    {/* Save button */}
                    <div className="absolute bottom-5 left-1/2 animate-pulse-subtle">
                      <div className="px-5 py-2.5 rounded-full bg-[#0a0a0a] text-white text-[12px] font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex items-center gap-2 whitespace-nowrap">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Save to Ravel
                      </div>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] uppercase mb-3 block">01</span>
                  <h3 className="text-[24px] font-semibold tracking-[-0.02em] mb-3">Capture anything</h3>
                  <p className="text-[15px] leading-[1.6] text-[#737373] max-w-[400px]">
                    See something you love? One tap and it&apos;s in your collection. From anywhere on the internet, any brand, any price.
                  </p>
                </div>

                {/* ── CURATE · right top ── */}
                <div className="group p-6 rounded-[28px] bg-[#fafafa] border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                  <div className="h-[150px] rounded-2xl bg-gradient-to-br from-[#faf8f5] to-[#f2ede6] p-4 overflow-hidden mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-md bg-[#f0ebe4] border border-black/[0.04]" />
                      <div className="h-[5px] w-[52px] bg-[#ddd] skel" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        "from-[#f0ebe4] to-[#e5ddd3]",
                        "from-[#f0e4eb] to-[#e5d8e0]",
                        "from-[#e4ebf0] to-[#d8e0e5]",
                        "from-[#ede5db] to-[#e0d8ce]",
                        "from-[#e8e4f0] to-[#dbd7e5]",
                        "from-[#f5f0e8] to-[#e8e3db]",
                      ].map((g, i) => (
                        <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${g} transition-transform duration-500 group-hover:scale-[1.03]`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] uppercase mb-3 block">02</span>
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-2">Build your edit</h3>
                  <p className="text-[15px] leading-[1.6] text-[#737373]">
                    Arrange pieces into collections. Minimal wardrobes, mood boards, wishlists.
                  </p>
                </div>

                {/* ── SHARE · right bottom ── */}
                <div className="group p-6 rounded-[28px] bg-[#fafafa] border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                  <div className="h-[150px] rounded-2xl bg-gradient-to-br from-[#faf8f5] to-[#f2ede6] flex flex-col items-center justify-center overflow-hidden mb-5">
                    <div className="w-[85%] max-w-[200px] p-3 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-black/[0.04]">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f0ebe4] to-[#e5ddd3]" />
                        <div><div className="h-[5px] w-[48px] bg-[#ddd] skel mb-1" /><div className="h-[4px] w-[32px] bg-[#eee] skel" /></div>
                      </div>
                      <div className="h-[4px] w-full bg-[#f0f0f0] skel mb-1" />
                      <div className="h-[4px] w-[65%] bg-[#f0f0f0] skel" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-3">
                      <div className="flex -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f0ebe4] border-2 border-[#f5f2ee]" />
                        <div className="w-5 h-5 rounded-full bg-[#f0e4eb] border-2 border-[#f5f2ee]" />
                        <div className="w-5 h-5 rounded-full bg-[#e4ebf0] border-2 border-[#f5f2ee]" />
                      </div>
                      <span className="text-[10px] text-[#b0b0b0] ml-0.5">shared</span>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] uppercase mb-3 block">03</span>
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-2">Show your world</h3>
                  <p className="text-[15px] leading-[1.6] text-[#737373]">
                    Go public or keep it personal. Your collections, your rules.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════ APP SHOWCASE ══════════════ */}
          <section className="py-28 lg:py-36 px-6 bg-[#fafafa] border-y border-black/[0.04]">
            <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 md:order-1">
                <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase mb-6">Designed for iPhone</p>
                <h2 className="text-[clamp(36px,5vw,52px)] leading-[1.05] tracking-[-0.035em] font-semibold mb-6">
                  Crafted with<br />obsessive care.
                </h2>
                <p className="text-[17px] leading-[1.65] text-[#737373] max-w-[380px] mb-10">
                  Every pixel considered. Every interaction refined. Ravel feels native because it is — built exclusively for iOS with the details you&apos;d expect.
                </p>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[14px] text-[#999]">
                  {["Native iOS", "Fast & fluid", "Private by default"].map((t) => (
                    <span key={t} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phone mockup — ultra-detailed */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-[260px]">
                  <div className="aspect-[9/19.5] rounded-[48px] bg-gradient-to-b from-[#e5e0da] via-[#d8d3cd] to-[#ccc7c1] p-[5px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.03)]">
                    <div className="w-full h-full rounded-[43px] bg-white overflow-hidden flex flex-col relative">
                      {/* Dynamic Island */}
                      <div className="pt-[14px] pb-2 flex justify-center">
                        <div className="w-[90px] h-[26px] bg-[#0a0a0a] rounded-full" />
                      </div>
                      {/* Search bar */}
                      <div className="px-4 mb-2.5">
                        <div className="h-[28px] rounded-full bg-[#f5f5f5] flex items-center px-3 gap-2">
                          <svg className="w-[11px] h-[11px] text-[#c0c0c0]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                          <div className="h-[4px] w-[44px] bg-[#ddd] skel" />
                        </div>
                      </div>
                      {/* Header */}
                      <div className="px-4 mb-2">
                        <div className="h-[6px] w-[64px] bg-[#0a0a0a] skel mb-1" />
                        <div className="h-[4px] w-[44px] bg-[#e0e0e0] skel" />
                      </div>
                      {/* Collections */}
                      <div className="flex-1 px-4 space-y-3 overflow-hidden">
                        {[
                          { color: "from-[#f0ebe4] to-[#e5ddd3]", color2: "from-[#f0e4eb] to-[#e5d8e0]", color3: "from-[#e4ebf0] to-[#d8e0e5]", icon: "#f0ebe4", w: 42 },
                          { color: "from-[#ede5db] to-[#e0d8ce]", color2: "from-[#e8e4f0] to-[#dbd7e5]", color3: "from-[#f5f0e8] to-[#e8e3db]", icon: "#e4ebf0", w: 52 },
                        ].map((row, ri) => (
                          <div key={ri}>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-4 h-4 rounded-md" style={{ background: row.icon }} />
                              <div className="h-[4px] skel bg-[#ddd]" style={{ width: row.w }} />
                            </div>
                            <div className="flex gap-1.5">
                              <div className={`w-[50px] h-[50px] rounded-[10px] bg-gradient-to-br ${row.color}`} />
                              <div className={`w-[50px] h-[50px] rounded-[10px] bg-gradient-to-br ${row.color2}`} />
                              <div className={`w-[50px] h-[50px] rounded-[10px] bg-gradient-to-br ${row.color3}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* FAB */}
                      <div className="absolute bottom-[52px] right-[16px] w-[34px] h-[34px] rounded-full bg-[#0a0a0a] shadow-[0_4px_16px_rgba(0,0,0,0.2)] flex items-center justify-center">
                        <svg className="w-[14px] h-[14px] text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      </div>
                      {/* Tab bar */}
                      <div className="border-t border-black/[0.04] px-5 py-2 flex items-center justify-around">
                        {[false, false, true, false].map((active, i) => (
                          <div key={i} className="flex flex-col items-center gap-[3px]">
                            <div className={`w-[15px] h-[15px] ${i === 3 ? "rounded-full" : "rounded"} ${active ? "bg-[#0a0a0a]" : "bg-[#e0e0e0]"}`} />
                            <div className={`w-[18px] h-[2px] skel ${active ? "bg-[#0a0a0a]" : "bg-[#e8e8e8]"}`} />
                          </div>
                        ))}
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

          {/* ══════════════ DARK CTA ══════════════ */}
          <section className="relative px-6 py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] dark-glow pointer-events-none" />

            <div className="max-w-[680px] mx-auto text-center relative">
              <p className="text-[clamp(28px,4.5vw,48px)] leading-[1.25] tracking-[-0.025em] mb-12">
                <span className="display-font italic text-white">Fashion is personal.</span>{" "}
                <span className="text-white/30">
                  Ravel gives your taste a home — organized, beautiful, and entirely yours.
                </span>
              </p>

              <a
                href="https://apps.apple.com/app/ravel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 h-[56px] px-9 rounded-full bg-white text-[#0a0a0a] text-[16px] font-medium tracking-[-0.01em] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_12px_40px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Ravel for iPhone
                <span className="text-[#0a0a0a]/40">&#8594;</span>
              </a>
            </div>
          </section>
        </main>

        {/* ══════════════ FOOTER ══════════════ */}
        <footer className="border-t border-black/[0.04] py-8 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <Image src="/core.png" alt="Ravel" width={18} height={18} className="rounded-[5px] opacity-40" />
              <span className="text-[13px] text-[#b0b0b0]">&copy; 2026 Ravel</span>
            </div>
            <div className="flex items-center gap-8 text-[13px] text-[#b0b0b0]">
              <Link href="/privacy" className="hover:text-[#0a0a0a] transition-colors duration-300">Privacy</Link>
              <Link href="/terms" className="hover:text-[#0a0a0a] transition-colors duration-300">Terms</Link>
              <Link href="/support" className="hover:text-[#0a0a0a] transition-colors duration-300">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
