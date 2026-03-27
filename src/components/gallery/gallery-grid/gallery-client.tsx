"use client";

import { useState } from "react";
import PaintingCard from "@/components/gallery/painting-card";
import Lightbox from "@/components/gallery/lightbox";
import type { Painting } from "@/types";

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
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null,
  );

  const filtered =
    activeSeries === "All"
      ? artworks
      : artworks.filter((p) => p.series === activeSeries);

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
        <div className="filter-tabs">
          {series.map((s) => (
            <button
              key={s}
              className={`filter-tab ${activeSeries === s ? "active" : ""}`}
              onClick={() => setActiveSeries(s)}
            >
              {s}
            </button>
          ))}
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
