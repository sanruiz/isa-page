import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Painting } from "@/types";

interface PaintingCardProps {
  /** Painting data to display */
  painting: Painting;
  /** Whether to span two columns (legacy, use aspect instead) */
  isWide?: boolean;
  /** Click handler for opening lightbox */
  onClick?: () => void;
}

/**
 * Individual painting card with hover overlay
 * Server Component - CSS handles hover states
 */
export default function PaintingCard({
  painting,
  isWide = false,
  onClick,
}: PaintingCardProps) {
  const { title, series, medium, size, color, accent, image, aspect } =
    painting;

  // Determine CSS class based on aspect ratio
  const aspectClass =
    aspect === "landscape"
      ? "landscape"
      : aspect === "portrait"
        ? "portrait"
        : isWide
          ? "wide"
          : "";

  return (
    <div
      className={cn("painting-card", aspectClass)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
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
            aspect === "landscape" || isWide
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
