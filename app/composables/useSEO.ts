interface SEOOptions {
  title: string
  description: string
  image?: string
  keywords?: string
  canonical?: string
  type?: string
}

export const useSEO = (options: SEOOptions) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  const canonicalUrl = options.canonical || `https://unipark.io${route.path}`
  const imageUrl = options.image || '/og-image.jpg'

  useHead({
    title: options.title,
    meta: [
      { name: 'description', content: options.description },
      ...(options.keywords ? [{ name: 'keywords', content: options.keywords }] : []),
      // Open Graph
      { property: 'og:type', content: options.type || 'website' },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:url', content: canonicalUrl },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: imageUrl }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}

// Schema.org helpers
export const useSoftwareSchema = () => {
  useSchemaOrg([
    {
      '@type': 'SoftwareApplication',
      name: 'UniPark',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows, macOS, Linux',
      offers: {
        '@type': 'Offer',
        price: '299',
        priceCurrency: 'USD'
      },
      description: 'Интеллектуальная система управления парковкой с распознаванием номеров'
    }
  ])
}

export const useFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  useSchemaOrg([
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  ])
}

export const useReviewSchema = (reviews: Array<{ author: string; rating: number; text: string }>) => {
  useSchemaOrg([
    {
      '@type': 'Product',
      name: 'UniPark',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
        reviewCount: reviews.length
      },
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating
        },
        reviewBody: review.text
      }))
    }
  ])
}
