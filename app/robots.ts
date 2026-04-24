import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/materialer/search/'],
            },
            {
                userAgent: 'facebookexternalhit',
                allow: ['/admin', '/materialer/search/'],
            }
        ],
        sitemap: 'https://www.skolebole.dk/sitemap.xml',
    }
}