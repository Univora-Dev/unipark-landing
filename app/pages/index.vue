<script setup lang="ts">
import type { Feature, Stat } from '~/types'

definePageMeta({
  layout: 'default'
})

useSEO({
  title: 'UniPark - Автоматизация парковки без лишних усилий',
  description: 'Интеллектуальная система управления парковкой с распознаванием номеров, гибкими тарифами и контролем в реальном времени',
  keywords: 'система управления парковкой, автоматизация парковки, распознавание номеров'
})

const features: Feature[] = [
  {
    title: 'Автоматизация',
    description: 'Распознавание номеров через камеры в режиме реального времени',
    icon: 'lucide:camera'
  },
  {
    title: 'Гибкие тарифы',
    description: 'Разовые, посуточные и почасовые тарифы для любого бизнеса',
    icon: 'lucide:calculator'
  },
  {
    title: 'Контроль 24/7',
    description: 'Мониторинг и управление парковкой в реальном времени',
    icon: 'lucide:bar-chart-3'
  },
  {
    title: 'Аналитика',
    description: 'Детальные отчеты и статистика по загрузке парковки',
    icon: 'lucide:line-chart'
  },
  {
    title: 'Интеграции',
    description: 'API для интеграции с вашими системами',
    icon: 'lucide:plug'
  },
  {
    title: 'Безопасность',
    description: 'Защита данных и резервное копирование',
    icon: 'lucide:shield-check'
  }
]

const stats: Stat[] = [
  { value: 50, label: 'Макс. размер запроса', suffix: 'MB' },
  { value: 60, label: 'Защита от дублирования', suffix: ' сек' },
  { value: 3, label: 'Типа тарификации' },
  { value: 100, label: 'Точность распознавания', suffix: '%' }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="UniPark"
      subtitle="Автоматизация парковки без лишних усилий"
      description="Интеллектуальная система управления парковкой с распознаванием номеров, гибкими тарифами и контролем в реальном времени"
      primary-button-text="Попробовать бесплатно"
      secondary-button-text="Смотреть демо"
      secondary-button-icon="lucide:play-circle"
    >
      <!-- Можно добавить дополнительный контент в слот -->
    </HeroSection>

    <!-- Features Section -->
    <FeaturesGrid
      title="Возможности системы"
      subtitle="Всё необходимое для автоматизации вашей парковки"
      :features="features"
    />

    <!-- Stats Section -->
    <StatsCounter
      title="UniPark в цифрах"
      subtitle="Наша система обрабатывает тысячи въездов ежедневно"
      :stats="stats"
    />

    <!-- CTA Section -->
    <CTASection
      title="Готовы начать?"
      subtitle="Попробуйте UniPark бесплатно в течение 14 дней. Без привязки карты."
      button-text="Начать бесплатный период"
      secondary-button-text="Связаться с нами"
      secondary-button-icon="lucide:mail"
    />
  </div>
</template>
