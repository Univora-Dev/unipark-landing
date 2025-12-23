<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- Top Bar -->
    <div class="bg-dark-50 border-b border-dark-100 hidden md:block">
      <div class="container-custom">
        <div class="flex items-center justify-between h-10 text-sm">
          <!-- Contact Info -->
          <div class="flex items-center gap-2 text-dark-600">
            <span>{{ t('header.contactManager') }}:</span>
            <a href="tel:+998992208484" class="font-semibold text-dark-900 hover:text-primary-600 transition-colors">
              +998 99 220 84 84
            </a>
          </div>

          <!-- Right Side: Language & Login -->
          <div class="flex items-center gap-4">
            <LanguageSwitcher />
            <a href="https://app.unipark.uz/" target="_blank" class="flex items-center gap-1 text-dark-600 hover:text-primary-600 transition-colors">
              {{ t('header.login') }}
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div
      :class="[
        'transition-all duration-300',
        {
          'bg-white/95 backdrop-blur-sm shadow-md': isScrolled,
          'bg-white': !isScrolled
        }
      ]"
    >
      <div class="container-custom">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <NuxtLink
            :to="localePath('/')"
            class="flex items-center"
          >
            <img src="/logo.svg" alt="UniPark" class="h-8 w-auto" />
          </NuxtLink>

          <!-- Desktop Navigation -->
          <Navigation class="hidden md:flex" />

          <!-- CTA Button (Desktop) -->
          <div class="hidden md:flex items-center">
            <Button variant="primary" size="md" @click="useContactModal().open()">
              {{ t('header.getDemo') }}
            </Button>
          </div>

          <!-- Mobile: Language & Menu -->
          <div class="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              class="p-2 text-dark-600 hover:text-primary-600 transition-colors"
              @click="isMobileMenuOpen = true"
            >
              <Icon name="lucide:menu" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <MobileMenu v-model="isMobileMenuOpen" />
  </header>
</template>
