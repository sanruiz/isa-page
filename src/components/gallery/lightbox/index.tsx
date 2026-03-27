"use client";

import { useEffect, useCallback, useState, useTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { wordpressImageLoader } from "@/lib/image-loader";
import type { Painting } from "@/types";

interface LightboxProps {
  /** The painting to display in the lightbox (null = closed) */
  painting: Painting | null;
  /** All paintings for navigation between artworks */
  allPaintings?: Painting[];
  /** Callback to close the lightbox */
  onClose: () => void;
  /** Callback when navigating to a different painting */
  onNavigate?: (painting: Painting) => void;
}

/**
 * Lightbox modal for displaying painting details with gallery navigation
 * Client Component - handles modal state and interactions
 */
export default function Lightbox({
  painting,
  allPaintings = [],
  onClose,
  onNavigate,
}: LightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [prevPaintingId, setPrevPaintingId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  // Derive isOpen from painting - single source of truth
  const isOpen = painting !== null;

  // Find current painting index in the full list
  const currentPaintingIndex = painting
    ? allPaintings.findIndex((p) => p.id === painting.id)
    : -1;
  const canNavigatePaintings =
    allPaintings.length > 1 && currentPaintingIndex !== -1;

  // Reset state when painting changes (pattern: storing previous props in state)
  // This is React's recommended approach for "adjusting state based on props"
  // See: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const paintingId = painting?.id ?? null;
  if (paintingId !== prevPaintingId) {
    setPrevPaintingId(paintingId);
    setCurrentImageIndex(0);
    setLoadedImages(new Set());
  }

  // Build array of all images (featured + gallery)
  const allImages = painting
    ? ([
        painting.image,
        ...(painting.galleryImages?.map((img) => img.sourceUrl) ?? []),
      ].filter(Boolean) as string[])
    : [];

  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[currentImageIndex] ?? painting?.image;
  const isImageLoading = currentImage ? !loadedImages.has(currentImage) : false;

  // Get adjacent paintings for preloading
  const getAdjacentPaintings = useCallback(() => {
    if (!canNavigatePaintings || allPaintings.length < 2) return [];
    const prevIndex =
      (currentPaintingIndex - 1 + allPaintings.length) % allPaintings.length;
    const nextIndex = (currentPaintingIndex + 1) % allPaintings.length;
    return [allPaintings[prevIndex], allPaintings[nextIndex]].filter(Boolean);
  }, [canNavigatePaintings, currentPaintingIndex, allPaintings]);

  // Preload adjacent paintings' images
  useEffect(() => {
    if (!isOpen) return;

    const adjacentPaintings = getAdjacentPaintings();
    adjacentPaintings.forEach((p) => {
      if (p.image) {
        const img = new window.Image();
        // Use the same loader to preload the optimized version
        img.src = wordpressImageLoader({
          src: p.image,
          width: 1600,
          quality: 80,
        });
      }
    });
  }, [isOpen, getAdjacentPaintings]);

  const handleImageLoad = useCallback(() => {
    if (currentImage) {
      startTransition(() => {
        setLoadedImages((prev) => new Set(prev).add(currentImage));
      });
    }
  }, [currentImage]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  // Navigate to previous/next painting in the gallery
  const goToPreviousPainting = useCallback(() => {
    if (!canNavigatePaintings || !onNavigate) return;
    const prevIndex =
      (currentPaintingIndex - 1 + allPaintings.length) % allPaintings.length;
    onNavigate(allPaintings[prevIndex]);
  }, [canNavigatePaintings, currentPaintingIndex, allPaintings, onNavigate]);

  const goToNextPainting = useCallback(() => {
    if (!canNavigatePaintings || !onNavigate) return;
    const nextIndex = (currentPaintingIndex + 1) % allPaintings.length;
    onNavigate(allPaintings[nextIndex]);
  }, [canNavigatePaintings, currentPaintingIndex, allPaintings, onNavigate]);

  // Handle escape key to close and arrow keys for navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      // Arrow keys navigate between paintings (main navigation)
      if (e.key === "ArrowRight") {
        if (canNavigatePaintings) {
          goToNextPainting();
        } else if (hasMultipleImages) {
          goToNext();
        }
      }
      if (e.key === "ArrowLeft") {
        if (canNavigatePaintings) {
          goToPreviousPainting();
        } else if (hasMultipleImages) {
          goToPrevious();
        }
      }
    },
    [
      onClose,
      canNavigatePaintings,
      hasMultipleImages,
      goToNext,
      goToPrevious,
      goToNextPainting,
      goToPreviousPainting,
    ],
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

  const { title, series, medium, size, color, accent } = painting;

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

        {/* Navigation buttons - navigate between paintings or images */}
        {(canNavigatePaintings || hasMultipleImages) && (
          <>
            <button
              className="lightbox-nav lightbox-nav-prev"
              onClick={
                canNavigatePaintings ? goToPreviousPainting : goToPrevious
              }
              aria-label={
                canNavigatePaintings ? "Previous painting" : "Previous image"
              }
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
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="lightbox-nav lightbox-nav-next"
              onClick={canNavigatePaintings ? goToNextPainting : goToNext}
              aria-label={canNavigatePaintings ? "Next painting" : "Next image"}
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
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Image container */}
        <div className="lightbox-image-container">
          {/* Loading spinner */}
          {isImageLoading && currentImage && (
            <div className="lightbox-loader">
              <div className="lightbox-spinner" />
            </div>
          )}

          {/* Full quality image */}
          {currentImage ? (
            <Image
              src={currentImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              style={{
                objectFit: "contain",
              }}
              priority
              loader={wordpressImageLoader}
              onLoad={handleImageLoad}
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

        {/* Painting counter - shows position in gallery */}
        {canNavigatePaintings && (
          <div className="lightbox-counter">
            {currentPaintingIndex + 1} / {allPaintings.length}
          </div>
        )}

        {/* Image counter - shows position within single painting's images */}
        {!canNavigatePaintings && hasMultipleImages && (
          <div className="lightbox-counter">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}

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
