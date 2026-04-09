import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "NetMon — LTE Network Availability Dashboard",
  description:
    "Monitor dan analisis availability jaringan LTE secara real-time. Visualisasi data per cell, eNodeB, dan rentang waktu dari file PM Result EMS/OSS.",
  keywords: [
    "LTE",
    "network monitoring",
    "availability",
    "eNodeB",
    "cell",
    "dashboard",
    "telecom",
  ],
  authors: [{ name: "NetMon" }],
  robots: "index, follow",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "NetMon — LTE Network Availability Dashboard",
    description:
      "Monitor dan analisis availability jaringan LTE secara real-time dari file PM Result EMS/OSS.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NetMon — LTE Network Availability Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetMon — LTE Network Availability Dashboard",
    description:
      "Monitor dan analisis availability jaringan LTE secara real-time.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${ibmPlexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#080c14]">{children}</body>
    </html>
  );
}
