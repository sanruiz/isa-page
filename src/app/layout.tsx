import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
