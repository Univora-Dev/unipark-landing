<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  product: [
    { name: 'Возможности', path: '/features' },
    { name: 'Тарифы', path: '/pricing' },
    { name: 'Кейсы', path: '/cases' },
    { name: 'Документация', path: '#' }
  ],
  company: [
    { name: 'О нас', path: '#' },
    { name: 'Блог', path: '#' },
    { name: 'Карьера', path: '#' },
    { name: 'Контакты', path: '/contact' }
  ],
  support: [
    { name: 'Помощь', path: '#' },
    { name: 'FAQ', path: '#' },
    { name: 'Техподдержка', path: '#' },
    { name: 'API', path: '#' }
  ],
  legal: [
    { name: 'Политика конфиденциальности', path: '#' },
    { name: 'Условия использования', path: '#' },
    { name: 'Публичная оферта', path: '#' }
  ]
}

const socialLinks = [
  { name: 'Telegram', icon: 'lucide:send', url: '#' },
  { name: 'WhatsApp', icon: 'lucide:message-circle', url: '#' },
  { name: 'Email', icon: 'lucide:mail', url: 'mailto:support@unipark.io' }
]
</script>

<template>
  <footer class="bg-dark-900 text-white">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <!-- Logo & Description -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-4">
            <img src="/logo.svg" alt="UniPark" class="h-8 w-auto brightness-0 invert" />
          </div>
          <p class="text-dark-300 mb-6 max-w-xs">
            Интеллектуальная система управления парковкой с распознаванием номеров и автоматизацией процессов.
          </p>
          <div class="flex items-center gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :title="social.name"
              class="p-2 rounded-lg bg-dark-800 hover:bg-primary-600 text-dark-300 hover:text-white transition-all"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Product Links -->
        <div>
          <h3 class="font-heading font-bold text-lg mb-4">Продукт</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.product" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-dark-300 hover:text-white transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="font-heading font-bold text-lg mb-4">Компания</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-dark-300 hover:text-white transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-heading font-bold text-lg mb-4">Поддержка</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.support" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-dark-300 hover:text-white transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="font-heading font-bold text-lg mb-4">Правовая информация</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.legal" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-dark-300 hover:text-white transition-colors text-sm"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-dark-800">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-dark-400 text-sm">
            © {{ currentYear }} UniPark. Все права защищены.
          </p>
          <p class="text-dark-400 text-sm">
            Сделано с ❤️ для автоматизации парковок
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
