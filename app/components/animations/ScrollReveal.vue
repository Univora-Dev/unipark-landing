<script setup lang="ts">
interface Props {
  animation?: 'fade-in' | 'fade-in-up' | 'slide-in-left' | 'slide-in-right'
  delay?: number
  threshold?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'fade-in-up',
  delay: 0,
  threshold: 0.2,
  once: true
})

const { isVisible, element } = useScrollAnimation(props.threshold, props.once)
</script>

<template>
  <div
    ref="element"
    :class="[
      'transition-all duration-600 ease-out',
      {
        'opacity-0': !isVisible,
        'opacity-100': isVisible,
        'translate-y-8': animation === 'fade-in-up' && !isVisible,
        'translate-y-0': animation === 'fade-in-up' && isVisible,
        '-translate-x-8': animation === 'slide-in-left' && !isVisible,
        'translate-x-0': animation === 'slide-in-left' && isVisible,
        'translate-x-8': animation === 'slide-in-right' && !isVisible
      }
    ]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>
