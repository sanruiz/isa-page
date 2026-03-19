"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Painting } from "@/types";

interface LightboxProps {
  /** The painting to display in the lightbox (null = closed) */
  painting: Painting | null;
  /** Callback to close the lightbox */
  onClose: () => void;
}

/**
 * Lightbox modal for displaying painting details
 * Client Component - handles modal state and interactions
 */
export default function Lightbox({ painting, onClose }: LightboxProps) {
  // Derive isOpen from painting - single source of truth
  const isOpen = painting !== null;

  // Handle escape key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !painting) return null;

  const { title, series, medium, size, color, accent, image } = painting;

  return (
    <div
      className={cn("lightbox-backdrop", isOpen && "open")}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Painting: ${title}`}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image container */}
        <div className="lightbox-image-container">
          {/* Image */}
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              style={{ objectFit: "contain" }}
              priority
            />
          ) : (
            /* Gradient background - fallback when no image */
            <div
              className="lightbox-swatch"
              style={{
                background: `radial-gradient(ellipse at 40% 40%, ${color} 0%, ${accent}55 100%)`,
              }}
            />
          )}
        </div>

        {/* Info panel */}
        <div className="lightbox-info">
          <div className="lightbox-series">{series}</div>
          <div className="lightbox-title">{title}</div>
          <div className="lightbox-meta">
            {medium} · {size}
          </div>
        </div>
      </div>
    </div>
  );
}
