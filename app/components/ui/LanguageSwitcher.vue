<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.filter((l): l is { code: string; name: string } => typeof l !== 'string')
})

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value)
})

const changeLocale = async (code: string) => {
  await setLocale(code)
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Close dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const getFlagEmoji = (code: string) => {
  const flags: Record<string, string> = {
    ru: 'RU',
    uz: 'UZ',
    en: 'EN'
  }
  return flags[code] || code.toUpperCase()
}
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors rounded-lg hover:bg-dark-50"
      @click="toggleDropdown"
    >
      <span class="font-semibold">{{ getFlagEmoji(locale) }}</span>
      <Icon
        name="lucide:chevron-down"
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-dark-100 overflow-hidden z-50"
      >
        <NuxtLink
          v-for="loc in availableLocales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          class="flex items-center gap-3 px-4 py-3 text-sm hover:bg-dark-50 transition-colors"
          :class="{
            'bg-primary-50 text-primary-600 font-medium': loc.code === locale,
            'text-dark-700': loc.code !== locale
          }"
          @click="isOpen = false"
        >
          <span class="font-semibold">{{ getFlagEmoji(loc.code) }}</span>
          <span>{{ loc.name }}</span>
          <Icon
            v-if="loc.code === locale"
            name="lucide:check"
            class="w-4 h-4 ml-auto text-primary-600"
          />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>
