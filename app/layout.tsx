import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import JsonLd from "./components/JsonLd";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://varunya-tech-site.vercel.app'),
  title: {
    default: 'Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing',
    template: '%s | Varunya Technologies',
  },
  description:
    'Varunya Technologies builds immersive 3D landing pages, AI-powered Micro SaaS products, and data-driven digital marketing campaigns. Based in India, serving global clients.',
  keywords: [
    '3D website design India',
    'AI SaaS development India',
    'digital marketing agency Surat',
    'Next.js web development',
    'immersive landing page design',
    'Three.js website',
    'micro SaaS development',
    'web design agency India',
    'Varunya Technologies',
    'AI automation agency',
  ],
  authors: [{ name: 'Varunya Technologies', url: 'https://varunya-tech-site.vercel.app' }],
  creator: 'Varunya Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://varunya-tech-site.vercel.app',
    siteName: 'Varunya Technologies',
    title: 'Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing',
    description:
      'We build immersive 3D websites, AI Micro SaaS products, and run high-ROI digital marketing campaigns. Fast delivery. Global clients.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Varunya Technologies — Intelligent Digital Futures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing',
    description:
      'Immersive 3D websites, AI Micro SaaS, and digital marketing — built for results.',
    images: ['/api/og'],
    creator: '@varyunatech',
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
  verification: {
    google: 'ADD_YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN_HERE',
  },
  alternates: {
    canonical: 'https://varunya-tech-site.vercel.app',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden" style={{ overflowX: 'hidden' }}>
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://vercel.com" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`} style={{ overflowX: 'hidden' }}>
        {children}
        <PageTransition />
      </body>
    </html>
  );
}
