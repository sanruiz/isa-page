/**
 * Exhibition API functions
 */

import { graphqlRequest } from "./client";
import type { GetExhibitionsResponse, GraphQLExhibition } from "./types";
import type { Exhibition } from "@/types";

/** GraphQL query to fetch exhibitions with pagination */
const GET_EXHIBITIONS_QUERY = `
  query GetExhibitions($first: Int!, $after: String) {
    exhibitions(first: $first, after: $after) {
      nodes {
        id
        databaseId
        title
        slug
        year
        month
        venue
        location
        galleryImages {
          id
          sourceUrl
          altText
          title
          srcSet
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Convert a month abbreviation to its calendar index for sorting
 * @param month - Month abbreviation (e.g., "Aug") or empty string
 * @returns Month index (0-11), or -1 if unknown
 */
function monthToIndex(month: string): number {
  if (!month) return -1;

  const parsed = new Date(`${month} 1, 2000`);
  return Number.isNaN(parsed.getTime()) ? -1 : parsed.getMonth();
}

/**
 * Transform raw GraphQL exhibition to normalized frontend format
 * @param exhibition - Raw GraphQL exhibition data
 * @returns Normalized exhibition object
 */
function transformExhibition(exhibition: GraphQLExhibition): Exhibition {
  const { databaseId, title, slug, year, month, venue, location, galleryImages } =
    exhibition;

  return {
    id: databaseId,
    slug,
    title,
    year,
    month: month || "",
    venue,
    location,
    galleryImages: galleryImages || [],
  };
}

/**
 * Fetch a single page of exhibitions from the GraphQL API
 * @param cursor - Pagination cursor (null for first page)
 * @param pageSize - Number of items per page
 * @returns Response with exhibitions and pagination info
 */
async function fetchExhibitionsPage(
  cursor: string | null,
  pageSize: number,
): Promise<GetExhibitionsResponse> {
  return graphqlRequest<GetExhibitionsResponse>({
    query: GET_EXHIBITIONS_QUERY,
    variables: {
      first: pageSize,
      after: cursor,
    },
  });
}

/**
 * Fetch all exhibitions from the GraphQL API with pagination
 * Fetches all pages to ensure no exhibitions are missed, then sorts them
 * by year and month in descending order (most recent/upcoming first)
 * @returns Array of normalized exhibition objects
 */
export async function getExhibitions(): Promise<Exhibition[]> {
  const allExhibitions: GraphQLExhibition[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;
  const pageSize = 50;
  const seenCursors = new Set<string>();

  // Paginate through all exhibitions
  while (hasNextPage) {
    const response = await fetchExhibitionsPage(cursor, pageSize);
    const { nodes, pageInfo } = response.data.exhibitions;

    if (pageInfo.hasNextPage) {
      const nextCursor = pageInfo.endCursor;
      if (!nextCursor || seenCursors.has(nextCursor)) {
        throw new Error(
          "Exhibition pagination returned a missing or repeated cursor.",
        );
      }
      seenCursors.add(nextCursor);
    }

    allExhibitions.push(...nodes);
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return allExhibitions
    .map(transformExhibition)
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return monthToIndex(b.month) - monthToIndex(a.month);
    });
}
