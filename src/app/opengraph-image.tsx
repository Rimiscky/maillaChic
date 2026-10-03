import { ImageResponse } from "next/og";

export const alt = "Maila Chic - La première collection se dessine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f2eee6", color: "#241f1b", position: "relative", padding: "72px", fontFamily: "Georgia, serif" }}>
      <div style={{ width: "58%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 34, lineHeight: .8 }}><span>Maila</span><span style={{ marginLeft: 28, color: "#a5523d", fontStyle: "italic" }}>Chic</span></div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Arial, sans-serif", fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#713325" }}>Préouverture</span><span style={{ maxWidth: 650, marginTop: 22, fontSize: 76, lineHeight: .92, letterSpacing: -4 }}>La première collection se dessine.</span></div>
      </div>
      <div style={{ width: "42%", display: "flex", alignItems: "center", justifyContent: "center", background: "#844330", color: "rgba(250,247,240,.72)", fontSize: 160, fontStyle: "italic" }}>MC</div>
    </div>,
    size,
  );
}
