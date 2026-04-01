import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE, sanitizeImageUrl } from "@/lib/api";
import { ShareButton } from "@/components/ShareButton";

interface CollectionItem {
  id: string;
  product_name: string;
  product_image_url: string | null;
  product_price_cents: number;
  product_currency: string;
  product_brand: string | null;
}

interface CollectionData {
  collection: {
    id: string;
    name: string;
    description: string | null;
    cover_image_url: string | null;
    og_image_url: string | null;
    item_count: number;
    owner_name: string;
    owner_avatar_url: string | null;
    created_at: string;
  };
  items: CollectionItem[];
  total_items: number;
}

async function getCollection(
  username: string,
  slug: string
): Promise<CollectionData | null> {
  try {
    const res = await fetch(
      `${API_BASE}/collections/public/${username}/${slug}`,
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
  const data = await getCollection(username, slug);

  if (!data) {
    return {
      title: "Collection Not Found - Ravel",
      description: "This collection doesn\u2019t exist or is no longer public.",
    };
  }

  const { collection } = data;
  const title = `${collection.name} by ${collection.owner_name}`;
  const fullTitle = `${title} | Ravel`;
  const description =
    collection.description ||
    `A curated collection of ${collection.item_count} items by ${collection.owner_name} on Ravel`;
  const canonicalUrl = `https://ravel.life/collections/${username}/${slug}`;

  return {
    title: fullTitle,
    description,
    applicationName: "Ravel",
    authors: [{ name: collection.owner_name }],
    creator: collection.owner_name,
    publisher: "Ravel",
    keywords: [
      "fashion collection", "style", "curated fashion",
      collection.name, collection.owner_name, "outfit ideas", "wardrobe",
    ],
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, siteName: "Ravel", locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description, creator: "@ravelapp", site: "@ravelapp" },
  };
}

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getCollection(username, slug);
  if (!data) notFound();

  const { collection, items } = data;
  const shareUrl = `https://ravel.life/collections/${username}/${slug}`;
  const coverSrc = sanitizeImageUrl(collection.cover_image_url) || sanitizeImageUrl(items[0]?.product_image_url);
  // Sanitize all item image URLs to handle s3:// protocol
  const sanitizedItems = items.map((item) => ({
    ...item,
    product_image_url: sanitizeImageUrl(item.product_image_url),
  }));
  const featuredItems = sanitizedItems.slice(0, 2);
  const restItems = sanitizedItems.slice(2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description || `A curated collection by ${collection.owner_name}`,
    url: shareUrl,
    author: { "@type": "Person", name: collection.owner_name, image: sanitizeImageUrl(collection.owner_avatar_url) },
    numberOfItems: collection.item_count,
    dateCreated: collection.created_at,
    image: coverSrc,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.product_name,
          image: item.product_image_url,
          brand: item.product_brand ? { "@type": "Brand", name: item.product_brand } : undefined,
          offers: { "@type": "Offer", price: item.product_price_cents / 100, priceCurrency: item.product_currency || "USD" },
        },
      })),
    },
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
              <Link href="/" className="flex items-center gap-3 group">
                <Image src="/core.png" alt="Ravel" width={28} height={28} className="rounded-[8px] transition-transform duration-300 group-hover:scale-105" />
                <span className="text-[15px] font-semibold tracking-[-0.01em]">Ravel</span>
              </Link>
              <div className="flex items-center gap-3">
                <ShareButton
                  title={collection.name}
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
          {/*  IMMERSIVE COVER BANNER                    */}
          {/* ═══════════════════════════════════════════ */}
          {coverSrc && (
            <section className="relative w-full h-[42vh] min-h-[320px] max-h-[520px] overflow-hidden">
              <Image
                src={coverSrc}
                alt=""
                fill
                className="object-cover"
                priority
              />
              {/* Gradient fade to white */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/20 to-white" />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/40" />
            </section>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/*  EDITORIAL COLLECTION INFO                 */}
          {/* ═══════════════════════════════════════════ */}
          <section
            className={`relative px-6 pb-12 ${coverSrc ? "-mt-20" : "pt-12"}`}
          >
            <div className="max-w-[1100px] mx-auto">
              {/* Curated by */}
              <Link
                href={`/@${username}`}
                className="inline-flex items-center gap-3 mb-5 group"
              >
                {sanitizeImageUrl(collection.owner_avatar_url) ? (
                  <Image
                    src={sanitizeImageUrl(collection.owner_avatar_url)!}
                    alt={collection.owner_name}
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-white shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#f0ebe4] flex items-center justify-center ring-2 ring-white">
                    <span className="text-[14px] font-semibold text-[#0a0a0a]">
                      {collection.owner_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-[11px] text-[#b0b0b0] font-semibold tracking-[0.12em] uppercase leading-none mb-1">
                    Curated by
                  </p>
                  <p className="text-[15px] text-[#0a0a0a] font-medium group-hover:text-[#737373] transition-colors duration-300 leading-none">
                    {collection.owner_name}
                  </p>
                </div>
              </Link>

              {/* Collection title — massive editorial serif */}
              <h1 className="text-[clamp(40px,8vw,80px)] leading-[0.93] tracking-[-0.04em] mb-5">
                <span className="display-font italic font-normal">
                  {collection.name}
                </span>
              </h1>

              {collection.description && (
                <p className="text-[18px] leading-[1.6] text-[#737373] max-w-[600px] mb-6">
                  {collection.description}
                </p>
              )}

              {/* Stats + mobile actions */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fafafa] border border-black/[0.04]">
                  <span className="text-[14px] font-semibold text-[#0a0a0a]">
                    {collection.item_count}
                  </span>
                  <span className="text-[14px] text-[#b0b0b0]">pieces</span>
                </div>
                <div className="sm:hidden">
                  <ShareButton
                    title={collection.name}
                    url={shareUrl}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.06] text-[#0a0a0a] hover:bg-[#fafafa] transition-colors"
                    iconOnly
                  />
                </div>
                <a
                  href={`ravel://collection/${collection.id}`}
                  className="sm:hidden inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#0a0a0a] text-white text-[14px] font-medium"
                >
                  Open in App
                </a>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════ */}
          {/*  ITEMS                                     */}
          {/* ═══════════════════════════════════════════ */}
          <section className="px-6 pb-20">
            <div className="max-w-[1100px] mx-auto">
              {/* Section divider */}
              <div className="flex items-center gap-5 mb-8">
                <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase shrink-0">
                  Pieces
                </p>
                <div className="flex-1 h-px bg-black/[0.04]" />
              </div>

              {items.length > 0 ? (
                <>
                  {/* Featured items — larger, portrait aspect */}
                  {featuredItems.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      {featuredItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.07)]"
                        >
                          <div className="aspect-[3/4] bg-[#fafafa] relative overflow-hidden">
                            {item.product_image_url ? (
                              <Image
                                src={item.product_image_url}
                                alt={item.product_name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                sizes="(max-width: 640px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-14 h-14 text-[#e0e0e0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            {item.product_brand && (
                              <p className="text-[11px] text-[#b0b0b0] mb-1.5 font-semibold uppercase tracking-[0.08em]">
                                {item.product_brand}
                              </p>
                            )}
                            <h3 className="text-[16px] font-medium text-[#0a0a0a] mb-2 line-clamp-2">
                              {item.product_name}
                            </h3>
                            <p className="text-[15px] font-semibold text-[#404040]">
                              {formatPrice(item.product_price_cents, item.product_currency)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Rest of items — compact grid */}
                  {restItems.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {restItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          className="group bg-white rounded-[20px] overflow-hidden border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                        >
                          <div className="aspect-square bg-[#fafafa] relative overflow-hidden">
                            {item.product_image_url ? (
                              <Image
                                src={item.product_image_url}
                                alt={item.product_name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-[#e0e0e0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-3.5">
                            {item.product_brand && (
                              <p className="text-[11px] text-[#b0b0b0] mb-1 truncate font-semibold uppercase tracking-[0.05em]">
                                {item.product_brand}
                              </p>
                            )}
                            <h3 className="text-[13px] font-medium text-[#0a0a0a] truncate mb-1.5">
                              {item.product_name}
                            </h3>
                            <p className="text-[13px] font-semibold text-[#404040]">
                              {formatPrice(item.product_price_cents, item.product_currency)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#fafafa] border border-black/[0.04] flex items-center justify-center">
                    <svg className="w-9 h-9 text-[#b0b0b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <p className="text-[17px] text-[#737373]">
                    This collection is empty
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════════════════ */}
          {/*  APP PROMO — editorial statement           */}
          {/* ═══════════════════════════════════════════ */}
          <section className="px-6 py-28 bg-[#fafafa] border-t border-black/[0.04]">
            <div className="max-w-[640px] mx-auto text-center">
              <p className="text-[clamp(28px,4.5vw,44px)] leading-[1.2] tracking-[-0.025em] mb-10">
                <span className="display-font italic">Fashion is personal.</span>{" "}
                <span className="text-[#b0b0b0]">
                  Ravel gives your taste a home — organized, beautiful, and
                  entirely yours.
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
