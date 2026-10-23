import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { BASE_PATH, SITE_URL } from "@/lib/site";

const title = "StackGlint · Intelligent solutions. From code to cloud.";
const description = "Websites, web apps, Odoo ERP, AI, cloud and DevOps. One team with 7+ years of experience across the entire software life cycle.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  icons: { icon: `${BASE_PATH}/favicon.svg`, apple: `${BASE_PATH}/apple-touch-icon.png` },
  openGraph: { type: "website", title, description, url: SITE_URL, images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export const viewport: Viewport = { themeColor: "#060706", viewportFit: "cover", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
