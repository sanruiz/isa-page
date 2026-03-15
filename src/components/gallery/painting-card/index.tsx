import Image from "next/image";
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
  const { title, series, medium, size, color, accent, image } = painting;

  return (
    <div className={`painting-card${isWide ? " wide" : ""}`}>
      {/* Gradient background - always visible as placeholder/loading state */}
      <div
        className="painting-swatch"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, ${color} 0%, ${accent}55 100%)`,
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
      {/* Image loads on top of gradient */}
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            isWide
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
          className="object-cover"
        />
      )}
      <div className="painting-overlay">
        <div className="painting-series">{series}</div>
        <div className="painting-name">{title}</div>
        <div className="painting-meta">
          {medium} · {size}
        </div>
      </div>
    </div>
  );
}
