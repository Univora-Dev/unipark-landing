<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  description?: string
  primaryButtonText?: string
  primaryButtonIcon?: string
  secondaryButtonText?: string
  secondaryButtonIcon?: string
  images?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  primaryButtonText: 'Начать',
  primaryButtonIcon: 'lucide:rocket',
  images: () => []
})

const emit = defineEmits<{
  primaryClick: []
  secondaryClick: []
}>()

// Slider state
const currentSlide = ref(0)

const nextSlide = () => {
  if (props.images.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % props.images.length
  }
}

const prevSlide = () => {
  if (props.images.length > 0) {
    currentSlide.value = (currentSlide.value - 1 + props.images.length) % props.images.length
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}
</script>

<template>
  <section class="relative bg-blue-50 overflow-hidden pb-20 md:pb-24">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Decorative Orbs -->
      <div class="absolute top-20 -left-20 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div class="absolute top-40 -right-20 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />

      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>

    <!-- Main Content -->
    <div class="relative container-custom pt-16 md:pt-20 px-4 md:px-8">
      <!-- Text Content -->
      <div class="max-w-4xl mx-auto text-center mb-16">
        <FadeInUp>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-dark-900">
            {{ title.split(' ').slice(0, -1).join(' ') }}
            <span class="text-primary-600">{{ title.split(' ').slice(-1)[0] }}</span>
          </h1>
        </FadeInUp>

        <FadeInUp :delay="200">
          <p class="text-lg md:text-xl text-dark-700 mb-8 max-w-3xl mx-auto">
            {{ subtitle }}
          </p>
        </FadeInUp>

        <FadeInUp v-if="description" :delay="300">
          <p class="text-lg text-dark-600 mb-12 max-w-3xl mx-auto">
            {{ description }}
          </p>
        </FadeInUp>

        <FadeInUp :delay="400">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              :icon="primaryButtonIcon"
              class="text-lg px-8 py-4"
              @click="emit('primaryClick')"
            >
              {{ primaryButtonText }}
            </Button>

            <Button
              v-if="secondaryButtonText"
              variant="outline"
              size="lg"
              :icon="secondaryButtonIcon"
              class="text-lg px-8 py-4"
              @click="emit('secondaryClick')"
            >
              {{ secondaryButtonText }}
            </Button>
          </div>
        </FadeInUp>
      </div>

      <!-- Screenshot Slider -->
      <FadeInUp v-if="images.length > 0" :delay="600">
        <div class="max-w-7xl mx-auto pb-20 lg:pb-24">
          <div class="relative group">
            <!-- Decorative Elements -->
            <div class="absolute -inset-4 bg-blue-50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <!-- Slider Container -->
            <div class="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <!-- Slides -->
              <div class="relative w-full" style="height: 500px;">
                <TransitionGroup name="slide">
                  <div
                    v-for="(image, index) in images"
                    v-show="currentSlide === index"
                    :key="index"
                    class="absolute inset-0"
                  >
                    <NuxtImg
                      :src="image"
                      :alt="`UniPark Screenshot ${index + 1}`"
                      class="w-full h-full object-contain"
                      loading="eager"
                      format="webp"
                    />
                  </div>
                </TransitionGroup>
              </div>

              <!-- Navigation Arrows -->
              <button
                v-if="images.length > 1"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                @click="prevSlide"
              >
                <Icon name="lucide:chevron-left" class="w-6 h-6 text-dark-900" />
              </button>
              <button
                v-if="images.length > 1"
                class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                @click="nextSlide"
              >
                <Icon name="lucide:chevron-right" class="w-6 h-6 text-dark-900" />
              </button>
            </div>

            <!-- Thumbnail Navigation -->
            <div v-if="images.length > 1" class="hidden lg:flex absolute -bottom-16 left-1/2 -translate-x-1/2 gap-3 bg-white rounded-2xl shadow-xl p-3 border border-gray-200">
              <button
                v-for="(image, index) in images"
                :key="index"
                class="group/thumb relative overflow-hidden rounded-lg transition-all duration-300"
                :class="[
                  currentSlide === index
                    ? 'ring-2 ring-primary-500 scale-105'
                    : 'opacity-60 hover:opacity-100'
                ]"
                @click="goToSlide(index)"
              >
                <NuxtImg
                  :src="image"
                  :alt="`Thumbnail ${index + 1}`"
                  class="w-24 h-16 object-cover"
                  loading="eager"
                  format="webp"
                />
                <!-- Overlay on hover -->
                <div class="absolute inset-0 bg-primary-500/0 group-hover/thumb:bg-primary-500/10 transition-colors duration-300" />
              </button>
            </div>

            <!-- Dot Indicators (Mobile) -->
            <div v-if="images.length > 1" class="flex lg:hidden justify-center gap-2 mt-6">
              <button
                v-for="(_, index) in images"
                :key="index"
                class="transition-all duration-300"
                :class="[
                  currentSlide === index
                    ? 'w-8 h-2 bg-primary-500'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                ]"
                style="border-radius: 9999px"
                @click="goToSlide(index)"
              />
            </div>
          </div>
        </div>
      </FadeInUp>

      <FadeInUp v-if="$slots.default" :delay="800">
        <div class="mt-24">
          <slot />
        </div>
      </FadeInUp>
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  opacity: 0;
}
</style>
