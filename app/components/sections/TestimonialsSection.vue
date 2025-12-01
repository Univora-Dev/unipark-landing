<script setup lang="ts">
export interface Testimonial {
  name: string
  position: string
  company: string
  content: string
  avatar?: string
  rating?: number
}

defineProps<{
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}>()
</script>

<template>
  <section class="section bg-blue-50">
    <div class="container-custom">
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FadeInUp
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :delay="200 + index * 100"
        >
          <div class="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
            <div class="flex items-center gap-4 mb-4">
              <div v-if="testimonial.avatar" class="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div v-else class="w-14 h-14 rounded-full bg-blue-50 border-2 border-primary/20 flex items-center justify-center">
                <span class="text-xl font-semibold text-primary">
                  {{ testimonial.name.charAt(0) }}
                </span>
              </div>

              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-dark-900 truncate">
                  {{ testimonial.name }}
                </h4>
                <p class="text-sm text-dark-600 truncate">
                  {{ testimonial.position }}
                </p>
                <p class="text-sm text-primary font-medium truncate">
                  {{ testimonial.company }}
                </p>
              </div>
            </div>

            <div v-if="testimonial.rating" class="flex gap-1 mb-4">
              <Icon
                v-for="star in 5"
                :key="star"
                name="lucide:star"
                :class="[
                  'w-4 h-4',
                  star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                ]"
              />
            </div>

            <blockquote class="text-dark-700 leading-relaxed relative pl-6 flex-1">
              <Icon name="lucide:quote" class="absolute left-0 top-0 w-4 h-4 text-primary/30" />
              {{ testimonial.content }}
            </blockquote>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
