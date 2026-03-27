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
export function wordpressImageLoader({
  src,
  width,
  quality = 80,
}: ImageLoaderProps): string {
  // If it's a relative URL or data URL, return as-is
  if (src.startsWith("/") || src.startsWith("data:")) {
    return src;
  }

  // Cap width at 1920px for lightbox (no need for larger)
  const finalWidth = Math.min(width, 1920);

  // Use wsrv.nl to optimize the image
  const params = new URLSearchParams({
    url: src,
    w: finalWidth.toString(),
    q: quality.toString(),
    output: "webp",
    n: "-1", // Enable NSFW/safe mode (faster processing)
  });

  return `https://wsrv.nl/?${params.toString()}`;
}

/**
 * Generates a low-quality blur placeholder URL
 * @param src - Original image source URL
 * @returns Tiny blurred image URL for placeholder
 */
export function getBlurPlaceholder(src: string): string {
  if (src.startsWith("/") || src.startsWith("data:")) {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    w: "32", // Very small for fast load
    q: "20", // Low quality
    output: "webp",
    blur: "5", // Add blur effect
  });

  return `https://wsrv.nl/?${params.toString()}`;
}

export default wordpressImageLoader;
