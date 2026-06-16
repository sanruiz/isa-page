"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import PaintingCard from "@/components/gallery/painting-card";
import Lightbox from "@/components/gallery/lightbox";
import type { Painting } from "@/types";

/** Filter options for artwork availability */
type AvailabilityFilter = "All" | "Available" | "Sold";

/** Availability filter options with labels */
const AVAILABILITY_OPTIONS: { value: AvailabilityFilter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Available", label: "Available" },
  { value: "Sold", label: "Sold" },
];

interface GalleryClientProps {
  /** Artworks fetched from the API */
  artworks: Painting[];
  /** Available series for filtering */
  series: string[];
}

/**
 * Gallery client component with filtering and lightbox
 * Client Component - handles filter state and lightbox interactions
 */
export default function GalleryClient({
  artworks,
  series,
}: GalleryClientProps) {
  const [activeSeries, setActiveSeries] = useState("All");
  const [activeAvailability, setActiveAvailability] =
    useState<AvailabilityFilter>("All");
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null,
  );

  /**
   * Filter artworks by series and availability.
   * Both filters are applied in combination.
   */
  const filtered = useMemo(() => {
    let result = artworks;

    if (activeSeries !== "All") {
      result = result.filter((p) => p.series === activeSeries);
    }

    if (activeAvailability === "Sold") {
      result = result.filter((p) => p.sold === true);
    } else if (activeAvailability === "Available") {
      result = result.filter((p) => !p.sold);
    }

    return result;
  }, [artworks, activeSeries, activeAvailability]);

  const handlePaintingClick = (painting: Painting) => {
    setSelectedPainting(painting);
  };

  const handleCloseLightbox = () => {
    setSelectedPainting(null);
  };

  const handleNavigatePainting = (painting: Painting) => {
    setSelectedPainting(painting);
  };

  return (
    <>
      <div className="gallery-header">
        <h2 className="gallery-title">Portfolio</h2>
        <div className="gallery-filters">
          <div className="filter-tabs">
            {series.map((s) => (
              <button
                key={s}
                className={cn("filter-tab", activeSeries === s && "active")}
                onClick={() => setActiveSeries(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="filter-divider" aria-hidden="true" />
          <div className="filter-tabs">
            {AVAILABILITY_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                className={cn(
                  "filter-tab",
                  activeAvailability === value && "active",
                )}
                onClick={() => setActiveAvailability(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gallery-grid">
        {filtered.map((p) => (
          <PaintingCard
            key={p.id}
            painting={p}
            onClick={() => handlePaintingClick(p)}
          />
        ))}
      </div>

      <Lightbox
        painting={selectedPainting}
        allPaintings={filtered}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigatePainting}
      />
    </>
  );
}
