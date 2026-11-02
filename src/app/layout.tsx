import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://isaartstudio.com",
  ),
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
      <body
        className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${dmMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
