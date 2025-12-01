<script setup lang="ts">
import type { FAQItem } from '~/types'

interface Props {
  items: FAQItem[]
}

const props = defineProps<Props>()

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(item, index) in items"
      :key="item.question"
      class="border border-dark-200 rounded-lg overflow-hidden transition-all duration-300"
      :class="{ 'ring-2 ring-primary-500': openIndex === index }"
    >
      <button
        class="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-dark-50 transition-colors"
        @click="toggle(index)"
      >
        <span class="font-semibold text-dark-900 flex-1">
          {{ item.question }}
        </span>
        <Icon
          name="lucide:chevron-down"
          class="w-5 h-5 text-primary-600 flex-shrink-0 transition-transform duration-300"
          :class="{ 'rotate-180': openIndex === index }"
        />
      </button>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-96 opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="max-h-96 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-show="openIndex === index" class="overflow-hidden">
          <div class="px-6 py-4 bg-dark-50 text-dark-700 leading-relaxed border-t border-dark-200">
            {{ item.answer }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
