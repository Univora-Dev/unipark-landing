<script setup lang="ts">
import type { Feature, Stat } from '~/types'
import type { Benefit } from '~/components/sections/BenefitsSection.vue'
import type { Testimonial } from '~/components/sections/TestimonialsSection.vue'
import type { PricingPlan } from '~/components/sections/PricingSection.vue'
import type { FAQItem } from '~/components/sections/FAQSection.vue'

const { t } = useI18n()
const { open: openContactModal } = useContactModal()


definePageMeta({
  layout: 'default'
})

useHead({
  title: () => t('seo.home.title'),
  meta: [
    { name: 'description', content: () => t('seo.home.description') },
    { name: 'keywords', content: () => t('seo.home.keywords') },
    { property: 'og:title', content: () => t('seo.home.title') },
    { property: 'og:description', content: () => t('seo.home.description') }
  ]
})

const features = computed<Feature[]>(() => [
  {
    title: t('home.features.automation.title'),
    description: t('home.features.automation.description'),
    icon: 'lucide:camera'
  },
  {
    title: t('home.features.flexibleTariffs.title'),
    description: t('home.features.flexibleTariffs.description'),
    icon: 'lucide:calculator'
  },
  {
    title: t('home.features.control247.title'),
    description: t('home.features.control247.description'),
    icon: 'lucide:bar-chart-3'
  },
  {
    title: t('home.features.analytics.title'),
    description: t('home.features.analytics.description'),
    icon: 'lucide:line-chart'
  },
  {
    title: t('home.features.integrations.title'),
    description: t('home.features.integrations.description'),
    icon: 'lucide:plug'
  },
  {
    title: t('home.features.security.title'),
    description: t('home.features.security.description'),
    icon: 'lucide:shield-check'
  }
])

const stats = computed<Stat[]>(() => [
  { value: 30, label: t('home.stats.profitIncrease'), suffix: '%' },
  { value: 98, label: t('home.stats.recognitionAccuracy'), suffix: '%' },
  { value: 100, label: t('home.stats.happyClients'), suffix: '+' },
  { value: 0, label: t('home.stats.lostTransactions'), suffix: '' }
])

const benefits = computed<Benefit[]>(() => [
  {
    title: t('home.benefits.timeSaving.title'),
    description: t('home.benefits.timeSaving.description'),
    icon: 'lucide:clock',
    metric: t('home.benefits.timeSaving.metric'),
    metricLabel: t('home.benefits.timeSaving.metricLabel')
  },
  {
    title: t('home.benefits.profitGrowth.title'),
    description: t('home.benefits.profitGrowth.description'),
    icon: 'lucide:trending-up',
    metric: t('home.benefits.profitGrowth.metric'),
    metricLabel: t('home.benefits.profitGrowth.metricLabel')
  },
  {
    title: t('home.benefits.fullAutomation.title'),
    description: t('home.benefits.fullAutomation.description'),
    icon: 'lucide:zap',
    metric: t('home.benefits.fullAutomation.metric'),
    metricLabel: t('home.benefits.fullAutomation.metricLabel')
  }
])

const testimonials: Testimonial[] = [
  {
    name: 'Алексей Петров',
    position: 'Директор',
    company: 'ТЦ "Мега"',
    content: 'UniPark полностью изменил подход к управлению парковкой. Теперь мы контролируем каждый въезд и выезд, а прибыль выросла на 35% за первый квартал.',
    rating: 5
  },
  {
    name: 'Марина Соколова',
    position: 'Управляющая',
    company: 'Бизнес-центр "Альфа"',
    content: 'Отличная система! Интеграция заняла всего 2 дня, а окупилась за 4 месяца. Клиенты довольны быстрым обслуживанием.',
    rating: 5
  },
  {
    name: 'Дмитрий Иванов',
    position: 'Владелец',
    company: 'Сеть парковок "Паркинг+"',
    content: 'Управляю 5 парковками через единую панель. Аналитика в реальном времени помогает оптимизировать загрузку и ценообразование.',
    rating: 5
  }
]

