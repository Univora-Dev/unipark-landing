<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const route = useRoute()

const navItems = computed(() => [
  { name: t('nav.home'), path: '/', icon: 'lucide:home' },
  { name: t('nav.features'), path: '/features', icon: 'lucide:sparkles' },
  { name: t('nav.pricing'), path: '/pricing', icon: 'lucide:credit-card' },
  { name: t('nav.contact'), path: '/contact', icon: 'lucide:mail' }
])

const close = () => {
  emit('update:modelValue', false)
}

const isActive = (path: string) => {
  const currentPath = route.path
  const localizedPath = localePath(path)
  return currentPath === localizedPath || currentPath === path
}

// Close on route change
watch(() => route.path, () => {
  close()
})

// Prevent body scroll when menu is open
watch(() => props.modelValue, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
        @click="close"
      >
        <Transition
          enter-active-class="transition-transform duration-300"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-300"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-if="modelValue"
            class="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-dark-200">
              <div class="flex items-center gap-2 text-xl font-heading font-bold text-primary-600">
                <Icon name="lucide:parking-circle" class="w-6 h-6" />
                <span>UniPark</span>
              </div>
              <button
                class="p-2 text-dark-400 hover:text-dark-600 transition-colors"
                @click="close"
              >
                <Icon name="lucide:x" class="w-6 h-6" />
              </button>
            </div>

            <!-- Navigation -->
            <nav class="p-6 space-y-2">
              <NuxtLink
                v-for="item in navItems"
                :key="item.path"
                :to="localePath(item.path)"
                :class="[
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                  {
                    'bg-primary-50 text-primary-600 font-semibold': isActive(item.path),
                    'text-dark-700 hover:bg-dark-50': !isActive(item.path)
                  }
                ]"
              >
                <Icon :name="item.icon" class="w-5 h-5" />
                <span>{{ item.name }}</span>
              </NuxtLink>
            </nav>

            <!-- Language Switcher -->
            <div class="px-6 py-4 border-t border-dark-200">
              <LanguageSwitcher />
            </div>

            <!-- CTA Button -->
            <div class="p-6 border-t border-dark-200">
              <Button
                variant="primary"
                size="lg"
                icon="lucide:rocket"
                class="w-full"
              >
                {{ t('common.tryFree') }}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
