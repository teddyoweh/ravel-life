import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE, sanitizeImageUrl } from "@/lib/api";
import { ShareButton } from "@/components/ShareButton";

interface ProductImage {
  url: string;
  title: string | null;
  is_primary: boolean;
  sort_order: number;
  variant_type: string | null;
}

interface ProductVariant {
  id: string;
  product_group_id: string;
  name: string;
  description: string | null;
  short_blurb: string | null;
  price_cents: number;
  currency: string;
  original_price_cents: number | null;
  image_url: string | null;
  images: ProductImage[];
  brand: string | null;
  category: string | null;
  variant_label: string | null;
  tags: string[];
}

interface ProductGroup {
  id: string;
  name: string;
  brand: string | null;
  category: string | null;
  description: string | null;
  products: ProductVariant[];
}

async function getProduct(id: string): Promise<ProductGroup | null> {
  try {
    const res = await fetch(`${API_BASE}/catalog/product-groups/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getProduct(id);

  if (!data) {
    return {
      title: "Product Not Found - Ravel",
      description: "This product doesn\u2019t exist or is no longer available.",
    };
  }

  const primary = data.products[0];
  if (!primary) {
    return { title: "Product Not Found - Ravel" };
  }

  const title = data.brand ? `${primary.name} by ${data.brand}` : primary.name;
  const fullTitle = `${title} | Ravel`;
  const description =
    primary.description ||
    primary.short_blurb ||
    `Shop ${primary.name}${data.brand ? ` by ${data.brand}` : ""} on Ravel`;
  const canonicalUrl = `https://ravel.life/product/${id}`;
  const imageUrl = sanitizeImageUrl(primary.image_url);

  return {
    title: fullTitle,
    description,
    applicationName: "Ravel",
    keywords: [
      primary.name,
      data.brand,
      data.category,
      "fashion",
      "shop",
      "buy",
    ].filter(Boolean) as string[],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
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
      ...(imageUrl && {
        images: [
          { url: imageUrl, width: 800, height: 1000, alt: primary.name },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ravelapp",
      site: "@ravelapp",
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct(id);
  if (!data || data.products.length === 0) notFound();

  const primary = data.products[0];
  const shareUrl = `https://ravel.life/product/${id}`;

  const allImages = primary.images
    .map((img) => ({ ...img, url: sanitizeImageUrl(img.url) }))
    .filter((img) => img.url)
    .sort((a, b) => a.sort_order - b.sort_order);
  const heroImage =
    sanitizeImageUrl(
      allImages.find((i) => i.is_primary)?.url || allImages[0]?.url
    ) || sanitizeImageUrl(primary.image_url);
  const galleryImages = allImages.length > 1 ? allImages.slice(1, 5) : [];

  const hasDiscount =
    primary.original_price_cents &&
    primary.original_price_cents > primary.price_cents;
  const discountPercent = hasDiscount
    ? Math.round(
        ((primary.original_price_cents! - primary.price_cents) /
          primary.original_price_cents!) *
          100
      )
    : 0;

  const otherVariants = data.products.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: primary.name,
    description:
      primary.description || `${primary.name} available on Ravel`,
    url: shareUrl,
    image: heroImage,
    ...(data.brand && {
      brand: { "@type": "Brand", name: data.brand },
    }),
    ...(data.category && { category: data.category }),
    offers: {
      "@type": "Offer",
      price: primary.price_cents / 100,
      priceCurrency: primary.currency || "USD",
      availability: "https://schema.org/InStock",
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
                  title={primary.name}
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
          {/* Product Detail */}
          <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-10 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left: Images */}
              <div className="flex flex-col gap-3">
                {heroImage && (
                  <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-[#fafafa]">
                    <Image
                      src={heroImage}
                      alt={primary.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-[14px] overflow-hidden bg-[#fafafa]"
                      >
                        <Image
                          src={img.url!}
                          alt={img.title || `${primary.name} ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="12vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Info */}
              <div className="flex flex-col justify-center lg:sticky lg:top-28 lg:self-start">
                {data.brand && (
                  <p className="text-[11px] text-[#b0b0b0] font-semibold uppercase tracking-[0.12em] mb-3">
                    {data.brand}
                  </p>
                )}

                <h1 className="text-[clamp(28px,5vw,44px)] leading-[1.1] tracking-[-0.03em] mb-4">
                  <span className="display-font italic font-normal">
                    {primary.name}
                  </span>
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[28px] font-semibold text-[#0a0a0a] tracking-[-0.02em]">
                    {formatPrice(primary.price_cents, primary.currency)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-[18px] text-[#b0b0b0] line-through">
                        {formatPrice(
                          primary.original_price_cents!,
                          primary.currency
                        )}
                      </span>
                      <span className="text-[13px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {primary.short_blurb && (
                  <p className="text-[16px] leading-[1.6] text-[#737373] mb-6">
                    {primary.short_blurb}
                  </p>
                )}

                {primary.description && (
                  <p className="text-[15px] leading-[1.65] text-[#737373] mb-8">
                    {primary.description}
                  </p>
                )}

                {/* Tags */}
                {primary.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {primary.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] text-[#737373] px-3 py-1.5 rounded-full bg-[#fafafa] border border-black/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Variant selector */}
                {otherVariants.length > 0 && (
                  <div className="mb-8">
                    <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.12em] uppercase mb-3">
                      Variants
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[13px] font-medium text-white bg-[#0a0a0a] px-4 py-2 rounded-full">
                        {primary.variant_label || "Default"}
                      </span>
                      {otherVariants.map((v) => (
                        <span
                          key={v.id}
                          className="text-[13px] font-medium text-[#737373] px-4 py-2 rounded-full border border-black/[0.06] hover:border-black/[0.12] transition-colors"
                        >
                          {v.variant_label || v.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <a
                    href={`ravel://product/${id}`}
                    className="sm:hidden inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#0a0a0a] text-white text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                  >
                    Open in App
                  </a>
                  <a
                    href="https://apps.apple.com/app/ravel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#0a0a0a] text-white text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:inline-flex hidden"
                  >
                    Shop on Ravel
                    <span className="text-white/50 ml-2">&#8594;</span>
                  </a>
                  <div className="sm:hidden">
                    <ShareButton
                      title={primary.name}
                      url={shareUrl}
                      className="flex items-center justify-center gap-2 w-full h-[48px] rounded-full border border-black/[0.08] text-[#0a0a0a] text-[14px] font-medium transition-all duration-300 hover:bg-[#fafafa]"
                    />
                  </div>
                </div>

                {/* Category badge */}
                {data.category && (
                  <div className="mt-8 pt-6 border-t border-black/[0.04]">
                    <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.12em] uppercase mb-2">
                      Category
                    </p>
                    <span className="text-[14px] text-[#737373]">
                      {data.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* App promo */}
          <section className="px-6 py-28 bg-[#fafafa] border-t border-black/[0.04]">
            <div className="max-w-[640px] mx-auto text-center">
              <p className="text-[clamp(28px,4.5vw,44px)] leading-[1.2] tracking-[-0.025em] mb-10">
                <span className="display-font italic">Try it on.</span>{" "}
                <span className="text-[#b0b0b0]">
                  See how it looks on you with Ravel&apos;s virtual fitting room
                  — powered by AI.
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
