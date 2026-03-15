/**
 * About section with artist bio and details
 * Server Component - static content
 */
export default function AboutSection() {
  return (
    <section id="about" className="about-strip">
      <div className="about-label">
        The
        <br />
        <em>Artist</em>
      </div>
      <div>
        <p className="about-body">
          <strong>Isabella Ramírez</strong> is a visual artist working primarily
          in oil on canvas and wood, exploring the beauty found in flowers,
          birds, and the quiet moments that live in memory. Her series —{" "}
          <em>Pensamientos</em>, <em>En la Memoria</em>, and <em>Botanica</em> —
          weave together botany and emotion with a painter&apos;s precision and
          a poet&apos;s eye.
        </p>
        <div className="about-details">
          <div>
            <div className="about-detail-label">Medium</div>
            <div className="about-detail-value">Oil on Canvas & Wood</div>
          </div>
          <div>
            <div className="about-detail-label">Style</div>
            <div className="about-detail-value">Botanical Realism</div>
          </div>
          <div>
            <div className="about-detail-label">Based in</div>
            <div className="about-detail-value">Canada</div>
          </div>
        </div>
      </div>
    </section>
  );
}
