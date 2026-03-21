/**
 * Artwork API functions
 */

import { graphqlRequest } from "./client";
import type {
  GetArtworksResponse,
  GraphQLArtwork,
  Artwork,
} from "./types";

/** GraphQL query to fetch artworks with pagination */
const GET_ARTWORKS_QUERY = `
  query GetArtworks($first: Int!, $after: String) {
    artworks(first: $first, after: $after) {
      nodes {
        id
        databaseId
        title
        slug
        size
        medium
        price
        artworkDate
        featuredImage {
          node {
            sourceUrl
          }
        }
        galleryImages {
          id
          sourceUrl
          altText
          title
          srcSet
        }
        artworkCategories {
          nodes {
            name
            slug
            link
          }
        }
        allArtworkSeries {
          nodes {
            name
            slug
            link
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/** Default colors for artwork fallbacks */
const DEFAULT_COLORS = [
  { color: "#c47fc0", accent: "#f5e0a0" },
  { color: "#f0a030", accent: "#e05080" },
  { color: "#7ab870", accent: "#3a5020" },
  { color: "#e8702a", accent: "#c03020" },
  { color: "#8040a0", accent: "#f0d050" },
  { color: "#508850", accent: "#f0f0f0" },
];

/**
 * Parse size string and determine aspect ratio
 * @param size - Size string (e.g., "10x23" or "10×23")
 * @returns Aspect ratio type
 */
function parseAspectRatio(size: string): "square" | "landscape" | "portrait" {
  // Handle various separators: x, ×, X
  const parts = size.split(/[x×X]/i).map((s) => parseFloat(s.trim()));

  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
    return "square";
  }

  const [width, height] = parts;
  const ratio = width / height;

  if (ratio > 1.2) return "landscape";
  if (ratio < 0.8) return "portrait";
  return "square";
}

/**
 * Format size string for display
 * @param size - Raw size string (e.g., "10x23")
 * @returns Formatted size (e.g., "10×23 in")
 */
function formatSize(size: string): string {
  if (!size) return "";

  // Replace 'x' with '×' and add 'in' if not present
  const formatted = size.replace(/x/gi, "×");

  if (!formatted.includes("in")) {
    return `${formatted} in`;
  }

  return formatted;
}

/**
 * Transform raw GraphQL artwork to normalized frontend format
 * @param artwork - Raw GraphQL artwork data
 * @param index - Index for color assignment
 * @returns Normalized artwork object
 */
function transformArtwork(artwork: GraphQLArtwork, index: number): Artwork {
  const { databaseId, title, slug, size, medium, price, artworkDate } = artwork;

  // Get colors based on index (cycles through default colors)
  const colorSet = DEFAULT_COLORS[index % DEFAULT_COLORS.length];

  // Get series from first series node or default to "Uncategorized"
  const series =
    artwork.allArtworkSeries.nodes[0]?.name ?? "Uncategorized";

  // Get main image URL
  const image = artwork.featuredImage?.node?.sourceUrl ?? null;

  return {
    id: databaseId,
    title,
    slug,
    series,
    size: formatSize(size),
    medium: medium || "Oil on canvas",
    price: price ? parseFloat(price) : null,
    artworkDate: artworkDate || "",
    image,
    galleryImages: artwork.galleryImages || [],
    color: colorSet.color,
    accent: colorSet.accent,
    aspect: parseAspectRatio(size),
  };
}

/**
 * Fetch a single page of artworks from the GraphQL API
 * @param cursor - Pagination cursor (null for first page)
 * @param pageSize - Number of items per page
 * @returns Response with artworks and pagination info
 */
async function fetchArtworksPage(
  cursor: string | null,
  pageSize: number
): Promise<GetArtworksResponse> {
  return graphqlRequest<GetArtworksResponse>({
    query: GET_ARTWORKS_QUERY,
    variables: {
      first: pageSize,
      after: cursor,
    },
  });
}

/**
 * Fetch all artworks from the GraphQL API with pagination
 * Fetches all pages to ensure no artworks are missed
 * @returns Array of normalized artwork objects
 */
export async function getArtworks(): Promise<Artwork[]> {
  const allArtworks: GraphQLArtwork[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;
  const pageSize = 50;

  // Paginate through all artworks
  while (hasNextPage) {
    const response = await fetchArtworksPage(cursor, pageSize);
    const { nodes, pageInfo } = response.data.artworks;

    allArtworks.push(...nodes);
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return allArtworks.map((artwork, index) => transformArtwork(artwork, index));
}

/**
 * Get unique series (categories) from artworks
 * @param artworks - Array of artworks
 * @returns Array of unique series names with "All" prepended
 */
export function getSeriesFromArtworks(artworks: Artwork[]): string[] {
  const uniqueSeries = [...new Set(artworks.map((a) => a.series))];
  return ["All", ...uniqueSeries.filter((s) => s !== "Uncategorized")];
}
