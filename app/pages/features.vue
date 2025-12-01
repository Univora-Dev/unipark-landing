<script setup lang="ts">
import type { Feature } from '~/types'

definePageMeta({
  layout: 'default'
})

useSEO({
  title: 'Возможности UniPark - Интеллектуальная система управления парковкой',
  description: 'Автоматическое распознавание номеров, гибкие тарифы, аналитика и интеграции - всё для эффективного управления парковкой',
  keywords: 'возможности системы парковки, распознавание номеров, управление парковкой, автоматизация'
})

const mainFeatures: Feature[] = [
  {
    title: 'Распознавание номеров',
    description: 'Автоматическое распознавание государственных номеров через камеры с точностью 99.5%. Поддержка всех типов номеров и работа в любых погодных условиях.',
    icon: 'lucide:camera'
  },
  {
    title: 'Гибкие тарифы',
    description: 'Настройте любые тарифные планы: почасовые, посуточные, абонементы. Разные тарифы для разных зон парковки и типов клиентов.',
    icon: 'lucide:calculator'
  },
  {
    title: 'Контроль доступа',
    description: 'Автоматическое открытие шлагбаума для зарегистрированных автомобилей. Белые и черные списки. История всех въездов и выездов.',
    icon: 'lucide:shield-check'
  },
  {
    title: 'Аналитика и отчеты',
    description: 'Детальная статистика по загрузке парковки, выручке, популярным часам. Экспорт отчетов в Excel и PDF. Прогнозирование загрузки.',
    icon: 'lucide:line-chart'
  },
  {
    title: 'Интеграции',
    description: 'REST API для интеграции с вашими системами. Webhook уведомления. Готовые интеграции с 1С, CRM и платежными системами.',
    icon: 'lucide:plug'
  },
  {
    title: 'Мобильное приложение',
    description: 'Управляйте парковкой со смартфона. Получайте уведомления о событиях. Проверяйте статистику в реальном времени.',
    icon: 'lucide:smartphone'
  }
]

const additionalFeatures: Feature[] = [
  {
    title: 'Безопасность данных',
    description: 'Шифрование всех данных. Регулярное резервное копирование. Соответствие требованиям 152-ФЗ.',
    icon: 'lucide:lock'
  },
  {
    title: 'Техподдержка 24/7',
    description: 'Круглосуточная поддержка по телефону и в чате. Помощь в настройке и обновлениях.',
    icon: 'lucide:headphones'
  },
  {
    title: 'Масштабируемость',
    description: 'От 1 до 1000+ камер. Поддержка нескольких парковок в одной системе.',
    icon: 'lucide:maximize-2'
  },
  {
    title: 'Обновления',
    description: 'Регулярные обновления с новыми функциями. Автоматическая установка без простоя.',
    icon: 'lucide:refresh-cw'
  },
  {
    title: 'Уведомления',
    description: 'Email и SMS уведомления клиентам. Push-уведомления администраторам. Настраиваемые триггеры.',
    icon: 'lucide:bell'
  },
  {
    title: 'Мультиязычность',
    description: 'Поддержка русского, английского и других языков. Локализация интерфейса и отчетов.',
    icon: 'lucide:languages'
  }
]

const timeline = [
  {
    number: 1,
    title: 'Установка камер',
    description: 'Устанавливаем камеры на въезде и выезде с парковки. Настраиваем оптимальный угол обзора для распознавания номеров.',
    icon: 'lucide:camera'
  },
  {
    number: 2,
    title: 'Настройка тарифов',
    description: 'Создаем тарифные планы под ваш бизнес. Настраиваем зоны парковки, абонементы и специальные предложения.',
    icon: 'lucide:settings'
  },
  {
    number: 3,
    title: 'Запуск системы',
    description: 'Тестируем систему и запускаем в работу. Обучаем ваших сотрудников работе с панелью управления.',
    icon: 'lucide:play-circle'
  },
  {
    number: 4,
    title: 'Мониторинг',
    description: 'Отслеживаем работу системы 24/7. Анализируем данные и оптимизируем настройки для максимальной эффективности.',
    icon: 'lucide:activity'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 md:px-8 bg-blue-50">
      <div class="container-custom text-center">
        <ScrollReveal>
          <h1 class="text-5xl md:text-6xl font-heading font-bold text-dark-900 mb-6">
            Возможности UniPark
          </h1>
        </ScrollReveal>
        <ScrollReveal :delay="200">
          <p class="text-xl text-dark-600 max-w-3xl mx-auto">
            Полный набор инструментов для автоматизации и управления вашей парковкой
          </p>
        </ScrollReveal>
      </div>
    </section>

    <!-- Main Features -->
    <FeaturesGrid
      title="Ключевые возможности"
      subtitle="Всё необходимое для эффективной работы парковки"
      :features="mainFeatures"
    />

    <!-- Product Screenshots -->
    <section class="py-20 px-4 md:px-8">
      <div class="container-custom">
        <div class="text-center mb-16">
          <ScrollReveal>
            <h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Интерфейс системы
            </h2>
          </ScrollReveal>
          <ScrollReveal :delay="200">
            <p class="text-xl text-dark-600 max-w-2xl mx-auto">
              Удобная панель управления с полным контролем над парковкой
            </p>
          </ScrollReveal>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal :delay="0">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/1.jpg"
                alt="Панель управления UniPark"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="100">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/2.jpg"
                alt="Аналитика и отчеты"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="200">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/3.jpg"
                alt="Управление тарифами"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal :delay="300">
            <div class="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <NuxtImg
                src="/images/screenshots/4.jpg"
                alt="Мониторинг в реальном времени"
                class="w-full h-auto"
                loading="lazy"
                format="webp"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 px-4 md:px-8 bg-dark-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <ScrollReveal>
            <h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Как это работает
            </h2>
          </ScrollReveal>
          <ScrollReveal :delay="200">
            <p class="text-xl text-dark-600 max-w-2xl mx-auto">
              От установки до полноценной работы за 4 простых шага
            </p>
          </ScrollReveal>
        </div>

        <div class="max-w-3xl mx-auto">
          <ScrollReveal
            v-for="(step, index) in timeline"
            :key="step.number"
            :delay="100 * index"
          >
            <TimelineStep
              :number="step.number"
              :title="step.title"
              :description="step.description"
              :icon="step.icon"
              :is-last="index === timeline.length - 1"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Additional Features -->
    <FeaturesGrid
      title="Дополнительные возможности"
      subtitle="Ещё больше функций для комфортной работы"
      :features="additionalFeatures"
      :columns="3"
    />

    <!-- CTA -->
    <CTASection
      title="Готовы попробовать UniPark?"
      subtitle="Получите бесплатный доступ на 14 дней и оцените все возможности системы"
      button-text="Начать бесплатный период"
      secondary-button-text="Связаться с экспертом"
      secondary-button-icon="lucide:message-circle"
    />
  </div>
</template>
