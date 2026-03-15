interface ContactBannerProps {
  /** Email address for contact link */
  email?: string;
}

/**
 * Contact call-to-action banner
 * Server Component - static content with optional email
 */
export default function ContactBanner({
  email = "hello@isabellaramirez.art",
}: ContactBannerProps) {
  return (
    <div id="contact" className="contact-banner">
      <div className="contact-text">
        Interested in a work or
        <br />
        <em>commission?</em>
      </div>
      <a href={`mailto:${email}`} className="contact-btn">
        Get in Touch →
      </a>
    </div>
  );
}
