<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  buttonText?: string
  buttonIcon?: string
  secondaryButtonText?: string
  secondaryButtonIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Начать',
  buttonIcon: 'lucide:rocket'
})

const emit = defineEmits<{
  buttonClick: []
  secondaryClick: []
}>()
</script>

<template>
  <section
    class="py-20 px-4 md:px-8 bg-blue-50"
  >
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-6">
            {{ title }}
          </h2>
        </ScrollReveal>

        <ScrollReveal v-if="subtitle" :delay="200">
          <p class="text-xl text-dark-700 mb-8 max-w-2xl mx-auto">
            {{ subtitle }}
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="300">
          <div class="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              :icon="buttonIcon"
              @click="emit('buttonClick')"
            >
              {{ buttonText }}
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
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
