import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: 'https://ccma-ai.com/sitemap.xml',
  }
}
