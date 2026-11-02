/**
 * GraphQL API type definitions for WordPress artwork data
 */

/** Image data from WordPress media library */
export interface GalleryImage {
  /** WordPress media ID */
  id: number;
  /** Full URL to the image */
  sourceUrl: string;
  /** Alt text for accessibility */
  altText: string;
  /** Image title */
  title: string;
  /** Responsive srcSet for different viewport sizes */
  srcSet: string;
}

/** Featured image wrapper from WordPress */
export interface FeaturedImage {
  node: {
    sourceUrl: string;
  };
}

/** Artwork category from WordPress taxonomy */
export interface ArtworkCategory {
  /** Category display name */
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** Category link */
  link?: string;
}

/** Artwork series from WordPress taxonomy */
export interface ArtworkSeries {
  /** Series display name */
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** Series link */
  link?: string;
}

/** Raw artwork data from GraphQL response */
export interface GraphQLArtwork {
  /** Base64 encoded global ID */
  id: string;
  /** WordPress database ID */
  databaseId: number;
  /** Artwork title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Dimensions (e.g., "10x23") */
  size: string;
  /** Medium used (e.g., "Oil on canvas") */
  medium: string;
  /** Price as string */
  price: string;
  /** Whether the artwork has been sold */
  sold: boolean;
  /** Creation date (ISO format) */
  artworkDate: string;
  /** Featured/main image */
  featuredImage: FeaturedImage | null;
  /** Additional gallery images */
  galleryImages: GalleryImage[];
  /** Categories */
  artworkCategories: {
    nodes: ArtworkCategory[];
  };
  /** Series */
  allArtworkSeries: {
    nodes: ArtworkSeries[];
  };
}

/** Pagination info from GraphQL */
export interface PageInfo {
  /** Whether there are more pages */
  hasNextPage: boolean;
  /** Cursor for next page */
  endCursor: string | null;
}

/** Raw exhibition data from GraphQL response */
export interface GraphQLExhibition {
  /** Base64 encoded global ID */
  id: string;
  /** WordPress database ID */
  databaseId: number;
  /** Exhibition title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Year of the exhibition */
  year: number;
  /** Month abbreviation (e.g., "Aug"), or empty if unknown */
  month: string;
  /** Venue name and address */
  venue: string;
  /** City, province/state, and country */
  location: string;
  /** Additional gallery images */
  galleryImages: GalleryImage[];
}

/** GraphQL response structure for exhibitions query */
export interface GetExhibitionsResponse {
  data: {
    exhibitions: {
      nodes: GraphQLExhibition[];
      pageInfo: PageInfo;
    };
  };
}

/** GraphQL response structure for artworks query */
export interface GetArtworksResponse {
  data: {
    artworks: {
      nodes: GraphQLArtwork[];
      pageInfo: PageInfo;
    };
  };
}

/** Normalized artwork for frontend use */
export interface Artwork {
  /** Unique identifier (database ID) */
  id: number;
  /** Artwork title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Category/series name (first category or "Uncategorized") */
  series: string;
  /** Dimensions (e.g., "10×23 in") */
  size: string;
  /** Medium used (e.g., "Oil on canvas") */
  medium: string;
  /** Price as number (null if not set) */
  price: number | null;
  /** Whether the artwork has been sold */
  sold: boolean;
  /** Creation date */
  artworkDate: string;
  /** Main image URL */
  image: string | null;
  /** Additional gallery images */
  galleryImages: GalleryImage[];
  /** Primary background color (hex) - for fallback */
  color: string;
  /** Accent color (hex) */
  accent: string;
  /** Aspect ratio based on dimensions */
  aspect: "square" | "landscape" | "portrait";
}
