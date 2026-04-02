import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE, sanitizeImageUrl } from "@/lib/api";
import { ShareButton } from "@/components/ShareButton";

interface LookItem {
  item_id: string | null;
  name: string | null;
  brand: string | null;
  image_url: string;
  category: string;
  price_cents: number | null;
}

interface LookData {
  id: string;
  name: string | null;
  description: string | null;
  look_image_url: string | null;
  look_image_with_bg_url: string | null;
  items: LookItem[];
  item_count: number;
  style_notes: string | null;
  occasion_tags: string[] | null;
  owner: {
    name: string;
    avatar_url: string | null;
  };
  created_at: string;
}

async function getLook(
  username: string,
  slug: string
): Promise<LookData | null> {
  try {
    const res = await fetch(
      `${API_BASE}/looks/public/${username}/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}): Promise<Metadata> {
  const { username, slug } = await params;
  const data = await getLook(username, slug);

  if (!data) {
    return {
      title: "Look Not Found - Ravel",
      description: "This look doesn\u2019t exist or is no longer public.",
    };
  }

  const lookName = data.name || "A Look";
  const title = `${lookName} by ${data.owner.name}`;
  const fullTitle = `${title} | Ravel`;
  const description =
    data.description ||
    data.style_notes ||
    `A curated look with ${data.item_count} items by ${data.owner.name} on Ravel`;
  const canonicalUrl = `https://ravel.life/look/${username}/${slug}`;

  return {
    title: fullTitle,
    description,
    applicationName: "Ravel",
    authors: [{ name: data.owner.name }],
    creator: data.owner.name,
    publisher: "Ravel",
    keywords: [
      "fashion look", "outfit", "virtual try-on", "style",
      lookName, data.owner.name, "outfit ideas", "wardrobe",
      ...(data.occasion_tags || []),
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ravel",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ravelapp",
      site: "@ravelapp",
    },
  };
}

function formatPrice(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default async function LookPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getLook(username, slug);
  if (!data) notFound();

  const shareUrl = `https://ravel.life/look/${username}/${slug}`;
  const lookImage = sanitizeImageUrl(data.look_image_with_bg_url) || sanitizeImageUrl(data.look_image_url);
  const lookName = data.name || "A Look";

  // Sanitize all item image URLs
  const sanitizedItems = data.items.map((item) => ({
    ...item,
    image_url: sanitizeImageUrl(item.image_url) || "",
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: lookName,
    description:
      data.description ||
      data.style_notes ||
      `A curated look by ${data.owner.name}`,
    url: shareUrl,
    author: {
      "@type": "Person",
      name: data.owner.name,
      image: sanitizeImageUrl(data.owner.avatar_url),
    },
    dateCreated: data.created_at,
    image: lookImage || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
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
              <div className="flex items-center gap-3">
                <ShareButton
                  title={lookName}
                  url={shareUrl}
                  className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-full border border-black/[0.06] text-[#0a0a0a] text-[13px] font-medium transition-all duration-300 hover:border-black/[0.12] hover:bg-[#fafafa]"
                />
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
          </div>
          <div className="h-px bg-black/[0.04]" />
        </nav>

        <main className="pt-16">
          {/* ═══════════════════════════════════════════ */}
          {/*  LOOK HERO                                 */}
          {/* ═══════════════════════════════════════════ */}
          <section className="relative">
            <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-12">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* Look Image */}
                {lookImage && (
                  <div className="lg:w-[55%] shrink-0">
                    <div className="aspect-[3/4] relative rounded-[28px] overflow-hidden bg-[#fafafa] shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                      <Image
                        src={lookImage}
                        alt={lookName}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  </div>
                )}

                {/* Look Info */}
                <div className="flex flex-col justify-center lg:py-8">
                  {/* Styled by */}
                  <div className="inline-flex items-center gap-3 mb-6">
                    {sanitizeImageUrl(data.owner.avatar_url) ? (
                      <Image
                        src={sanitizeImageUrl(data.owner.avatar_url)!}
                        alt={data.owner.name}
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-white shadow-sm"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#f0ebe4] flex items-center justify-center ring-2 ring-white">
                        <span className="text-[14px] font-semibold text-[#0a0a0a]">
                          {data.owner.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] text-[#b0b0b0] font-semibold tracking-[0.12em] uppercase leading-none mb-1">
                        Styled by
                      </p>
                      <p className="text-[15px] text-[#0a0a0a] font-medium leading-none">
                        {data.owner.name}
                      </p>
                    </div>
                  </div>

                  {/* Look name */}
                  <h1 className="text-[clamp(32px,6vw,56px)] leading-[0.95] tracking-[-0.04em] mb-5">
                    <span className="display-font italic font-normal">
                      {lookName}
                    </span>
                  </h1>

                  {/* Description or style notes */}
                  {(data.description || data.style_notes) && (
                    <p className="text-[17px] leading-[1.6] text-[#737373] max-w-[480px] mb-6">
                      {data.description || data.style_notes}
                    </p>
                  )}

                  {/* Occasion tags */}
                  {data.occasion_tags && data.occasion_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {data.occasion_tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full bg-[#fafafa] border border-black/[0.04] text-[13px] text-[#737373] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats + mobile actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fafafa] border border-black/[0.04]">
                      <span className="text-[14px] font-semibold text-[#0a0a0a]">
                        {data.item_count}
                      </span>
                      <span className="text-[14px] text-[#b0b0b0]">
                        {data.item_count === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <div className="sm:hidden">
                      <ShareButton
                        title={lookName}
                        url={shareUrl}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.06] text-[#0a0a0a] hover:bg-[#fafafa] transition-colors"
                        iconOnly
                      />
                    </div>
                    <a
                      href={`ravel://look/${data.id}`}
                      className="sm:hidden inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#0a0a0a] text-white text-[14px] font-medium"
                    >
                      Open in App
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════ */}
          {/*  ITEMS IN THIS LOOK                        */}
          {/* ═══════════════════════════════════════════ */}
          {data.items.length > 0 && (
            <section className="px-6 pb-20">
              <div className="max-w-[1100px] mx-auto">
                {/* Section divider */}
                <div className="flex items-center gap-5 mb-8">
                  <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase shrink-0">
                    Items in this look
                  </p>
                  <div className="flex-1 h-px bg-black/[0.04]" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {sanitizedItems.map((item, index) => {
                    const cardClassName = "group bg-white rounded-[20px] overflow-hidden border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]";
                    const cardKey = item.item_id || index;
                    const cardInner = (
                      <>
                        <div className="aspect-square bg-[#fafafa] relative overflow-hidden">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.name || item.category}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-[#e0e0e0]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="p-3.5">
                          {item.brand && (
                            <p className="text-[11px] text-[#b0b0b0] mb-1 truncate font-semibold uppercase tracking-[0.05em]">
                              {item.brand}
                            </p>
                          )}
                          <h3 className="text-[13px] font-medium text-[#0a0a0a] truncate mb-1.5">
                            {item.name || item.category}
                          </h3>
                          {item.price_cents != null && (
                            <p className="text-[13px] font-semibold text-[#404040]">
                              {formatPrice(item.price_cents)}
                            </p>
                          )}
                        </div>
                      </>
                    );
                    return item.item_id ? (
                      <Link key={cardKey} href={`/product/${item.item_id}`} className={cardClassName}>
                        {cardInner}
                      </Link>
                    ) : (
                      <div key={cardKey} className={cardClassName}>
                        {cardInner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/*  APP PROMO                                  */}
          {/* ═══════════════════════════════════════════ */}
          <section className="px-6 py-28 bg-[#fafafa] border-t border-black/[0.04]">
            <div className="max-w-[640px] mx-auto text-center">
              <p className="text-[clamp(28px,4.5vw,44px)] leading-[1.2] tracking-[-0.025em] mb-10">
                <span className="display-font italic">
                  See it on you.
                </span>{" "}
                <span className="text-[#b0b0b0]">
                  Ravel lets you try on any outfit virtually before you buy.
                  Your wardrobe, reimagined.
                </span>
              </p>
              <a
                href="https://apps.apple.com/app/ravel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 h-[56px] px-9 rounded-full bg-[#0a0a0a] text-white text-[16px] font-medium tracking-[-0.01em] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Ravel for iPhone
                <span className="text-white/50">&#8594;</span>
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
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
