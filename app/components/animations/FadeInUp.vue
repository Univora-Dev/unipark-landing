<script setup lang="ts">
interface Props {
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0
})
</script>

<template>
  <ScrollReveal animation="fade-in-up" :delay="delay">
    <slot />
  </ScrollReveal>
</template>
