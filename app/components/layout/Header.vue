<script setup lang="ts">
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
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      {
        'bg-white/95 backdrop-blur-sm shadow-md': isScrolled,
        'bg-transparent': !isScrolled
      }
    ]"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center"
        >
          <img src="/logo.svg" alt="UniPark" class="h-8 w-auto" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <Navigation class="hidden md:flex" />

        <!-- CTA Button (Desktop) -->
        <div class="hidden md:block">
          <Button variant="primary" size="md" icon="lucide:rocket">
            Попробовать бесплатно
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-dark-600 hover:text-primary-600 transition-colors"
          @click="isMobileMenuOpen = true"
        >
          <Icon name="lucide:menu" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <MobileMenu v-model="isMobileMenuOpen" />
  </header>
</template>
