import type { GalleryImage } from "@/lib/api/types";

/**
 * Represents an art exhibition entry
 */
export interface Exhibition {
  /** WordPress database ID (present when sourced from the CMS) */
  id?: number;
  /** URL-friendly slug (present when sourced from the CMS) */
  slug?: string;
  /** Year of the exhibition */
  year: number;
  /** Month abbreviation (e.g., "Aug", "Mar") or empty string if unknown */
  month: string;
  /** Title of the exhibition */
  title: string;
  /** Venue name and address */
  venue: string;
  /** City, province/state, and country */
  location: string;
  /** Additional gallery images of the exhibition */
  galleryImages?: GalleryImage[];
}
