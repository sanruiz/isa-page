"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (scrolledProp !== undefined) return;

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolledProp]);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">
        Isabella Ramírez
      </a>
      <ul className="nav-links">
        <li>
          <a href="#gallery">Works</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
