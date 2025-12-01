<script setup lang="ts">
import type { CardPadding } from '~/types'

interface Props {
  hover?: boolean
  padding?: CardPadding
  noBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  padding: 'md',
  noBorder: false
})

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}
</script>

<template>
  <div
    :class="[
      'card',
      paddingClasses[padding],
      { 'hover:shadow-2xl hover:-translate-y-1': hover },
      { 'border-0 shadow-none': noBorder }
    ]"
  >
    <slot />
  </div>
</template>
