import { ImageResponse } from "next/og";
import { API_BASE, sanitizeImageUrl } from "@/lib/api";

export const runtime = "edge";
export const alt = "Product Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ProductVariant {
  name: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  images: { url: string; is_primary: boolean }[];
}

interface ProductGroup {
  name: string;
  brand: string | null;
  category: string | null;
  products: ProductVariant[];
}

async function getProduct(id: string): Promise<ProductGroup | null> {
  try {
    const res = await fetch(`${API_BASE}/catalog/product-groups/${id}`, {
      next: { revalidate: 300 },
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

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct(id);

  if (!data || data.products.length === 0) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span style={{ fontSize: 44, color: "#0a0a0a", fontWeight: 600 }}>
            Product not found
          </span>
        </div>
      ),
      { ...size }
    );
  }

  const primary = data.products[0];
  const primaryImage =
    sanitizeImageUrl(
      primary.images.find((i) => i.is_primary)?.url || primary.images[0]?.url
    ) || sanitizeImageUrl(primary.image_url);

  const nameLen = primary.name.length;
  const titleSize = nameLen > 40 ? 34 : nameLen > 25 ? 42 : 52;

  if (!primaryImage) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(240,230,215,0.4) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
          {data.brand && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#b0b0b0",
                letterSpacing: "0.15em",
                marginBottom: 14,
                position: "relative",
              }}
            >
              {data.brand.toUpperCase()}
            </span>
          )}
          <span
            style={{
              fontSize: 64,
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: "#0a0a0a",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textAlign: "center",
              maxWidth: 800,
              padding: "0 60px",
              position: "relative",
            }}
          >
            {primary.name}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#0a0a0a",
              marginTop: 20,
              position: "relative",
            }}
          >
            {formatPrice(primary.price_cents, primary.currency)}
          </span>
          <div
            style={{
              position: "absolute",
              bottom: 36,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ravel.life/core.png"
              alt=""
              style={{ width: 20, height: 20, borderRadius: 5 }}
            />
            <span
              style={{ fontSize: 13, fontWeight: 600, color: "#b0b0b0" }}
            >
              ravel.life
            </span>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left: Product image */}
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            padding: 28,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
              display: "flex",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={primaryImage}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: 1,
            background: "rgba(0,0,0,0.04)",
            margin: "44px 0",
          }}
        />

        {/* Right: Product info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "48px 48px 44px 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -80,
              top: "50%",
              transform: "translateY(-50%)",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(240,230,215,0.3) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.brand && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#b0b0b0",
                  letterSpacing: "0.15em",
                }}
              >
                {data.brand.toUpperCase()}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: titleSize,
                fontWeight: 400,
                fontStyle: "italic",
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: "#0a0a0a",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {primary.name}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                borderRadius: 100,
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.04)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0a0a0a",
                }}
              >
                {formatPrice(primary.price_cents, primary.currency)}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ravel.life/core.png"
              alt=""
              style={{ width: 20, height: 20, borderRadius: 5 }}
            />
            <span
              style={{ fontSize: 13, fontWeight: 600, color: "#b0b0b0" }}
            >
              ravel.life
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
