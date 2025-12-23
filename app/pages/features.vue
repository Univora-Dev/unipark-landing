<script setup lang="ts">
import type { Feature } from '~/types'

const { t } = useI18n()
const { open: openContactModal } = useContactModal()


definePageMeta({
  layout: 'default'
})

useHead({
  title: () => t('seo.features.title'),
  meta: [
    { name: 'description', content: () => t('seo.features.description') },
    { name: 'keywords', content: () => t('seo.features.keywords') },
    { property: 'og:title', content: () => t('seo.features.title') },
    { property: 'og:description', content: () => t('seo.features.description') }
  ]
})

const mainFeatures = computed<Feature[]>(() => [
  {
    title: t('features.main.recognition.title'),
    description: t('features.main.recognition.description'),
    icon: 'lucide:camera'
  },
  {
    title: t('features.main.flexibleTariffs.title'),
    description: t('features.main.flexibleTariffs.description'),
    icon: 'lucide:calculator'
  },
  {
    title: t('features.main.accessControl.title'),
    description: t('features.main.accessControl.description'),
    icon: 'lucide:shield-check'
  },
  {
    title: t('features.main.analytics.title'),
    description: t('features.main.analytics.description'),
    icon: 'lucide:line-chart'
  },
  {
    title: t('features.main.integrations.title'),
    description: t('features.main.integrations.description'),
    icon: 'lucide:plug'
  },
  {
    title: t('features.main.mobileApp.title'),
    description: t('features.main.mobileApp.description'),
    icon: 'lucide:smartphone'
  }
])

const additionalFeatures = computed<Feature[]>(() => [
  {
    title: t('features.additional.dataSecurity.title'),
    description: t('features.additional.dataSecurity.description'),
    icon: 'lucide:lock'
  },
  {
    title: t('features.additional.support247.title'),
    description: t('features.additional.support247.description'),
    icon: 'lucide:headphones'
  },
  {
    title: t('features.additional.scalability.title'),
    description: t('features.additional.scalability.description'),
    icon: 'lucide:maximize-2'
  },
  {
    title: t('features.additional.updates.title'),
    description: t('features.additional.updates.description'),
    icon: 'lucide:refresh-cw'
  },
  {
    title: t('features.additional.notifications.title'),
    description: t('features.additional.notifications.description'),
    icon: 'lucide:bell'
  },
  {
    title: t('features.additional.multilingual.title'),
    description: t('features.additional.multilingual.description'),
    icon: 'lucide:languages'
  }
])

const timeline = computed(() => [
  {
    number: 1,
    title: t('features.howItWorks.step1.title'),
    description: t('features.howItWorks.step1.description'),
    icon: 'lucide:camera'
  },
  {
    number: 2,
    title: t('features.howItWorks.step2.title'),
    description: t('features.howItWorks.step2.description'),
    icon: 'lucide:settings'
  },
  {
    number: 3,
    title: t('features.howItWorks.step3.title'),
    description: t('features.howItWorks.step3.description'),
    icon: 'lucide:play-circle'
  },
  {
    number: 4,
    title: t('features.howItWorks.step4.title'),
    description: t('features.howItWorks.step4.description'),
    icon: 'lucide:activity'
  }
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <PageHero
      :title="t('features.hero.title')"
      :subtitle="t('features.hero.subtitle')"
    />

    <!-- Main Features -->
    <FeaturesGrid
      :title="t('features.main.title')"
      :subtitle="t('features.main.subtitle')"
      :features="mainFeatures"
    />

    <!-- Product Screenshots -->
    <section class="py-20 px-4 md:px-8">
      <div class="container-custom">
        <div class="text-center mb-16">
          <ScrollReveal>
            <h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              {{ t('features.interface.title') }}
            </h2>
          </ScrollReveal>
          <ScrollReveal :delay="200">
            <p class="text-xl text-dark-600 max-w-2xl mx-auto">
              {{ t('features.interface.subtitle') }}
            </p>
          </ScrollReveal>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal :delay="0">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/1.jpg"
                :alt="t('features.interface.dashboard')"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="100">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/2.jpg"
                :alt="t('features.interface.analytics')"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="200">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/3.jpg"
                :alt="t('features.interface.tariffs')"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="300">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/4.jpg"
                :alt="t('features.interface.monitoring')"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 px-4 md:px-8 bg-dark-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <ScrollReveal>
            <h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              {{ t('features.howItWorks.title') }}
            </h2>
          </ScrollReveal>
          <ScrollReveal :delay="200">
            <p class="text-xl text-dark-600 max-w-2xl mx-auto">
              {{ t('features.howItWorks.subtitle') }}
            </p>
          </ScrollReveal>
        </div>

        <div class="max-w-3xl mx-auto">
          <ScrollReveal
            v-for="(step, index) in timeline"
            :key="step.number"
            :delay="100 * index"
          >
            <TimelineStep
              :number="step.number"
              :title="step.title"
              :description="step.description"
              :icon="step.icon"
              :is-last="index === timeline.length - 1"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Additional Features -->
    <FeaturesGrid
      :title="t('features.additional.title')"
      :subtitle="t('features.additional.subtitle')"
      :features="additionalFeatures"
      :columns="3"
    />

    <!-- CTA -->
    <CTASection
      :title="t('features.cta.title')"
      :subtitle="t('features.cta.subtitle')"
      :button-text="t('common.startFreeTrial')"
      :secondary-button-text="t('features.cta.contactExpert')"
      secondary-button-icon="lucide:message-circle"
      @button-click="openContactModal"
      @secondary-click="openContactModal"
    />
  </div>
</template>
