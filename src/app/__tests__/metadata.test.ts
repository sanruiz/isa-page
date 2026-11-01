jest.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

import { metadata } from "../layout";

function getImageUrl(image: unknown): string | URL | undefined {
  if (typeof image === "string" || image instanceof URL) return image;
  if (typeof image !== "object" || image === null || !("url" in image)) {
    return undefined;
  }

  const { url } = image;
  return typeof url === "string" || url instanceof URL ? url : undefined;
}

describe("site metadata", () => {
  it("uses an absolute base URL for social preview images", () => {
    const metadataBase = new URL(String(metadata.metadataBase));
    expect(metadataBase.origin).toBe("https://isaartstudio.com");

    const openGraphImages = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images
      : [metadata.openGraph?.images];
    const twitterImages = Array.isArray(metadata.twitter?.images)
      ? metadata.twitter.images
      : [metadata.twitter?.images];
    const openGraphImage = openGraphImages[0];
    const twitterImage = twitterImages[0];
    const openGraphImageUrl = getImageUrl(openGraphImage);
    const twitterImageUrl = getImageUrl(twitterImage);

    expect(new URL(openGraphImageUrl!, metadataBase).href).toBe(
      "https://isaartstudio.com/metaimg.jpg",
    );
    expect(new URL(twitterImageUrl!, metadataBase).href).toBe(
      "https://isaartstudio.com/metaimg.jpg",
    );
  });
});
