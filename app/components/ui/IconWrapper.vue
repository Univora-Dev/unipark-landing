<script setup lang="ts">
interface Props {
  name: string
  size?: string | number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24
})

const sizeValue = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})
</script>

<template>
  <Icon
    :name="name"
    :style="{
      width: sizeValue,
      height: sizeValue,
      color: color
    }"
  />
</template>
