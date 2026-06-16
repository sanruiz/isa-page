import { getArtworks, getSeriesFromArtworks } from "@/lib/api";
import type { Painting } from "@/types";
import GalleryClient from "./gallery-client";

/**
 * Gallery section that fetches artworks from GraphQL API
 * Server Component - fetches data on the server
 */
export default async function Gallery() {
  let paintings: Painting[] = [];
  let series: string[] = ["All"];
  let error: string | null = null;

  try {
    // Fetch artworks from GraphQL API
    const artworks = await getArtworks();

    // Transform API response to Painting type
    paintings = artworks.map((artwork) => ({
      id: artwork.id,
      title: artwork.title,
      slug: artwork.slug,
      series: artwork.series,
      size: artwork.size,
      medium: artwork.medium,
      price: artwork.price,
      sold: artwork.sold,
      artworkDate: artwork.artworkDate,
      color: artwork.color,
      accent: artwork.accent,
      image: artwork.image,
      galleryImages: artwork.galleryImages,
      aspect: artwork.aspect,
    }));

    // Get unique series from artworks
    series = getSeriesFromArtworks(artworks);
  } catch (err) {
    console.error("Failed to fetch artworks:", err);
    error = "Unable to load gallery. Please try again later.";
  }

  // Show error state if fetch failed
  if (error) {
    return (
      <section id="gallery">
        <div className="gallery-header">
          <h2 className="gallery-title">Selected Works</h2>
        </div>
        <div className="gallery-error" style={{
          padding: "3rem",
          textAlign: "center",
          color: "var(--ink)",
          opacity: 0.6,
          fontStyle: "italic",
        }}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery">
      <GalleryClient artworks={paintings} series={series} />
    </section>
  );
}
