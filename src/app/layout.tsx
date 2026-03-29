import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isabella Ramírez | Visual Artist",
  description:
    "Painting the quiet intensity of flowers, memory, and the natural world — one brushstroke at a time.",
  keywords: [
    "artist",
    "oil painting",
    "botanical art",
    "Isabella Ramírez",
    "Colombian artist",
  ],
  openGraph: {
    title: "Isabella Ramírez | Visual Artist",
    description:
      "Painting the quiet intensity of flowers, memory, and the natural world — one brushstroke at a time.",
    images: [
      {
        url: "/metaimg.jpg",
        width: 1200,
        height: 630,
        alt: "Isabella Ramírez - Visual Artist",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isabella Ramírez | Visual Artist",
    description:
      "Painting the quiet intensity of flowers, memory, and the natural world — one brushstroke at a time.",
    images: ["/metaimg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
