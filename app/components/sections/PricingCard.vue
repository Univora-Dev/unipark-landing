<script setup lang="ts">
import type { PricingPlan } from '~/types'

interface Props {
  plan: PricingPlan
  featured?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [plan: PricingPlan]
}>()
</script>

<template>
  <Card
    :class="[
      'relative h-full transition-all duration-300',
      {
        'border-2 border-primary-500 shadow-2xl scale-105': featured,
        'hover:shadow-xl hover:-translate-y-1': !featured
      }
    ]"
  >
    <div v-if="featured" class="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
      Популярный
    </div>

    <div class="p-8">
      <h3 class="text-2xl font-heading font-bold text-dark-900 mb-2">
        {{ plan.name }}
      </h3>
      <p class="text-dark-600 mb-6">
        {{ plan.description }}
      </p>

      <div class="mb-6">
        <div class="flex items-baseline gap-1">
          <span class="text-5xl font-heading font-bold text-primary-600">
            {{ plan.price }}
          </span>
          <span v-if="plan.period" class="text-dark-600">
            / {{ plan.period }}
          </span>
        </div>
        <p v-if="plan.priceDescription" class="text-sm text-dark-500 mt-2">
          {{ plan.priceDescription }}
        </p>
      </div>

      <Button
        :variant="featured ? 'primary' : 'outline'"
        size="lg"
        class="w-full mb-8"
        @click="emit('select', plan)"
      >
        {{ plan.buttonText || 'Выбрать план' }}
      </Button>

      <div class="space-y-4">
        <div
          v-for="feature in plan.features"
          :key="feature"
          class="flex items-start gap-3"
        >
          <Icon
            name="lucide:check"
            class="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5"
          />
          <span class="text-dark-700">{{ feature }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>
