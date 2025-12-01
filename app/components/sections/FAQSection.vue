<script setup lang="ts">
import { ref } from 'vue'

export interface FAQItem {
  question: string
  answer: string
}

defineProps<{
  title?: string
  subtitle?: string
  items: FAQItem[]
}>()

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="section bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div class="space-y-4">
        <FadeInUp
          v-for="(item, index) in items"
          :key="index"
          :delay="200 + index * 50"
        >
          <div
            :class="[
              'bg-white border rounded-xl transition-all duration-300 overflow-hidden',
              openIndex === index
                ? 'border-primary shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <button
              class="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              @click="toggle(index)"
              :aria-expanded="openIndex === index"
            >
              <span class="text-lg font-semibold text-dark-900 flex-1">
                {{ item.question }}
              </span>
              <Icon
                name="lucide:chevron-down"
                :class="[
                  'w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300',
                  openIndex === index && 'rotate-180'
                ]"
              />
            </button>

            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 -translate-y-2"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="openIndex === index" class="px-6 pb-5">
                <p class="text-dark-700 leading-relaxed">
                  {{ item.answer }}
                </p>
              </div>
            </Transition>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
