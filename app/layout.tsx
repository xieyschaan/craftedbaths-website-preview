import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crafted Bathrooms",
  description: "Luxury bathroom fittings and fixtures. Explore our projects, services, and showrooms.",
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

