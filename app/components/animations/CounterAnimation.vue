<script setup lang="ts">
interface Props {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  threshold: 0.5
})

const { count, start } = useCounter(props.target, props.duration)
const { isVisible, element } = useScrollAnimation(props.threshold, true)

watch(isVisible, (visible) => {
  if (visible) {
    start()
  }
})
</script>

<template>
  <span ref="element">
    {{ prefix }}{{ count }}{{ suffix }}
  </span>
</template>
