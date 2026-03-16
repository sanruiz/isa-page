"use client";

import { useState } from "react";
import { paintings, series } from "@/constants/paintings";
import PaintingCard from "@/components/gallery/painting-card";

/**
 * Gallery section with filterable painting grid
 * Client Component - uses filter state
 */
export default function Gallery() {
  const [activeSeries, setActiveSeries] = useState("All");

  const filtered =
    activeSeries === "All"
      ? paintings
      : paintings.filter((p) => p.series === activeSeries);

  return (
    <section id="gallery">
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
          <PaintingCard key={p.id} painting={p} />
        ))}
      </div>
    </section>
  );
}
