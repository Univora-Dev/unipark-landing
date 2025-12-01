<script setup lang="ts">
interface Props {
  number: number
  title: string
  description: string
  icon?: string
  isLast?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:circle'
})
</script>

<template>
  <div class="relative flex gap-6">
    <!-- Timeline line -->
    <div class="flex flex-col items-center">
      <div
        class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary-600 font-heading font-bold text-lg flex-shrink-0"
      >
        {{ number }}
      </div>
      <div
        v-if="!isLast"
        class="w-0.5 h-full bg-blue-50 mt-4"
      />
    </div>

    <!-- Content -->
    <div :class="['flex-1', { 'pb-12': !isLast }]">
      <div class="flex items-center gap-3 mb-3">
        <Icon v-if="icon" :name="icon" class="w-6 h-6 text-primary-600" />
        <h3 class="text-2xl font-heading font-bold text-dark-900">
          {{ title }}
        </h3>
      </div>
      <p class="text-dark-600 leading-relaxed">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>
