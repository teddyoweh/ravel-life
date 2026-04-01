import { ImageResponse } from "next/og";
import { API_BASE, sanitizeImageUrl } from "@/lib/api";

export const runtime = "edge";
export const alt = "Profile Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface UserProfile {
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  collections: { id: string; name: string; cover_image_url: string | null }[];
}

async function getUserProfile(username: string): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/users/public/${username}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  const username = rawUsername.startsWith("%40")
    ? rawUsername.slice(3)
    : rawUsername.startsWith("@")
      ? rawUsername.slice(1)
      : rawUsername;

  const user = await getUserProfile(username);

  if (!user) {
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
            User not found
          </span>
        </div>
      ),
      { ...size }
    );
  }

  const avatarUrl = sanitizeImageUrl(user.avatar_url);
  const collectionCovers = user.collections
    .map((c) => sanitizeImageUrl(c.cover_image_url))
    .filter(Boolean)
    .slice(0, 3) as string[];

  const nameLen = user.display_name.length;
  const titleSize = nameLen > 20 ? 48 : 64;

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
        {/* Warm ambient glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(240,230,215,0.45) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Avatar */}
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              border: "4px solid white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              objectFit: "cover",
              position: "relative",
            }}
          />
        ) : (
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              background: "#f0ebe4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 600,
                color: "#0a0a0a",
              }}
            >
              {user.display_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Name */}
        <span
          style={{
            fontSize: titleSize,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: "#0a0a0a",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginTop: 20,
            position: "relative",
          }}
        >
          {user.display_name}
        </span>

        {/* Username */}
        <span
          style={{
            fontSize: 16,
            color: "#b0b0b0",
            marginTop: 8,
            position: "relative",
          }}
        >
          @{user.username}
        </span>

        {/* Collection count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
            padding: "6px 16px",
            borderRadius: 100,
            background: "#fafafa",
            border: "1px solid rgba(0,0,0,0.04)",
            position: "relative",
          }}
        >
          <span
            style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}
          >
            {user.collections.length}
          </span>
          <span style={{ fontSize: 14, color: "#b0b0b0" }}>
            {user.collections.length === 1 ? "collection" : "collections"}
          </span>
        </div>

        {/* Collection preview strip */}
        {collectionCovers.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 24,
              position: "relative",
            }}
          >
            {collectionCovers.map((url, i) => (
              <div
                key={i}
                style={{
                  width: 100,
                  height: 75,
                  borderRadius: 12,
                  overflow: "hidden",
                  display: "flex",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Branding */}
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
