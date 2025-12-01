// Button component types
export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

// Card component types
export type CardPadding = 'sm' | 'md' | 'lg'

// Feature types
export interface Feature {
  icon: string
  title: string
  description: string
}

// Pricing types
export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: PricingFeature[]
  popular?: boolean
  ctaText: string
}

// Stats types
export interface Stat {
  value: number | string
  label: string
  suffix?: string
  prefix?: string
}

// Testimonial types
export interface Testimonial {
  name: string
  position: string
  company: string
  photo?: string
  quote: string
  rating?: number
}

// Case study types
export interface CaseStudy {
  title: string
  problem: string
  solution: string
  results: string[]
  image?: string
  clientLogo?: string
}

// FAQ types
export interface FAQItem {
  question: string
  answer: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  parkingSpaces?: string
  message?: string
  agreeToTerms: boolean
}

export type ValidationRule<T> = (value: T) => string | null
