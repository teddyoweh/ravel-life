import { ImageResponse } from "next/og";
import { API_BASE, sanitizeImageUrl } from "@/lib/api";

export const runtime = "edge";
export const alt = "Look Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface LookData {
  id: string;
  name: string | null;
  description: string | null;
  look_image_url: string | null;
  look_image_with_bg_url: string | null;
  items: { image_url: string; name: string | null; brand: string | null }[];
  item_count: number;
  style_notes: string | null;
  occasion_tags: string[] | null;
  owner: {
    name: string;
    avatar_url: string | null;
  };
}

async function getLook(
  username: string,
  slug: string
): Promise<LookData | null> {
  try {
    const res = await fetch(
      `${API_BASE}/looks/public/${username}/${slug}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getLook(username, slug);

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
            Look not found
          </span>
        </div>
      ),
      { ...size }
    );
  }

  const lookName = data.name || "A Look";
  const lookImage = sanitizeImageUrl(data.look_image_with_bg_url) || sanitizeImageUrl(data.look_image_url);
  const hasLookImage = !!lookImage;

  const nameLen = lookName.length;
  const centeredTitleSize = nameLen > 40 ? 48 : nameLen > 20 ? 64 : 78;

  // ─── No look image: centered editorial typography ───
  if (!hasLookImage) {
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
          {/* Warm glow */}
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

          {/* Styled by label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              position: "relative",
            }}
          >
            {data.owner.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sanitizeImageUrl(data.owner.avatar_url) || ""}
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
                {data.owner.name.charAt(0)}
              </div>
            )}
            <span
              style={{
                fontSize: 14,
                color: "#b0b0b0",
                fontWeight: 500,
              }}
            >
              {data.owner.name}
            </span>
          </div>

          {/* Large serif title */}
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
            {lookName}
          </span>

          {/* Item count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 20,
              position: "relative",
            }}
          >
            <span
              style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a" }}
            >
              {data.item_count}
            </span>
            <span style={{ fontSize: 15, color: "#b0b0b0" }}>
              {data.item_count === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Bottom branding */}
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

  // ─── With look image: split layout ───
  const titleSize = nameLen > 50 ? 30 : nameLen > 30 ? 36 : 44;

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
        {/* ─── LEFT: Look Image ─── */}
        <div
          style={{
            width: "45%",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lookImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Fade edge */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 80,
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.6))",
            }}
          />
        </div>

        {/* ─── RIGHT: Look Info ─── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "44px 48px 44px 36px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Warm glow */}
          <div
            style={{
              position: "absolute",
              right: -100,
              top: "50%",
              transform: "translateY(-50%)",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(240,230,215,0.25) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Top: Styled by */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#b0b0b0",
                letterSpacing: "0.18em",
              }}
            >
              STYLED BY
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {data.owner.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sanitizeImageUrl(data.owner.avatar_url) || ""}
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
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#0a0a0a",
                    }}
                  >
                    {data.owner.name.charAt(0)}
                  </span>
                </div>
              )}
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#0a0a0a",
                }}
              >
                {data.owner.name}
              </span>
            </div>
          </div>

          {/* Middle: Look name + tags */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
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
              {lookName}
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 100,
                  background: "#fafafa",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0a0a0a",
                  }}
                >
                  {data.item_count}
                </span>
                <span style={{ fontSize: 13, color: "#b0b0b0" }}>
                  {data.item_count === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Occasion tags */}
              {data.occasion_tags &&
                data.occasion_tags.slice(0, 2).map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 100,
                      background: "#fafafa",
                      border: "1px solid rgba(0,0,0,0.04)",
                      fontSize: 12,
                      color: "#737373",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom: Ravel branding */}
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
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#b0b0b0",
              }}
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
