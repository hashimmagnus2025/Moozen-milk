import { ImageResponse } from "next/og";

export const alt = "Moozen — Pure Dairy, Honestly Made";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#1B2F1E",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(92,138,92,0.35), transparent 55%), radial-gradient(circle at 80% 75%, rgba(232,163,76,0.25), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 130,
            fontStyle: "italic",
            color: "#FBF6EE",
            letterSpacing: "-2px",
          }}
        >
          Moozen
        </div>
        <div style={{ display: "flex", width: 120, height: 3, backgroundColor: "#E8A34C", marginTop: 28 }} />
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "rgba(251,246,238,0.75)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Pure Dairy, Honestly Made
        </div>
      </div>
    ),
    { ...size }
  );
}
