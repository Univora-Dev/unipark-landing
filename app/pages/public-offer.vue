<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { t, tm, rt } = useI18n()
const router = useRouter()

useSEO({
  title: t('pages.public_offer.seo.title'),
  description: t('pages.public_offer.seo.description')
}) 

const sections = computed(() => tm('pages.public_offer.sections') as any[])
</script>

<template>
  <div class="py-20 md:py-28 bg-gray-50 min-h-screen">
    <div class="container-custom max-w-4xl mx-auto">
      <!-- Back Link -->
      <div class="mb-8">
        <button @click="router.back()" class="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
          <span class="font-medium">{{ t('common.back_to_home') }}</span>
        </button>
      </div>

      <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
        <h1 class="text-3xl md:text-4xl font-heading font-bold text-dark-900 mb-8">
          {{ t('pages.public_offer.title') }}
        </h1>
        <p class="text-lg text-dark-500 mb-8 italic">
          {{ t('pages.public_offer.subtitle') }}
        </p>

        <div class="space-y-8">
          
          <section v-for="(section, index) in sections" :key="index">
            <h2 class="text-2xl font-bold text-dark-900 mb-4">{{ rt(section.title) }}</h2>
            <p v-if="section.content">
              {{ rt(section.content) }}
            </p>
            <ul v-if="section.list" class="list-disc pl-6 space-y-1">
              <li v-for="(item, itemIndex) in section.list" :key="itemIndex">
                {{ rt(item) }}
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  </div>
</template>
