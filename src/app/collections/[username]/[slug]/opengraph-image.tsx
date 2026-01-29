import { ImageResponse } from "next/og";
import { API_BASE } from "@/lib/api";

export const runtime = "edge";
export const alt = "Collection Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface CollectionItem {
  id: string;
  product_name: string;
  product_image_url: string | null;
}

interface CollectionData {
  collection: {
    name: string;
    item_count: number;
    owner_name: string;
    owner_avatar_url: string | null;
  };
  items: CollectionItem[];
}

async function getCollection(username: string, slug: string): Promise<CollectionData | null> {
  try {
    const res = await fetch(`${API_BASE}/collections/public/${username}/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getCollection(username, slug);

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafafa",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <span style={{ fontSize: 48, color: "#1d1d1f", fontWeight: 600 }}>
            Collection not found
          </span>
        </div>
      ),
      { ...size }
    );
  }

  const { items } = data;
  const productImages = items
    .filter((item) => item.product_image_url)
    .slice(0, 5);

  // Card positions - dramatic fan spread
  const cardPositions = [
    { rotate: -30, zIndex: 1 },
    { rotate: -15, zIndex: 2 },
    { rotate: 0, zIndex: 3 },
    { rotate: 15, zIndex: 4 },
    { rotate: 30, zIndex: 5 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#fafafa",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(145deg, #ffffff 0%, #f5f5f7 50%, #ebebed 100%)",
          }}
        />
        
        {/* Ambient light glow behind cards */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Centered fanned cards */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 800,
              height: 500,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {productImages.map((item, index) => {
              const pos = cardPositions[index];
              if (!pos || !item.product_image_url) return null;
              
              // Cards fan from bottom center pivot
              const translateX = Math.sin((pos.rotate * Math.PI) / 180) * 350;
              
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    width: 280,
                    height: 370,
                    borderRadius: 28,
                    overflow: "hidden",
                    transform: `translateX(${translateX}px) rotate(${pos.rotate}deg)`,
                    transformOrigin: "center bottom",
                    boxShadow: `
                      0 2px 4px rgba(0,0,0,0.04),
                      0 8px 16px rgba(0,0,0,0.08),
                      0 24px 48px rgba(0,0,0,0.12)
                    `,
                    display: "flex",
                    zIndex: pos.zIndex,
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product_image_url}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Subtle top highlight */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 80,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom branding bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 40,
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.02) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ravel.life/core.png"
              alt=""
              style={{ width: 28, height: 28, borderRadius: 7 }}
            />
            <span style={{ fontSize: 17, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
              Ravel
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
