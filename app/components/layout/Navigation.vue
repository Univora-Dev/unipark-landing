<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const navItems = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.features'), path: '/features' },
  // { name: t('nav.pricing'), path: '/pricing' },
  { name: t('nav.contact'), path: '/contact' }
])

const isActive = (path: string) => {
  const currentPath = route.path
  const localizedPath = localePath(path)
  return currentPath === localizedPath || currentPath === path
}
</script>

<template>
  <nav class="flex items-center gap-8">
    <NuxtLink
      v-for="item in navItems"
      :key="item.path"
      :to="localePath(item.path)"
      :class="[
        'text-sm font-medium transition-colors relative py-2',
        {
          'text-primary-600': isActive(item.path),
          'text-dark-700 hover:text-primary-600': !isActive(item.path)
        }
      ]"
    >
      {{ item.name }}
      <span
        v-if="isActive(item.path)"
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
      />
    </NuxtLink>
  </nav>
</template>
