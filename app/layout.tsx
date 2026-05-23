import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";

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
  title: "Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing",
  description: "We build immersive 3D landing pages, AI-powered Micro SaaS products, and run high-ROI digital marketing campaigns. Based in India, serving global clients.",
  keywords: [
    "3D website design India",
    "AI SaaS development",
    "digital marketing agency",
    "Next.js web development",
    "immersive landing pages"
  ],
  openGraph: {
    title: "Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing",
    description: "We build immersive 3D landing pages, AI-powered Micro SaaS products, and run high-ROI digital marketing campaigns. Based in India, serving global clients.",
    url: "https://varunya-tech-site.vercel.app",
    siteName: "Varunya Technologies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varunya Technologies — 3D Websites, AI SaaS & Digital Marketing",
    description: "We build immersive 3D landing pages, AI-powered Micro SaaS products, and run high-ROI digital marketing campaigns. Based in India, serving global clients.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
        <PageTransition />
      </body>
    </html>
  );
}
