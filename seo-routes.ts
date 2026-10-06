export const siteUrl = 'https://unipark.uz'

export const seoLocales = [
  { code: 'ru', language: 'ru-RU', prefix: '' },
  { code: 'uz', language: 'uz-UZ', prefix: '/uz' },
  { code: 'en', language: 'en-US', prefix: '/en' }
] as const

export const seoPagePaths = [
  '/',
  '/features',
  '/pricing',
  '/cases',
  '/contact',
  '/privacy-policy',
  '/public-offer',
  '/terms-of-use'
] as const

export const localizedSeoPaths = seoLocales.flatMap(({ prefix }) =>
  seoPagePaths.map((path) => {
    const localizedPath = `${prefix}${path === '/' ? '' : path}`
    return localizedPath || '/'
  })
)