<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  description?: string
  primaryButtonText?: string
  primaryButtonIcon?: string
  secondaryButtonText?: string
  secondaryButtonIcon?: string
  backgroundGradient?: string
}

const props = withDefaults(defineProps<Props>(), {
  primaryButtonText: 'Начать',
  primaryButtonIcon: 'lucide:rocket',
  backgroundGradient: 'from-primary-50 to-accent-50'
})

const emit = defineEmits<{
  primaryClick: []
  secondaryClick: []
}>()
</script>

<template>
  <section
    :class="[
      'relative min-h-screen flex items-center justify-center',
      'bg-gradient-to-br',
      backgroundGradient,
      'py-20 px-4 md:px-8'
    ]"
  >
    <div class="container-custom text-center">
      <FadeInUp>
        <h1 class="section-title text-primary-600 mb-6">
          {{ title }}
        </h1>
      </FadeInUp>

      <FadeInUp :delay="200">
        <p class="section-subtitle mb-4">
          {{ subtitle }}
        </p>
      </FadeInUp>

      <FadeInUp v-if="description" :delay="300">
        <p class="text-lg text-dark-600 mb-8 max-w-2xl mx-auto">
          {{ description }}
        </p>
      </FadeInUp>

      <FadeInUp :delay="400">
        <div class="flex flex-wrap gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            :icon="primaryButtonIcon"
            @click="emit('primaryClick')"
          >
            {{ primaryButtonText }}
          </Button>

          <Button
            v-if="secondaryButtonText"
            variant="outline"
            size="lg"
            :icon="secondaryButtonIcon"
            @click="emit('secondaryClick')"
          >
            {{ secondaryButtonText }}
          </Button>
        </div>
      </FadeInUp>

      <FadeInUp v-if="$slots.default" :delay="600">
        <div class="mt-16">
          <slot />
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
