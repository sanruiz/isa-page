/**
 * Custom image loader using wsrv.nl (free image optimization CDN)
 * Optimizes and resizes images on-the-fly
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Image loader that uses wsrv.nl to optimize and resize images
 * @param props - Image loader props from Next.js
 * @returns Optimized image URL via wsrv.nl
 */
export function wordpressImageLoader({ src, width, quality = 75 }: ImageLoaderProps): string {
  // If it's a relative URL or data URL, return as-is
  if (src.startsWith("/") || src.startsWith("data:")) {
    return src;
  }

  // Use wsrv.nl to optimize the image
  // Docs: https://wsrv.nl/docs/
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: quality.toString(),
    output: "webp", // Convert to WebP for better compression
    fit: "contain",
  });

  return `https://wsrv.nl/?${params.toString()}`;
}

export default wordpressImageLoader;
