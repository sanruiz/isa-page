/**
 * Site footer with artist name and copyright
 * Server Component - static content
 */
export default function Footer() {
  return (
    <footer>
      <div className="footer-name">Isabella Ramírez · Visual Artist</div>
      <div className="footer-copy">
        © {new Date().getFullYear()} All rights reserved
      </div>
    </footer>
  );
}
