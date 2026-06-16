import type { GalleryImage } from "@/lib/api/types";

/**
 * Represents a painting artwork in the gallery
 */
export interface Painting {
  /** Unique identifier for the painting */
  id: number;
  /** Title of the artwork */
  title: string;
  /** URL-friendly slug */
  slug?: string;
  /** Series the painting belongs to */
  series: string;
  /** Dimensions of the painting (e.g., "16×20 in") */
  size: string;
  /** Medium used (e.g., "Oil on canvas") */
  medium: string;
  /** Price (null if not set) */
  price?: number | null;
  /** Whether the artwork has been sold */
  sold?: boolean;
  /** Creation date */
  artworkDate?: string;
  /** Primary background color (hex) - used as fallback when no image */
  color: string;
  /** Accent color (hex) */
  accent: string;
  /** Path or URL to painting image */
  image?: string | null;
  /** Additional gallery images */
  galleryImages?: GalleryImage[];
  /** Aspect ratio: "square" (default), "landscape", or "portrait" */
  aspect?: "square" | "landscape" | "portrait";
}
