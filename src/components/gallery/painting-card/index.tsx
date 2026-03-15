import type { Painting } from "@/types";

interface PaintingCardProps {
  /** Painting data to display */
  painting: Painting;
  /** Whether to span two columns */
  isWide?: boolean;
}

/**
 * Individual painting card with hover overlay
 * Server Component - CSS handles hover states
 */
export default function PaintingCard({
  painting,
  isWide = false,
}: PaintingCardProps) {
  return (
    <div className={`painting-card${isWide ? " wide" : ""}`}>
      <div
        className="painting-swatch"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, ${painting.color} 0%, ${painting.accent}55 100%)`,
        }}
      />
      {/* Texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.05)'/%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
        }}
      />
      <div className="painting-overlay">
        <div className="painting-series">{painting.series}</div>
        <div className="painting-name">{painting.title}</div>
        <div className="painting-meta">
          {painting.medium} · {painting.size}
        </div>
      </div>
    </div>
  );
}
