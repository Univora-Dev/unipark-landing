<script setup lang="ts">
import type { ContactFormData } from '~/types'

const { t } = useI18n()

definePageMeta({
  layout: 'default'
})

useHead({
  title: () => t('seo.contact.title'),
  meta: [
    { name: 'description', content: () => t('seo.contact.description') },
    { name: 'keywords', content: () => t('seo.contact.keywords') },
    { property: 'og:title', content: () => t('seo.contact.title') },
    { property: 'og:description', content: () => t('seo.contact.description') }
  ]
})

const handleSubmit = async (data: ContactFormData) => {
  console.log('Form submitted:', data)
}

const contactInfo = computed(() => [
  {
    icon: 'lucide:mail',
    title: t('contact.info.email.title'),
    value: 'info@unipark.io',
    description: t('contact.info.email.description'),
    link: 'mailto:info@unipark.io'
  },
  {
    icon: 'lucide:phone',
    title: t('contact.info.phone.title'),
    value: '+7 (495) 123-45-67',
    description: t('contact.info.phone.description'),
    link: 'tel:+74951234567'
  },
  {
    icon: 'lucide:message-circle',
    title: t('contact.info.telegram.title'),
    value: '@unipark_support',
    description: t('contact.info.telegram.description'),
    link: 'https://t.me/unipark_support'
  },
  {
    icon: 'lucide:map-pin',
    title: t('contact.info.office.title'),
    value: 'Москва, ул. Примерная, 123',
    description: t('contact.info.office.description'),
    link: '#'
  }
])

const workingHours = computed(() => [
  { day: t('contact.workingHours.mondayFriday'), time: '9:00 - 18:00' },
  { day: t('contact.workingHours.saturday'), time: '10:00 - 16:00' },
  { day: t('contact.workingHours.sunday'), time: t('contact.workingHours.closed') }
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <PageHero
      :title="t('contact.hero.title')"
      :subtitle="t('contact.hero.subtitle')"
    />

    <!-- Contact Info Cards -->
    <section class="py-20 px-4 md:px-8">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <ScrollReveal
            v-for="(info, index) in contactInfo"
            :key="info.title"
            :delay="100 * index"
          >
            <a
              :href="info.link"
              class="group"
            >
              <Card class="h-full text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon :name="info.icon" class="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 class="text-lg font-heading font-bold text-dark-900 mb-2">
                    {{ info.title }}
                  </h3>
                  <p class="text-primary-600 font-semibold mb-1">
                    {{ info.value }}
                  </p>
                  <p class="text-sm text-dark-600">
                    {{ info.description }}
                  </p>
                </div>
              </Card>
            </a>
          </ScrollReveal>
        </div>

        <!-- Contact Form & Info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Form -->
          <div class="lg:col-span-2">
            <ScrollReveal>
              <Card class="p-8">
                <h2 class="text-3xl font-heading font-bold text-dark-900 mb-2">
                  {{ t('contact.form.title') }}
                </h2>
                <p class="text-dark-600 mb-8">
                  {{ t('contact.form.subtitle') }}
                </p>
                <ContactForm @submit="handleSubmit" />
              </Card>
            </ScrollReveal>
          </div>

          <!-- Additional Info -->
          <div class="space-y-6">
            <!-- Working Hours -->
            <ScrollReveal :delay="200">
              <Card class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Icon name="lucide:clock" class="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 class="text-xl font-heading font-bold text-dark-900">
                    {{ t('contact.workingHours.title') }}
                  </h3>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="schedule in workingHours"
                    :key="schedule.day"
                    class="flex justify-between items-center pb-3 border-b border-dark-100 last:border-0 last:pb-0"
                  >
                    <span class="text-dark-700">{{ schedule.day }}</span>
                    <span class="font-semibold text-dark-900">{{ schedule.time }}</span>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <!-- Quick Links -->
            <ScrollReveal :delay="300">
              <Card class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <Icon name="lucide:help-circle" class="w-5 h-5 text-accent-600" />
                  </div>
                  <h3 class="text-xl font-heading font-bold text-dark-900">
                    {{ t('contact.quickLinks.title') }}
                  </h3>
                </div>
                <div class="space-y-3">
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:book-open" class="w-4 h-4" />
                    <span>{{ t('contact.quickLinks.knowledgeBase') }}</span>
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:file-text" class="w-4 h-4" />
                    <span>{{ t('contact.quickLinks.apiDocs') }}</span>
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:video" class="w-4 h-4" />
                    <span>{{ t('contact.quickLinks.videoTutorials') }}</span>
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:message-square" class="w-4 h-4" />
                    <span>{{ t('contact.quickLinks.supportForum') }}</span>
                  </NuxtLink>
                </div>
              </Card>
            </ScrollReveal>

            <!-- Social Media -->
            <ScrollReveal :delay="400">
              <Card class="p-6">
                <h3 class="text-xl font-heading font-bold text-dark-900 mb-4">
                  {{ t('contact.social.title') }}
                </h3>
                <div class="flex gap-3">
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-dark-100 hover:bg-primary-600 flex items-center justify-center text-dark-600 hover:text-white transition-all"
                  >
                    <Icon name="lucide:send" class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-dark-100 hover:bg-primary-600 flex items-center justify-center text-dark-600 hover:text-white transition-all"
                  >
                    <Icon name="lucide:message-circle" class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-dark-100 hover:bg-primary-600 flex items-center justify-center text-dark-600 hover:text-white transition-all"
                  >
                    <Icon name="lucide:mail" class="w-5 h-5" />
                  </a>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Placeholder) -->
    <section class="py-20 px-4 md:px-8 bg-dark-50">
      <div class="container-custom">
        <ScrollReveal>
          <h2 class="text-4xl font-heading font-bold text-dark-900 mb-8 text-center">
            {{ t('contact.map.title') }}
          </h2>
        </ScrollReveal>
        <ScrollReveal :delay="200">
          <div class="bg-dark-200 rounded-2xl h-96 flex items-center justify-center">
            <div class="text-center">
              <Icon name="lucide:map-pin" class="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <p class="text-dark-600">
                {{ t('contact.map.placeholder') }}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- CTA -->
    <CTASection
      :title="t('contact.cta.title')"
      :subtitle="t('contact.cta.subtitle')"
      :button-text="t('contact.cta.bookDemo')"
      button-icon="lucide:video"
      :secondary-button-text="t('contact.cta.askQuestion')"
      secondary-button-icon="lucide:message-circle"
    />
  </div>
</template>
