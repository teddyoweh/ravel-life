import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// API base URL - use environment variable in production
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ravel-api-152773804593.us-central1.run.app";

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
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch {
    return null;
  }
}

// Generate dynamic metadata for OG tags
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
    };
  }

  const { collection, items } = data;
  const title = `${collection.name} by ${collection.owner_name} - Ravel`;
  const description = collection.description || `A curated collection of ${collection.item_count} items by ${collection.owner_name}`;
  
  // Use first item's image or collection cover as OG image
  const ogImage = collection.cover_image_url || items[0]?.product_image_url || "/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ravel.life/collections/${username}/${slug}`,
      siteName: "Ravel",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/core.png"
              alt="Ravel"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-semibold text-lg tracking-tight">Ravel</span>
          </Link>
          
          <a
            href="https://apps.apple.com/app/ravel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center px-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Get the App
          </a>
        </div>
      </nav>

      {/* Collection Header */}
      <main className="pt-16">
        <section className="px-6 py-12 border-b border-neutral-100 dark:border-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Collection Cover */}
              {collection.cover_image_url ? (
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                  <Image
                    src={collection.cover_image_url}
                    alt={collection.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                  </svg>
                </div>
              )}

              {/* Collection Info */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white mb-2">
                  {collection.name}
                </h1>
                
                {collection.description && (
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-2xl">
                    {collection.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {/* Owner */}
                  <div className="flex items-center gap-2">
                    {collection.owner_avatar_url ? (
                      <Image
                        src={collection.owner_avatar_url}
                        alt={collection.owner_name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                          {collection.owner_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span>by {collection.owner_name}</span>
                  </div>

                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  
                  <span>{collection.item_count} items</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Items Grid */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800 transition-shadow hover:shadow-lg"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                      {item.product_image_url ? (
                        <Image
                          src={item.product_image_url}
                          alt={item.product_name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      {item.product_brand && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 truncate">
                          {item.product_brand}
                        </p>
                      )}
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate mb-1">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {formatPrice(item.product_price_cents, item.product_currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  This collection is empty
                </p>
              </div>
            )}
          </div>
        </section>

        {/* App Promo */}
        <section className="px-6 py-16 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
              Want to create your own collections?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Download Ravel and start curating your style today.
            </p>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-14 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Get Ravel Free
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-100 dark:border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/core.png"
              alt="Ravel"
              width={20}
              height={20}
              className="rounded-md"
            />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ravel.life
            </span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
            <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
