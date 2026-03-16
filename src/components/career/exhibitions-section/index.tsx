/**
 * Exhibitions section displaying career exhibitions timeline
 * Server Component - static content
 */

import { exhibitions } from "@/constants";
import UpcomingBadgeClient from "./upcoming-badge-client";
import type { Exhibition } from "@/types";

export default function ExhibitionsSection() {
  return (
    <section id="exhibitions" className="exhibitions-section">
      <div className="exhibitions-header">
        <span className="exhibitions-eyebrow">Career</span>
        <h2 className="exhibitions-title">
          <em>Exhibitions</em>
        </h2>
      </div>
      <div className="exhibitions-grid">
        {exhibitions.map((exhibition: Exhibition, index) => {
          // Use the stable, developer-provided `isUpcoming` flag for SSR output.
          // If `isUpcoming` is undefined, defer the time-based computation to the
          // client-only component to avoid SSR/CSR hydration mismatches.
          const { isUpcoming } = exhibition;

          return (
            <article key={index} className="exhibition-card">
              <div className="exhibition-date">
                <span className="exhibition-month">{exhibition.month}</span>
                <span className="exhibition-year">{exhibition.year}</span>
              </div>
              <div className="exhibition-content">
                <h3 className="exhibition-name">
                  &ldquo;{exhibition.title}&rdquo;
                </h3>
                <p className="exhibition-venue">
                  {exhibition.venue} · {exhibition.location}
                </p>

                {isUpcoming ? (
                  // Stable server-rendered badge when data explicitly marks it upcoming
                  <span className="exhibition-badge">Upcoming</span>
                ) : exhibition.isUpcoming === undefined ? (
                  // Defer dynamic, time-based decision to a client-only component
                  <UpcomingBadgeClient
                    year={exhibition.year}
                    month={exhibition.month}
                  />
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
