import { seoLocales, seoPagePaths, siteUrl } from '../../seo-routes'

export default defineEventHandler((event) => {
  const localizedPath = (prefix: string, path: string) => {
    const routePath = `${prefix}${path === '/' ? '' : path}`
    return routePath || '/'
  }

  const defaultLocale = seoLocales[0]
  const routes = seoPagePaths.flatMap((path) =>
    seoLocales.map((locale) => {
      const alternates = seoLocales.map((alternate) =>
        `    <xhtml:link rel="alternate" hreflang="${alternate.language}" href="${siteUrl}${localizedPath(alternate.prefix, path)}" />`
      )
      alternates.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${localizedPath(defaultLocale.prefix, path)}" />`
      )

      return `  <url>\n    <loc>${siteUrl}${localizedPath(locale.prefix, path)}</loc>\n${alternates.join('\n')}\n  </url>`
    })
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.join('\n')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})
