<script setup lang="ts">
import type { CaseStudy } from '~/types'

interface Props {
  caseStudy: CaseStudy
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [caseStudy: CaseStudy]
}>()
</script>

<template>
  <Card
    class="group cursor-pointer h-full hover:shadow-2xl transition-all duration-300 overflow-hidden"
    @click="emit('click', caseStudy)"
  >
    <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-primary-100 to-accent-100">
      <NuxtImg
        v-if="caseStudy.image"
        :src="caseStudy.image"
        :alt="caseStudy.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon name="lucide:image" class="w-16 h-16 text-primary-300" />
      </div>
    </div>

    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {{ caseStudy.industry }}
        </span>
        <span v-if="caseStudy.year" class="text-sm text-dark-500">
          {{ caseStudy.year }}
        </span>
      </div>

      <h3 class="text-2xl font-heading font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
        {{ caseStudy.title }}
      </h3>

      <p class="text-dark-600 mb-4 line-clamp-3">
        {{ caseStudy.description }}
      </p>

      <div v-if="caseStudy.results" class="grid grid-cols-2 gap-4 pt-4 border-t border-dark-200">
        <div v-for="result in caseStudy.results" :key="result.label" class="text-center">
          <div class="text-2xl font-heading font-bold text-accent-600 mb-1">
            {{ result.value }}
          </div>
          <div class="text-sm text-dark-600">
            {{ result.label }}
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
        <span>Подробнее</span>
        <Icon name="lucide:arrow-right" class="w-5 h-5" />
      </div>
    </div>
  </Card>
</template>
