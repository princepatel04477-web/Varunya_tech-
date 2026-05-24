export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://varunya-tech-site.vercel.app/#organization',
        name: 'Varunya Technologies',
        url: 'https://varunya-tech-site.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://varunya-tech-site.vercel.app/logo.png',
        },
        description:
          'Varunya Technologies builds immersive 3D websites, AI Micro SaaS products, and runs data-driven digital marketing campaigns.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Surat',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi', 'Gujarati'],
        },
        sameAs: [
          'https://www.linkedin.com/company/varunya-technologies',
          'https://www.instagram.com/varyunatech',
          'https://github.com/varyunatech',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://varunya-tech-site.vercel.app/#website',
        url: 'https://varunya-tech-site.vercel.app',
        name: 'Varunya Technologies',
        publisher: { '@id': 'https://varunya-tech-site.vercel.app/#organization' },
      },
      {
        '@type': 'Service',
        name: '3D Website & Landing Page Design',
        provider: { '@id': 'https://varunya-tech-site.vercel.app/#organization' },
        description: 'Immersive 3D websites and landing pages built with Three.js, GSAP, and Next.js.',
        areaServed: 'Worldwide',
        offers: { '@type': 'Offer', price: '15000', priceCurrency: 'INR' },
      },
      {
        '@type': 'Service',
        name: 'AI Micro SaaS Development',
        provider: { '@id': 'https://varunya-tech-site.vercel.app/#organization' },
        description: 'Custom AI-powered Micro SaaS products built and shipped in 4–6 weeks.',
        areaServed: 'Worldwide',
        offers: { '@type': 'Offer', price: '45000', priceCurrency: 'INR' },
      },
      {
        '@type': 'Service',
        name: 'Digital Marketing',
        provider: { '@id': 'https://varunya-tech-site.vercel.app/#organization' },
        description: 'SEO, paid ads, social media, and email marketing campaigns with measurable ROI.',
        areaServed: 'Worldwide',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does it take to build a 3D website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A standard 3D landing page takes 7–14 days. Complex multi-page builds take 3–4 weeks.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the starting price for a website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Websites start from ₹15,000. Pricing depends on scope, animations, and integrations required.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you work with international clients?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We work with clients globally. All communication is in English and payments can be made in USD or INR.',
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
