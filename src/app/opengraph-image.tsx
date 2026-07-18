import { ImageResponse } from "next/og";

export const alt = "Zayd Krunz — Student, Programmer, Builder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#000000",
        color: "#f0f0f0",
        display: "flex",
        fontFamily: "monospace",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid #1a1a1a",
          display: "flex",
          inset: 30,
          position: "absolute",
        }}
      />
      <div
        style={{
          background: "#4a90e2",
          display: "flex",
          height: 2,
          left: 30,
          position: "absolute",
          right: 700,
          top: 30,
        }}
      />
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "0 96px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#4a90e2",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          ZAYDKRUNZ.COM
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -5,
            lineHeight: 1,
          }}
        >
          Zayd Krunz
        </div>
        <div
          style={{
            color: "#8a8f98",
            display: "flex",
            fontSize: 30,
            letterSpacing: 1,
          }}
        >
          STUDENT
          <span style={{ color: "#4a4d53" }}>&nbsp;&nbsp;//&nbsp;&nbsp;</span>
          PROGRAMMER
          <span style={{ color: "#4a4d53" }}>&nbsp;&nbsp;//&nbsp;&nbsp;</span>
          BUILDER
        </div>
      </div>
    </div>,
    size,
  );
}
