/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ],
}

module.exports = nextConfig

// ==========================================
// TRACKING BUNDLE SIZES (next build)
// ==========================================
// Route (app)                               Size     First Load JS
// ┌  / (Vite/React Live Site)               2.33 kB  1.23 MB (Supabase, ThreeJS, GSAP, Framer Motion)
// ├  /_not-found                            871 B    87.1 kB
// └  /api/og                                1.45 kB  89.5 kB (Edge Runtime)
//
// + First Load JS shared by all             87.4 kB
//   ├ chunks/framework-ec236b2.js           45.2 kB
//   ├ chunks/main-622b102.js                31.8 kB
//   └ chunks/pages/_app-9481ae.js           10.4 kB
// ==========================================
