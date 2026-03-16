import Image from "next/image";

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
          Painting the quiet intensity of flowers, memory, and the natural world
          — one brushstroke at a time.
        </p>
        <a href="#gallery" className="hero-cta fade-up fade-up-4">
          Explore Works <span className="hero-cta-arrow">→</span>
        </a>
      </div>

      <div className="hero-right">
        <div className="hero-mosaic">
          <div
            className="mosaic-cell"
            style={{
              background: `linear-gradient(135deg, #e8702a 0%, #c03020 40%, #8040a0 100%)`,
            }}
          >
            <Image
              src="/hero/hero1.jpeg"
              alt="Isabella Ramírez artwork"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="mosaic-cell">
            <Image
              src="/hero/hero2.jpeg"
              alt="Isabella Ramírez artwork"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, rgba(196, 127, 192, 0.8) 0%, rgba(128, 64, 160, 0.8) 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <Image
              src="/hero/hero3.jpg"
              alt="Isabella Ramírez artwork"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, rgba(240, 192, 64, 0.8) 0%, rgba(200, 144, 42, 0.8) 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <Image
              src="/hero/hero5.jpg"
              alt="Isabella Ramírez artwork"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, rgba(80, 136, 80, 0.8) 0%, rgba(42, 90, 42, 0.8) 100%)`,
              }}
            />
          </div>
          <div className="mosaic-cell">
            <Image
              src="/hero/hero4.jpg"
              alt="Isabella Ramírez artwork"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div
              className="mosaic-bg"
              style={{
                background: `linear-gradient(135deg, rgba(232, 160, 160, 0.8) 0%, rgba(192, 80, 96, 0.8) 100%)`,
              }}
            />
          </div>
        </div>
        <div className="hero-stat-bar">
          <div className="hero-stat">
            <div className="hero-stat-num">30+</div>
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
