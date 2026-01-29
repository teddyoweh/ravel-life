import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ravel-api.dev.spawnlabs.run";

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
    item_count: number;
    owner_name: string;
    owner_avatar_url: string | null;
    created_at: string;
  };
  items: CollectionItem[];
  total_items: number;
}

async function getCollection(username: string, slug: string): Promise<CollectionData | null> {
  try {
    const res = await fetch(`${API_BASE}/collections/public/${username}/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      return null;
    }
    
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
      title: "Collection Not Found — Ravel",
    };
  }

  const { collection, items } = data;
  const title = `${collection.name} — Ravel`;
  const description = collection.description || `A collection of ${collection.item_count} items curated by ${collection.owner_name}`;
  const ogImage = collection.cover_image_url || items[0]?.product_image_url || "/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ravel.life/collections/${username}/${slug}`,
      siteName: "Ravel",
      images: [{ url: ogImage, width: 1200, height: 630, alt: collection.name }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatPrice(cents: number, currency: string): string {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getCollection(username, slug);
  
  if (!data) {
    notFound();
  }

  const { collection, items } = data;

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
            
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#0066cc] hover:underline"
            >
              Get the App
            </a>
          </div>
        </div>
        <div className="h-px bg-[#d2d2d7]/60" />
      </nav>

      <main className="pt-12">
        {/* Collection Header */}
        <section className="px-6 py-16 bg-[#fbfbfd]">
          <div className="max-w-[980px] mx-auto">
            <div className="max-w-[680px]">
              {/* Owner */}
              <div className="flex items-center gap-2 mb-6">
                {collection.owner_avatar_url ? (
                  <Image
                    src={collection.owner_avatar_url}
                    alt={collection.owner_name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#e8e8ed] flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-[#86868b]">
                      {collection.owner_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-[15px] text-[#86868b]">
                  {collection.owner_name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[48px] leading-[1.08] font-semibold tracking-[-0.003em] text-[#1d1d1f] mb-4">
                {collection.name}
              </h1>
              
              {collection.description && (
                <p className="text-[19px] leading-[1.42] text-[#86868b] mb-6">
                  {collection.description}
                </p>
              )}

              <p className="text-[15px] text-[#86868b]">
                {collection.item_count} {collection.item_count === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </section>

        {/* Items Grid */}
        <section className="px-6 py-12">
          <div className="max-w-[980px] mx-auto">
            {items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {items.map((item) => (
                  <div key={item.id} className="group">
                    {/* Product Image */}
                    <div className="aspect-square bg-[#f5f5f7] rounded-2xl relative overflow-hidden mb-3">
                      {item.product_image_url ? (
                        <Image
                          src={item.product_image_url}
                          alt={item.product_name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-[#d2d2d7]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div>
                      {item.product_brand && (
                        <p className="text-[12px] text-[#86868b] mb-0.5 truncate">
                          {item.product_brand}
                        </p>
                      )}
                      <p className="text-[15px] font-medium text-[#1d1d1f] truncate leading-tight">
                        {item.product_name}
                      </p>
                      <p className="text-[15px] text-[#86868b] mt-0.5">
                        {formatPrice(item.product_price_cents, item.product_currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#86868b]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <p className="text-[17px] text-[#86868b]">
                  This collection is empty
                </p>
              </div>
            )}
          </div>
        </section>

        {/* App Promo */}
        <section className="px-6 py-16 bg-[#fbfbfd]">
          <div className="max-w-[580px] mx-auto text-center">
            <h2 className="text-[32px] leading-[1.125] font-semibold tracking-[-0.003em] text-[#1d1d1f] mb-3">
              Create your own collections.
            </h2>
            <p className="text-[17px] leading-[1.47] text-[#86868b] mb-6">
              Download Ravel and start curating today.
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
            <Link href="/" className="hover:text-[#1d1d1f] transition-colors">
              ravel.life
            </Link>
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
