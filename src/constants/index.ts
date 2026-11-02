import type { Exhibition } from "@/types";

// Re-export types for backward compatibility
export type { Painting, Exhibition } from "@/types";

export const exhibitions: Exhibition[] = [
  {
    year: 2026,
    month: "Aug",
    title: "Then, Now and Again",
    venue: "Gagne Contemporary",
    location: "Toronto, ON, Canada",
  },
  {
    year: 2026,
    month: "Jul",
    title: "Solo show",
    venue: "Remote Gallery",
    location: "Toronto, ON, Canada",
  },

  {
    year: 2026,
    month: "Mar",
    title: "Artist Project Fair",
    venue: "Better Living Centre",
    location: "Toronto, ON, Canada",
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
