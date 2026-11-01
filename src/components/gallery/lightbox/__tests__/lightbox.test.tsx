import { render, screen } from "@testing-library/react";
import Lightbox from "../index";
import type { Painting } from "@/types";

jest.mock("next/image", () => "img");

const paintings: Painting[] = [
  {
    id: 1,
    title: "First painting",
    series: "Flowers",
    size: "16×20 in",
    medium: "Oil on canvas",
    color: "#111111",
    accent: "#222222",
    image: "https://web.isaartstudio.com/wp-content/uploads/first.webp",
  },
  {
    id: 2,
    title: "Current painting",
    series: "Flowers",
    size: "16×20 in",
    medium: "Oil on canvas",
    color: "#333333",
    accent: "#444444",
    image: "https://web.isaartstudio.com/wp-content/uploads/current.avif",
  },
  {
    id: 3,
    title: "Last painting",
    series: "Flowers",
    size: "16×20 in",
    medium: "Oil on canvas",
    color: "#555555",
    accent: "#666666",
    image: "https://web.isaartstudio.com/wp-content/uploads/last.webp",
  },
];

describe("Lightbox image URLs", () => {
  it("renders the original image URL without a third-party optimizer", () => {
    render(
      <Lightbox
        painting={paintings[1]}
        allPaintings={paintings}
        onClose={jest.fn()}
      />,
    );

    expect(screen.getByRole("img", { name: "Current painting" })).toHaveAttribute(
      "src",
      paintings[1].image,
    );
  });

  it("preloads adjacent paintings with their original image URLs", () => {
    const preloadedUrls: string[] = [];
    const OriginalImage = window.Image;

    Object.defineProperty(window, "Image", {
      configurable: true,
      value: class MockImage {
        set src(value: string) {
          preloadedUrls.push(value);
        }
      },
    });

    try {
      render(
        <Lightbox
          painting={paintings[1]}
          allPaintings={paintings}
          onClose={jest.fn()}
        />,
      );

      expect(preloadedUrls).toEqual([paintings[0].image, paintings[2].image]);
      expect(preloadedUrls.join(" ")).not.toContain("wsrv.nl");
    } finally {
      Object.defineProperty(window, "Image", {
        configurable: true,
        value: OriginalImage,
      });
    }
  });
});
