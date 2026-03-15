
/**
 * Exhibitions section displaying career exhibitions timeline
 * Server Component - static content
 */


import { exhibitions } from "@/constants";

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
        {exhibitions.map((exhibition, index) => {
                  const now = new Date();
                  const currentMonth = now.getMonth();
                  const currentYear = now.getFullYear();

                  const monthIndex = new Date(`${exhibition.month} 1, 2000`).getMonth();
                  const exhibitionYear = Number(exhibition.year);

                  const isUpcoming =
                    exhibitionYear > currentYear ||
                    (exhibitionYear === currentYear && monthIndex >= currentMonth);

                  return (
                    <article key={index} className="exhibition-card">
                      <div className="exhibition-date">
                        <span className="exhibition-month">{exhibition.month}</span>
                        <span className="exhibition-year">{exhibition.year}</span>
                      </div>
                      <div className="exhibition-content">
                        <h3 className="exhibition-name">&ldquo;{exhibition.title}&rdquo;</h3>
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
