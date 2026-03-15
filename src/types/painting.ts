/**
 * Represents a painting artwork in the gallery
 */
export interface Painting {
  /** Unique identifier for the painting */
  id: number;
  /** Title of the artwork */
  title: string;
  /** Series the painting belongs to */
  series: string;
  /** Dimensions of the painting (e.g., "16×20 in") */
  size: string;
  /** Medium used (e.g., "Oil on canvas") */
  medium: string;
  /** Primary background color (hex) */
  color: string;
  /** Accent color (hex) */
  accent: string;
}
