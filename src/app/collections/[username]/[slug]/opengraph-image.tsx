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

// Positions for scattered images around the edges (x%, y%, rotation, scale)
const imagePositions = [
  { x: 2, y: 5, rotate: -12, scale: 0.9 },
  { x: 78, y: 3, rotate: 8, scale: 0.85 },
  { x: -3, y: 55, rotate: -8, scale: 0.95 },
  { x: 80, y: 50, rotate: 15, scale: 0.88 },
  { x: 5, y: 78, rotate: 6, scale: 0.82 },
  { x: 75, y: 75, rotate: -10, scale: 0.9 },
  { x: 35, y: -5, rotate: 3, scale: 0.75 },
  { x: 40, y: 82, rotate: -5, scale: 0.78 },
];

export default async function Image({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getCollection(username, slug);

  if (!data) {
    // Fallback for missing collection
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 48, color: "#fff", fontWeight: 600 }}>
              Ravel
            </span>
            <span style={{ fontSize: 24, color: "#666" }}>
              Collection not found
            </span>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const { collection, items } = data;
  const productImages = items
    .filter((item) => item.product_image_url)
    .slice(0, 8);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #f0f0f0 100%)",
          }}
        />

        {/* Scattered product images around edges */}
        {productImages.map((item, index) => {
          const pos = imagePositions[index];
          if (!pos || !item.product_image_url) return null;
          
          const imgSize = 160 * pos.scale;
          
          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: imgSize,
                height: imgSize,
                borderRadius: 16,
                overflow: "hidden",
                transform: `rotate(${pos.rotate}deg)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                border: "3px solid white",
                display: "flex",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.product_image_url}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 60,
          }}
        >
          {/* Glass card for text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 80px",
              borderRadius: 32,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 60px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            {/* Collection name */}
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#1a1a1a",
                textAlign: "center",
                lineHeight: 1.1,
                maxWidth: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {collection.name}
            </span>

            {/* Divider */}
            <div
              style={{
                width: 60,
                height: 3,
                backgroundColor: "#e0e0e0",
                borderRadius: 2,
                marginTop: 28,
                marginBottom: 28,
              }}
            />

            {/* Owner and stats */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Owner avatar */}
              {collection.owner_avatar_url ? (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    overflow: "hidden",
                    display: "flex",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collection.owner_avatar_url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#e5e5e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#666" }}>
                    {collection.owner_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              <span
                style={{
                  fontSize: 24,
                  color: "#666",
                  fontWeight: 500,
                }}
              >
                {collection.owner_name}
              </span>
              
              <span style={{ fontSize: 24, color: "#ccc" }}>•</span>
              
              <span
                style={{
                  fontSize: 24,
                  color: "#666",
                  fontWeight: 500,
                }}
              >
                {collection.item_count} items
              </span>
            </div>
          </div>
        </div>

        {/* Ravel branding */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 32,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            ravel.life
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
