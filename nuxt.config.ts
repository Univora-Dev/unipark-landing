// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  // Global CSS
  css: ['~/assets/css/app.css'],

  // Components configuration
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/app.css',
    configPath: 'tailwind.config.js'
  },

  // Fonts configuration
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Montserrat', provider: 'google', weights: [600, 700, 800] }
    ],
    defaults: {
      weights: [400, 600, 700],
      styles: ['normal']
    }
  },

  // Image optimization
  image: {
    quality: 80,
    formats: ['webp', 'avif', 'jpg'],
    screens: {
      xs: 320,
      sm: 375,
      md: 768,
      lg: 1280,
      xl: 1440,
      xxl: 1920
    }
  },

  // SEO & Meta defaults
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'UniPark - Автоматизация парковки без лишних усилий',
      meta: [
        { name: 'description', content: 'Интеллектуальная система управления парковкой с распознаванием номеров, гибкими тарифами и контролем в реальном времени' },
        { name: 'keywords', content: 'система управления парковкой, автоматизация парковки, распознавание номеров, парковочное ПО' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'UniPark - Автоматизация парковки' },
        { property: 'og:description', content: 'Интеллектуальная система управления парковкой' },
        { property: 'og:image', content: '/og-image.jpg' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Nitro config for sitemap & robots
  nitro: {
    prerender: {
      routes: ['/', '/features', '/pricing', '/cases', '/contact'],
      crawlLinks: true
    }
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  },

  // Router config
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})