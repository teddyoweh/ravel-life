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

async function getCollection(
  username: string,
  slug: string
): Promise<CollectionData | null> {
  try {
    const res = await fetch(
      `${API_BASE}/collections/public/${username}/${slug}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TwitterImage({
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
            background: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span style={{ fontSize: 44, color: "#0a0a0a", fontWeight: 600 }}>
            Collection not found
          </span>
        </div>
      ),
      { ...size }
    );
  }

  const { collection, items } = data;
  const productImages = items
    .filter((item) => item.product_image_url)
    .slice(0, 4);
  const hasImages = productImages.length > 0;

  const nameLen = collection.name.length;
  const titleSize = nameLen > 50 ? 32 : nameLen > 30 ? 38 : 48;
  const centeredTitleSize = nameLen > 40 ? 52 : nameLen > 20 ? 68 : 84;

  // ─── No product images: centered editorial typography ───
  if (!hasImages) {
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
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: "translate(-50%, -50%)",
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(240,230,215,0.4) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              position: "relative",
            }}
          >
            {collection.owner_avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={collection.owner_avatar_url}
                alt=""
                style={{ width: 24, height: 24, borderRadius: 12 }}
              />
            ) : (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  background: "#f0ebe4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0a0a0a",
                }}
              >
                {collection.owner_name.charAt(0)}
              </div>
            )}
            <span style={{ fontSize: 14, color: "#b0b0b0", fontWeight: 500 }}>
              {collection.owner_name}
            </span>
          </div>
          <span
            style={{
              fontSize: centeredTitleSize,
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: "#0a0a0a",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textAlign: "center",
              maxWidth: 900,
              padding: "0 60px",
              position: "relative",
            }}
          >
            {collection.name}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 20,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>
              {collection.item_count}
            </span>
            <span style={{ fontSize: 15, color: "#b0b0b0" }}>pieces</span>
          </div>
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
            <span style={{ fontSize: 13, fontWeight: 600, color: "#b0b0b0" }}>
              ravel.life
            </span>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // ─── With product images: editorial split layout ───
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
        <div
          style={{
            position: "absolute",
            left: -120,
            top: "50%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(240,230,215,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* LEFT: Collection Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "42%",
            padding: "44px 24px 44px 48px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#b0b0b0",
                letterSpacing: "0.18em",
              }}
            >
              CURATED BY
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {collection.owner_avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={collection.owner_avatar_url}
                  alt=""
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    border: "2px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    background: "#f0ebe4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>
                    {collection.owner_name.charAt(0)}
                  </span>
                </div>
              )}
              <span style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}>
                {collection.owner_name}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span
              style={{
                fontSize: titleSize,
                fontWeight: 400,
                fontStyle: "italic",
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: "#0a0a0a",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              {collection.name}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 100,
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.04)",
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>
                {collection.item_count}
              </span>
              <span style={{ fontSize: 13, color: "#b0b0b0" }}>pieces</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ravel.life/core.png"
              alt=""
              style={{ width: 20, height: 20, borderRadius: 5 }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#b0b0b0" }}>
              ravel.life
            </span>
          </div>
        </div>

        <div style={{ width: 1, background: "rgba(0,0,0,0.04)", margin: "44px 0" }} />

        {/* RIGHT: Product Collage */}
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "28px 32px 28px 28px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(240,230,215,0.2) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />

          {productImages.length >= 3 ? (
            <div
              style={{
                display: "flex",
                gap: 10,
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div
                  style={{
                    flex: 1.2,
                    borderRadius: 18,
                    overflow: "hidden",
                    display: "flex",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={productImages[0].product_image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {productImages.length >= 4 ? (
                  <div
                    style={{
                      flex: 0.8,
                      borderRadius: 18,
                      overflow: "hidden",
                      display: "flex",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={productImages[3].product_image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div
                    style={{
                      flex: 0.8,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, #f0ebe4, #e8e4de)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.15)" }}>
                      +{collection.item_count - 3}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div
                  style={{
                    flex: 0.8,
                    borderRadius: 18,
                    overflow: "hidden",
                    display: "flex",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={productImages[1].product_image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div
                  style={{
                    flex: 1.2,
                    borderRadius: 18,
                    overflow: "hidden",
                    display: "flex",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={productImages[2].product_image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          ) : productImages.length === 2 ? (
            <div style={{ display: "flex", gap: 10, width: "100%", height: "100%" }}>
              {productImages.map((item) => (
                <div
                  key={item.id}
                  style={{
                    flex: 1,
                    borderRadius: 18,
                    overflow: "hidden",
                    display: "flex",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.product_image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImages[0].product_image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
