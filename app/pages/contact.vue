<script setup lang="ts">
import type { ContactFormData } from '~/types'

definePageMeta({
  layout: 'default'
})

useSEO({
  title: 'Контакты UniPark - Свяжитесь с нами',
  description: 'Остались вопросы? Свяжитесь с нами любым удобным способом. Ответим в течение 15 минут.',
  keywords: 'контакты unipark, связаться с нами, техподдержка, консультация'
})

const handleSubmit = async (data: ContactFormData) => {
  console.log('Form submitted:', data)
  // TODO: Отправить данные на API
  // В будущем здесь будет реальная отправка на ваш API endpoint
}

const contactInfo = [
  {
    icon: 'lucide:mail',
    title: 'Email',
    value: 'info@unipark.io',
    description: 'Ответим в течение 1 часа',
    link: 'mailto:info@unipark.io'
  },
  {
    icon: 'lucide:phone',
    title: 'Телефон',
    value: '+7 (495) 123-45-67',
    description: 'Пн-Пт с 9:00 до 18:00',
    link: 'tel:+74951234567'
  },
  {
    icon: 'lucide:message-circle',
    title: 'Telegram',
    value: '@unipark_support',
    description: 'Быстрые ответы 24/7',
    link: 'https://t.me/unipark_support'
  },
  {
    icon: 'lucide:map-pin',
    title: 'Офис',
    value: 'Москва, ул. Примерная, 123',
    description: 'Посещение по записи',
    link: '#'
  }
]

const workingHours = [
  { day: 'Понедельник - Пятница', time: '9:00 - 18:00' },
  { day: 'Суббота', time: '10:00 - 16:00' },
  { day: 'Воскресенье', time: 'Выходной' }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 md:px-8 bg-blue-50">
      <div class="container-custom text-center">
        <ScrollReveal>
          <h1 class="text-5xl md:text-6xl font-heading font-bold text-dark-900 mb-6">
            Свяжитесь с нами
          </h1>
        </ScrollReveal>
        <ScrollReveal :delay="200">
          <p class="text-xl text-dark-600 max-w-3xl mx-auto">
            Ответим на все ваши вопросы и поможем подобрать оптимальное решение для вашего бизнеса
          </p>
        </ScrollReveal>
      </div>
    </section>

    <!-- Contact Info Cards -->
    <section class="py-20 px-4 md:px-8">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <ScrollReveal
            v-for="(info, index) in contactInfo"
            :key="info.title"
            :delay="100 * index"
          >
            <a
              :href="info.link"
              class="group"
            >
              <Card class="h-full text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="p-6">
                  <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon :name="info.icon" class="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 class="text-lg font-heading font-bold text-dark-900 mb-2">
                    {{ info.title }}
                  </h3>
                  <p class="text-primary-600 font-semibold mb-1">
                    {{ info.value }}
                  </p>
                  <p class="text-sm text-dark-600">
                    {{ info.description }}
                  </p>
                </div>
              </Card>
            </a>
          </ScrollReveal>
        </div>

        <!-- Contact Form & Info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Form -->
          <div class="lg:col-span-2">
            <ScrollReveal>
              <Card class="p-8">
                <h2 class="text-3xl font-heading font-bold text-dark-900 mb-2">
                  Отправьте нам сообщение
                </h2>
                <p class="text-dark-600 mb-8">
                  Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                </p>
                <ContactForm @submit="handleSubmit" />
              </Card>
            </ScrollReveal>
          </div>

          <!-- Additional Info -->
          <div class="space-y-6">
            <!-- Working Hours -->
            <ScrollReveal :delay="200">
              <Card class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Icon name="lucide:clock" class="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 class="text-xl font-heading font-bold text-dark-900">
                    Часы работы
                  </h3>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="schedule in workingHours"
                    :key="schedule.day"
                    class="flex justify-between items-center pb-3 border-b border-dark-100 last:border-0 last:pb-0"
                  >
                    <span class="text-dark-700">{{ schedule.day }}</span>
                    <span class="font-semibold text-dark-900">{{ schedule.time }}</span>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <!-- Quick Links -->
            <ScrollReveal :delay="300">
              <Card class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <Icon name="lucide:help-circle" class="w-5 h-5 text-accent-600" />
                  </div>
                  <h3 class="text-xl font-heading font-bold text-dark-900">
                    Полезные ссылки
                  </h3>
                </div>
                <div class="space-y-3">
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:book-open" class="w-4 h-4" />
                    <span>База знаний</span>
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:file-text" class="w-4 h-4" />
                    <span>Документация API</span>
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:video" class="w-4 h-4" />
                    <span>Видеоуроки</span>
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                  >
                    <Icon name="lucide:message-square" class="w-4 h-4" />
                    <span>Форум поддержки</span>
                  </NuxtLink>
                </div>
              </Card>
            </ScrollReveal>

            <!-- Social Media -->
            <ScrollReveal :delay="400">
              <Card class="p-6">
                <h3 class="text-xl font-heading font-bold text-dark-900 mb-4">
                  Мы в соцсетях
                </h3>
                <div class="flex gap-3">
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-dark-100 hover:bg-primary-600 flex items-center justify-center text-dark-600 hover:text-white transition-all"
                  >
                    <Icon name="lucide:send" class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-dark-100 hover:bg-primary-600 flex items-center justify-center text-dark-600 hover:text-white transition-all"
                  >
                    <Icon name="lucide:message-circle" class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-dark-100 hover:bg-primary-600 flex items-center justify-center text-dark-600 hover:text-white transition-all"
                  >
                    <Icon name="lucide:mail" class="w-5 h-5" />
                  </a>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Placeholder) -->
    <section class="py-20 px-4 md:px-8 bg-dark-50">
      <div class="container-custom">
        <ScrollReveal>
          <h2 class="text-4xl font-heading font-bold text-dark-900 mb-8 text-center">
            Наш офис на карте
          </h2>
        </ScrollReveal>
        <ScrollReveal :delay="200">
          <div class="bg-dark-200 rounded-2xl h-96 flex items-center justify-center">
            <div class="text-center">
              <Icon name="lucide:map-pin" class="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <p class="text-dark-600">
                Здесь будет карта с местоположением офиса
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- CTA -->
    <CTASection
      title="Предпочитаете живое общение?"
      subtitle="Запишитесь на онлайн-демонстрацию системы с нашим экспертом"
      button-text="Записаться на демо"
      button-icon="lucide:video"
      secondary-button-text="Задать вопрос"
      secondary-button-icon="lucide:message-circle"
    />
  </div>
</template>
