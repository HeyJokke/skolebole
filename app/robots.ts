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
                allow: '/',
                disallow: ['/admin', '/materialer/search/'],
            }
        ],
        sitemap: 'https://skolebole.dk/sitemap.xml',
    }
}