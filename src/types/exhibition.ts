/**
 * Represents an art exhibition entry
 */
export interface Exhibition {
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
  /** Whether the exhibition is upcoming (optional, calculated dynamically) */
  isUpcoming?: boolean;
}
