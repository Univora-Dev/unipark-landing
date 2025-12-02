<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  titleDelay?: number
  subtitleDelay?: number
}

withDefaults(defineProps<Props>(), {
  titleDelay: 0,
  subtitleDelay: 200
})
</script>

<template>
  <section class="py-20 px-4 md:px-8 bg-blue-50">
    <div class="container-custom text-center">
      <ScrollReveal :delay="titleDelay">
        <h1 class="text-5xl md:text-6xl font-heading font-bold text-dark-900 mb-6">
          {{ title }}
        </h1>
      </ScrollReveal>
      <ScrollReveal :delay="subtitleDelay">
        <p class="text-xl text-dark-600 max-w-3xl mx-auto">
          {{ subtitle }}
        </p>
      </ScrollReveal>
    </div>
  </section>
</template>
