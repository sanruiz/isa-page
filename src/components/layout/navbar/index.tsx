"use client";

import { useState, useEffect, useRef } from "react";

interface NavbarProps {
  /** Override scroll detection with a fixed value */
  scrolled?: boolean;
}

/**
 * Fixed navigation bar with scroll-aware styling
 * Client Component - uses scroll event listener
 */
export default function Navbar({ scrolled: scrolledProp }: NavbarProps) {
  const [scrolled, setScrolled] = useState(scrolledProp ?? false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const handleNavigationClick = () => {
    setIsMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  useEffect(() => {
    if (scrolledProp !== undefined) return;

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolledProp]);

  return (
    <nav className={scrolled ? "scrolled" : ""} aria-label="Main navigation">
      <a href="#" className="nav-logo">
        Isabella Ramírez
      </a>
      <button
        ref={menuToggleRef}
        type="button"
        className="nav-menu-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation-links"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
      </button>
      <ul
        id="primary-navigation-links"
        className={`nav-links${isMenuOpen ? " open" : ""}`}
      >
        <li>
          <a href="#gallery" onClick={handleNavigationClick}>
            Works
          </a>
        </li>
        <li>
          <a href="#about" onClick={handleNavigationClick}>
            About
          </a>
        </li>
        <li>
          <a href="#contact" onClick={handleNavigationClick}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
