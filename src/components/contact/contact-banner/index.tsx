interface ContactBannerProps {
  /** Email address for contact link */
  email?: string;
  /** Instagram URL */
  instagram?: string;
}

/**
 * Contact call-to-action banner
 * Server Component - static content with optional email and social links
 */
export default function ContactBanner({
  email = "info@isaartstudio.com",
  instagram = "https://www.instagram.com/artsalyy/",
}: ContactBannerProps) {
  return (
    <div id="contact" className="contact-banner">
      <div className="contact-text">
        Interested in a work or
        <br />
        <em>commission?</em>
      </div>
      <div className="contact-links">
        <a href={`mailto:${email}`} className="contact-btn">
          Get in Touch →
        </a>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          @artsalyy
        </a>
      </div>
    </div>
  );
}
