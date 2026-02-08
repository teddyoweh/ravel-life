import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ravel — Curate Your Style";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(240,230,215,0.4) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        {/* Decorative floating shapes */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 120,
            width: 48,
            height: 64,
            borderRadius: 16,
            background: "#f0ebe4",
            transform: "rotate(-6deg)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 140,
            width: 64,
            height: 48,
            borderRadius: 16,
            background: "#f0e4eb",
            transform: "rotate(4deg)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 180,
            width: 56,
            height: 44,
            borderRadius: 12,
            background: "#e4ebf0",
            transform: "rotate(-3deg)",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 140,
            right: 160,
            width: 44,
            height: 56,
            borderRadius: 14,
            background: "#ede5db",
            transform: "rotate(5deg)",
            opacity: 0.5,
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ravel.life/core.png"
            alt=""
            style={{ width: 40, height: 40, borderRadius: 10 }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-0.02em",
            }}
          >
            Ravel
          </span>
        </div>

        {/* Headline — editorial serif */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: "#0a0a0a",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            Style, curated.
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 20,
            color: "#737373",
            marginTop: 28,
            maxWidth: 500,
            textAlign: "center",
            lineHeight: 1.5,
            position: "relative",
          }}
        >
          Save your favorite pieces. Build collections. Share your aesthetic.
        </span>

        {/* Bottom branding */}
        <span
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 14,
            fontWeight: 600,
            color: "#b0b0b0",
          }}
        >
          ravel.life
        </span>
      </div>
    ),
    { ...size }
  );
}
