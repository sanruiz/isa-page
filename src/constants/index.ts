export * from "./paintings";

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

export const exhibitions: Exhibition[] = [
  {
    year: 2026,
    month: "Aug",
    title: "Then, Now and Again",
    venue: "Gagne Contemporary",
    location: "Toronto, ON, Canada",
    isUpcoming: true,
  },
  {
    year: 2026,
    month: "Jul",
    title: "Solo show",
    venue: "Remote Gallery",
    location: "Toronto, ON, Canada",
    isUpcoming: true,
  },

  {
    year: 2026,
    month: "Mar",
    title: "Artist Project Fair",
    venue: "Better Living Centre",
    location: "Toronto, ON, Canada",
    isUpcoming: true,
  },
  {
    year: 2025,
    month: "",
    title: "GradEx",
    venue: "OCAD University",
    location: "Toronto, ON, Canada",
  },
  {
    year: 2024,
    month: "",
    title: "Bridging Homes",
    venue: "The Great Hall, 100 McCaul St",
    location: "Toronto, ON, Canada",
  },
  {
    year: 2024,
    month: "",
    title: "we are what we are because we have been what we have been",
    venue: "The Ada Slaight Gallery",
    location: "Toronto, ON, Canada",
  },
  {
    year: 2022,
    month: "",
    title: "Self Portrait show",
    venue: "OCAD University",
    location: "Toronto, ON, Canada",
  },
];