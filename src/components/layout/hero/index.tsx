/**
 * Hero section with artist intro and color mosaic
 * Server Component - no interactivity needed
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow fade-up fade-up-1">
          Visual Artist · Oil on Canvas
        </p>
        <h1 className="hero-title fade-up fade-up-2">
          Isabella
          <br />
          <em>Ramírez</em>
        </h1>
        <p className="hero-subtitle fade-up fade-up-3">
          Painting the quiet intensity of flowers, memory, and the natural
          world — one brushstroke at a time.
        </p>
        <a href="#gallery" className="hero-cta fade-up fade-up-4">
          Explore Works <span className="hero-cta-arrow">→</span>
        </a>
      </div>

      <div className="hero-right">
        <div className="hero-mosaic">
          <div className="mosaic-cell">
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, #e8702a 0%, #c03020 40%, #8040a0 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, #c47fc0 0%, #8040a0 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, #f0c040 0%, #c8902a 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, #508850 0%, #2a5a2a 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, #e8a0a0 0%, #c05060 100%)`,
              }}
            />
          </div>
        </div>
        <div className="hero-stat-bar">
          <div className="hero-stat">
            <div className="hero-stat-num">14+</div>
            <div className="hero-stat-label">Works</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">4</div>
            <div className="hero-stat-label">Series</div>
          </div>
        </div>
      </div>
    </section>
  );
}
