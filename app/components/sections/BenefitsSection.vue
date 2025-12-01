<script setup lang="ts">
export interface Benefit {
  title: string
  description: string
  icon: string
  metric?: string
  metricLabel?: string
}

defineProps<{
  title?: string
  subtitle?: string
  benefits: Benefit[]
}>()
</script>

<template>
  <section class="section bg-white">
    <div class="container-custom">
      <div class="text-center mb-12 md:mb-16">
        <FadeInUp>
          <h2 v-if="title" class="section-title">
            {{ title }}
          </h2>
        </FadeInUp>
        <FadeInUp :delay="100">
          <p v-if="subtitle" class="section-subtitle">
            {{ subtitle }}
          </p>
        </FadeInUp>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        <FadeInUp
          v-for="(benefit, index) in benefits"
          :key="index"
          :delay="200 + index * 100"
        >
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon :name="benefit.icon" class="w-7 h-7 text-primary" />
              </div>
            </div>

            <h3 class="text-xl font-semibold text-dark-900 mb-3">
              {{ benefit.title }}
            </h3>
            <p class="text-dark-600 leading-relaxed mb-4 flex-grow">
              {{ benefit.description }}
            </p>

            <div v-if="benefit.metric" class="flex items-baseline gap-2 pt-4 border-t border-gray-300 mt-auto">
              <span class="text-3xl font-bold text-primary">{{ benefit.metric }}</span>
              <span class="text-sm text-dark-600 uppercase tracking-wide">{{ benefit.metricLabel }}</span>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
