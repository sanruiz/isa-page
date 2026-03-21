import { getArtworks, getSeriesFromArtworks } from "@/lib/api";
import type { Painting } from "@/types";
import GalleryClient from "./gallery-client";

/**
 * Gallery section that fetches artworks from GraphQL API
 * Server Component - fetches data on the server
 */
export default async function Gallery() {
  // Fetch artworks from GraphQL API
  const artworks = await getArtworks();

  // Transform API response to Painting type
  const paintings: Painting[] = artworks.map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    slug: artwork.slug,
    series: artwork.series,
    size: artwork.size,
    medium: artwork.medium,
    price: artwork.price,
    artworkDate: artwork.artworkDate,
    color: artwork.color,
    accent: artwork.accent,
    image: artwork.image,
    galleryImages: artwork.galleryImages,
    aspect: artwork.aspect,
  }));

  // Get unique series from artworks
  const series = getSeriesFromArtworks(artworks);

  return (
    <section id="gallery">
      <GalleryClient artworks={paintings} series={series} />
    </section>
  );
}
