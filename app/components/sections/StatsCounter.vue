<script setup lang="ts">
import type { Stat } from '~/types'

interface Props {
  title?: string
  subtitle?: string
  stats: Stat[]
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'bg-gradient-to-br from-primary-600 to-primary-800'
})
</script>

<template>
  <section :class="['py-20 px-4 md:px-8', backgroundColor]">
    <div class="container-custom">
      <div v-if="title || subtitle" class="text-center mb-16">
        <ScrollReveal v-if="title">
          <h2 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {{ title }}
          </h2>
        </ScrollReveal>
        <ScrollReveal v-if="subtitle" :delay="200">
          <p class="text-xl text-white/90 max-w-2xl mx-auto">
            {{ subtitle }}
          </p>
        </ScrollReveal>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        <ScrollReveal
          v-for="(stat, index) in stats"
          :key="stat.label"
          :delay="100 * index"
        >
          <div class="text-center">
            <div class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-3">
              <CounterAnimation
                :target="stat.value"
                :suffix="stat.suffix"
                :prefix="stat.prefix"
              />
            </div>
            <p class="text-base md:text-lg text-white/80">
              {{ stat.label }}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
