<script setup lang="ts">
const route = useRoute()

const navItems = [
  { name: 'Главная', path: '/' },
  { name: 'Возможности', path: '/features' },
  { name: 'Тарифы', path: '/pricing' },
  { name: 'Кейсы', path: '/cases' },
  { name: 'Контакты', path: '/contact' }
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="flex items-center gap-8">
    <NuxtLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
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
