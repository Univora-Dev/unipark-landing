<script setup lang="ts">
import type { ButtonVariant, ButtonSize } from '~/types'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconRight?: string
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button'
})

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

const variantClasses = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  outline: 'btn-outline',
  ghost: 'bg-transparent hover:bg-dark-100 text-dark-700'
}

const component = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn',
      variantClasses[variant],
      sizeClasses[size],
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
  >
    <Icon v-if="icon && !loading" :name="icon" class="w-5 h-5" />
    <Icon v-if="loading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
    <slot />
    <Icon v-if="iconRight && !loading" :name="iconRight" class="w-5 h-5" />
  </component>
</template>
