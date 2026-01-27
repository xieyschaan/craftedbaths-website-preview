import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: "Crafted Bathrooms | Luxury Bathroom Fittings & Fixtures",
    template: "%s | Crafted Bathrooms"
  },
  description: "Luxury bathroom fittings and fixtures. Explore our projects, services, and showrooms across the UK.",
  keywords: ["bathroom fittings", "luxury bathrooms", "bathroom fixtures", "bathroom design", "UK bathrooms"],
  authors: [{ name: "Crafted Bathrooms" }],
  creator: "Crafted Bathrooms",
  publisher: "Crafted Bathrooms",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://craftedbaths-website-preview.pages.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'Crafted Bathrooms',
    title: 'Crafted Bathrooms | Luxury Bathroom Fittings & Fixtures',
    description: 'Luxury bathroom fittings and fixtures. Explore our projects, services, and showrooms across the UK.',
    images: [
      {
        url: '/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp',
        width: 1200,
        height: 630,
        alt: 'Crafted Bathrooms - Luxury Bathroom Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crafted Bathrooms | Luxury Bathroom Fittings & Fixtures',
    description: 'Luxury bathroom fittings and fixtures. Explore our projects, services, and showrooms across the UK.',
    images: ['/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/favicon.ico/16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon.ico/32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon.ico/192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/favicon.ico/180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/favicon.ico/180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

