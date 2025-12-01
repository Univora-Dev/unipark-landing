<script setup lang="ts">
import type { Feature } from '~/types'

interface Props {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3
})

const gridClasses = computed(() => {
  const cols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }
  return cols[props.columns]
})
</script>

<template>
  <section class="section px-4 md:px-8 bg-white">
    <div class="container-custom">
      <div v-if="title || subtitle" class="text-center mb-12 md:mb-16">
        <ScrollReveal v-if="title">
          <h2 class="section-title">
            {{ title }}
          </h2>
        </ScrollReveal>
        <ScrollReveal v-if="subtitle" :delay="200">
          <p class="section-subtitle">
            {{ subtitle }}
          </p>
        </ScrollReveal>
      </div>

      <div :class="['grid grid-cols-1 gap-8', gridClasses]">
        <ScrollReveal
          v-for="(feature, index) in features"
          :key="feature.title"
          :delay="100 * index"
        >
          <Card class="h-full hover:shadow-xl transition-shadow duration-300">
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center"
              >
                <Icon
                  :name="feature.icon"
                  class="w-8 h-8 text-primary-600"
                />
              </div>
              <h3 class="text-xl font-heading font-bold text-dark-900 mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-dark-600 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