const pricingPlans = computed<PricingPlan[]>(() => [
  {
    name: t('pricing.plans.small.name'),
    description: t('pricing.plans.small.capacity'),
    price: '400 000',
    period: t('common.perMonth'),
    buttonText: t('common.select'),
    features: [
      `2 ${t('pricing.features.cameras')}`,
      `1 ${t('pricing.features.barriers')}`,
      t('pricing.features.basicReports'),
      t('pricing.features.emailSupport'),
      t('pricing.features.backup7')
    ]
  },
  {
    name: t('pricing.plans.medium.name'),
    description: t('pricing.plans.medium.capacity'),
    price: '800 000',
    period: t('common.perMonth'),
    buttonText: t('common.select'),
    highlighted: true,
    badge: t('common.popular'),
    features: [
      `4 ${t('pricing.features.cameras')}`,
      `2 ${t('pricing.features.barriers')}`,
      t('pricing.features.advancedReports'),
      t('pricing.features.emailChatSupport'),
      t('pricing.features.backup14'),
      t('pricing.features.limitedIntegration')
    ]
  },
  {
    name: t('pricing.plans.large.name'),
    description: t('pricing.plans.large.capacity'),
    price: '1 600 000',
    period: t('common.perMonth'),
    buttonText: t('common.select'),
    features: [
      `8 ${t('pricing.features.cameras')}`,
      `4 ${t('pricing.features.barriers')}`,
      t('pricing.features.advancedReports'),
      t('pricing.features.support247'),
      t('pricing.features.backup30'),
      t('pricing.features.fullIntegration')
    ]
  }
])

const faqItems = computed<FAQItem[]>(() => [
  {
    question: t('home.faq.installTime.question'),
    answer: t('home.faq.installTime.answer')
  },
  {
    question: t('home.faq.accuracy.question'),
    answer: t('home.faq.accuracy.answer')
  },
  {
    question: t('home.faq.integration.question'),
    answer: t('home.faq.integration.answer')
  },
  {
    question: t('home.faq.offline.question'),
    answer: t('home.faq.offline.answer')
  },
  {
    question: t('home.faq.support.question'),
    answer: t('home.faq.support.answer')
  },
  {
    question: t('home.faq.freeTrial.question'),
    answer: t('home.faq.freeTrial.answer')
  }
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      :title="t('home.hero.title')"
      :subtitle="t('home.hero.subtitle')"
      :primary-button-text="t('common.watchDemo')"
      primary-button-icon="lucide:play-circle"
      :images="[
        '/images/screenshots/1.jpg',
        '/images/screenshots/2.jpg',
        '/images/screenshots/3.jpg',
        '/images/screenshots/4.jpg'
      ]"
      @primary-click="openContactModal"
    />

    <!-- Features Section -->
    <FeaturesGrid
      :title="t('home.features.title')"
      :subtitle="t('home.features.subtitle')"
      :features="features"
    />

    <!-- Benefits Section -->
    <BenefitsSection
      :title="t('home.benefits.title')"
      :subtitle="t('home.benefits.subtitle')"
      :benefits="benefits"
    />

    <!-- Stats Section -->
    <StatsCounter
      :title="t('home.stats.title')"
      :subtitle="t('home.stats.subtitle')"
      :stats="stats"
    />

    <!-- Testimonials Section -->
    <TestimonialsSection
      :title="t('home.testimonials.title')"
      :subtitle="t('home.testimonials.subtitle')"
      :testimonials="testimonials"
    />

    <!-- Pricing Section -->
    <!-- <PricingSection
      :title="t('home.pricing.title')"
      :subtitle="t('home.pricing.subtitle')"
      :plans="pricingPlans"
      @select="openContactModal"
    /> -->

    <!-- FAQ Section -->
    <FAQSection
      :title="t('home.faq.title')"
      :subtitle="t('home.faq.subtitle')"
      :items="faqItems"
    />

    <!-- CTA Section -->
    <CTASection
      :title="t('home.cta.title')"
      :subtitle="t('home.cta.subtitle')"
      :button-text="t('common.startFreeTrial')"
      :secondary-button-text="t('common.contactUs')"
      secondary-button-icon="lucide:mail"
      @button-click="openContactModal"
      @secondary-click="openContactModal"
    />
  </div>
</template>
