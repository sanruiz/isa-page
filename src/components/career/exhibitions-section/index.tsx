/**
 * Exhibitions section displaying career exhibitions timeline
 * Server Component - fetches exhibitions from the GraphQL API
 */

import { getExhibitions } from "@/lib/api";
import type { Exhibition } from "@/types";

export default async function ExhibitionsSection() {
  let exhibitions: Exhibition[] = [];
  let error: string | null = null;

  try {
    exhibitions = await getExhibitions();
  } catch (err) {
    console.error("Failed to fetch exhibitions:", err);
    error = "Unable to load exhibitions. Please try again later.";
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  if (error) {
    return (
      <section id="exhibitions" className="exhibitions-section">
        <div className="exhibitions-header">
          <span className="exhibitions-eyebrow">Career</span>
          <h2 className="exhibitions-title">
            <em>Exhibitions</em>
          </h2>
        </div>
        <div
          className="exhibitions-error"
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "var(--ink)",
            opacity: 0.6,
            fontStyle: "italic",
          }}
        >
          <p>{error}</p>
        </div>
      </section>
    );
  }

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
          const parsedMonth = exhibition.month
            ? new Date(`${exhibition.month} 1, 2000`)
            : null;
          const isUpcoming =
            parsedMonth !== null &&
            !Number.isNaN(parsedMonth.getTime()) &&
            (exhibition.year > currentYear ||
              (exhibition.year === currentYear &&
                parsedMonth.getMonth() >= currentMonth));

          return (
            <article key={exhibition.id ?? index} className="exhibition-card">
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

                {isUpcoming && (
                  <span className="exhibition-badge">Upcoming</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
