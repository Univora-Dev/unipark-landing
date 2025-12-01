<script setup lang="ts">
export interface PricingPlan {
  name: string
  description: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
  buttonText?: string
  badge?: string
}

defineProps<{
  title?: string
  subtitle?: string
  plans: PricingPlan[]
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FadeInUp
          v-for="(plan, index) in plans"
          :key="index"
          :delay="200 + index * 100"
        >
          <div
            :class="[
              'bg-white border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-full',
              plan.highlighted
                ? 'border-primary shadow-xl'
                : 'border-gray-200 hover:border-primary hover:shadow-xl'
            ]"
          >
            <!-- Top bar for highlighted -->
            <div v-if="plan.highlighted" class="absolute top-0 left-0 right-0 h-1 bg-blue-50 rounded-t-2xl" />

            <!-- Badge -->
            <div v-if="plan.badge" class="absolute -top-3 right-8 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              {{ plan.badge }}
            </div>

            <div class="mb-6">
              <h3 class="text-2xl font-bold text-dark-900 mb-2">
                {{ plan.name }}
              </h3>
              <p class="text-dark-600">
                {{ plan.description }}
              </p>
            </div>

            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-4xl lg:text-5xl font-bold text-primary">
                {{ plan.price }}
              </span>
              <span class="text-dark-600">
                {{ plan.period }}
              </span>
            </div>

            <Button
              :variant="plan.highlighted ? 'primary' : 'outline'"
              size="lg"
              icon="lucide:arrow-right"
              class="w-full mb-6"
            >
              {{ plan.buttonText || 'Начать' }}
            </Button>

            <div class="space-y-3 flex-1">
              <div
                v-for="(feature, featureIndex) in plan.features"
                :key="featureIndex"
                class="flex items-start gap-3"
              >
                <Icon name="lucide:check" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-dark-700 text-sm">{{ feature }}</span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
