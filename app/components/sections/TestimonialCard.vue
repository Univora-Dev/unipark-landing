<script setup lang="ts">
import type { Testimonial } from '~/types'

interface Props {
  testimonial: Testimonial
}

const props = defineProps<Props>()
</script>

<template>
  <Card class="h-full hover:shadow-xl transition-shadow duration-300">
    <div class="p-6">
      <div class="flex items-start gap-1 mb-4">
        <Icon
          v-for="i in 5"
          :key="i"
          name="lucide:star"
          :class="[
            'w-5 h-5',
            i <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-300'
          ]"
        />
      </div>

      <p class="text-dark-700 leading-relaxed mb-6 italic">
        "{{ testimonial.text }}"
      </p>

      <div class="flex items-center gap-4 pt-4 border-t border-dark-200">
        <div
          class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-heading font-bold flex-shrink-0"
        >
          {{ testimonial.name.charAt(0) }}
        </div>
        <div>
          <div class="font-semibold text-dark-900">
            {{ testimonial.name }}
          </div>
          <div class="text-sm text-dark-600">
            {{ testimonial.position }}
            <span v-if="testimonial.company">
              · {{ testimonial.company }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
