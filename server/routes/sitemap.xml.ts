export default defineEventHandler((event) => {
  const baseUrl = 'https://unipark.uz'

  const routes = [
    { loc: '/', lastmod: new Date().toISOString(), priority: '1.0' },
    { loc: '/features', lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: '/pricing', lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: '/cases', lastmod: new Date().toISOString(), priority: '0.7' },
    { loc: '/contact', lastmod: new Date().toISOString(), priority: '0.6' }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})
