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
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Русский',
        file: 'ru.json'
      },
      {
        code: 'uz',
        language: 'uz-UZ',
        name: 'O\'zbekcha',
        file: 'uz.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    baseUrl: 'https://unipark.io',
    // SEO configuration
    seo: true,
    // Meta configuration for SEO
    meta: {
      name: 'UniPark',
      description: 'Intelligent parking management system',
      ogType: 'website',
      ogImage: '/og-image.jpg',
      twitterCard: 'summary_large_image'
    }
  },

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
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.jpg' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ]
    }
  },

  // Nitro config for sitemap & robots
  nitro: {
    prerender: {
      routes: [
        '/',
        '/features',
        '/pricing',
        '/contact',
        '/uz',
        '/uz/features',
        '/uz/pricing',
        '/uz/contact',
        '/en',
        '/en/features',
        '/en/pricing',
        '/en/contact'
      ],
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