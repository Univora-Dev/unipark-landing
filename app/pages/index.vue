<script setup lang="ts">
import type { Feature, Stat } from '~/types'
import type { Benefit } from '~/components/sections/BenefitsSection.vue'
import type { Testimonial } from '~/components/sections/TestimonialsSection.vue'
import type { PricingPlan } from '~/components/sections/PricingSection.vue'
import type { FAQItem } from '~/components/sections/FAQSection.vue'

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
  { value: 30, label: 'Увеличение прибыли', suffix: '%' },
  { value: 98, label: 'Точность распознавания', suffix: '%' },
  { value: 100, label: 'Довольных клиентов', suffix: '+' },
  { value: 0, label: 'Потерянных транзакций', suffix: '' }
]

const benefits: Benefit[] = [
  {
    title: 'Экономия времени',
    description: 'Автоматическое распознавание и обработка номеров сокращает время въезда и выезда на 70%',
    icon: 'lucide:clock',
    metric: '70%',
    metricLabel: 'экономия времени'
  },
  {
    title: 'Увеличение прибыли',
    description: 'Исключение человеческого фактора и контроль всех платежей увеличивает выручку',
    icon: 'lucide:trending-up',
    metric: '+30%',
    metricLabel: 'рост прибыли'
  },
  {
    title: 'Полная автоматизация',
    description: 'Система работает 24/7 без участия персонала, сокращая операционные расходы',
    icon: 'lucide:zap',
    metric: '-50%',
    metricLabel: 'расходы на персонал'
  }
]

const testimonials: Testimonial[] = [
  {
    name: 'Алексей Петров',
    position: 'Директор',
    company: 'ТЦ "Мега"',
    content: 'UniPark полностью изменил подход к управлению парковкой. Теперь мы контролируем каждый въезд и выезд, а прибыль выросла на 35% за первый квартал.',
    rating: 5
  },
  {
    name: 'Марина Соколова',
    position: 'Управляющая',
    company: 'Бизнес-центр "Альфа"',
    content: 'Отличная система! Интеграция заняла всего 2 дня, а окупилась за 4 месяца. Клиенты довольны быстрым обслуживанием.',
    rating: 5
  },
  {
    name: 'Дмитрий Иванов',
    position: 'Владелец',
    company: 'Сеть парковок "Паркинг+"',
    content: 'Управляю 5 парковками через единую панель. Аналитика в реальном времени помогает оптимизировать загрузку и ценообразование.',
    rating: 5
  }
]

const pricingPlans: PricingPlan[] = [
  {
    name: 'Стартовый',
    description: 'Для небольших парковок до 50 мест',
    price: '₸150,000',
    period: '/месяц',
    buttonText: 'Попробовать бесплатно',
    features: [
      'До 2 камер распознавания',
      'Базовая аналитика',
      'Почасовые тарифы',
      'Техподдержка в рабочее время',
      'Мобильное приложение'
    ]
  },
  {
    name: 'Бизнес',
    description: 'Для средних и крупных парковок',
    price: '₸350,000',
    period: '/месяц',
    buttonText: 'Начать использовать',
    highlighted: true,
    badge: 'Популярный',
    features: [
      'До 10 камер распознавания',
      'Расширенная аналитика и отчеты',
      'Все типы тарификации',
      'Приоритетная поддержка 24/7',
      'API для интеграций',
      'Управление абонементами',
      'Белые/черные списки'
    ]
  },
  {
    name: 'Корпоративный',
    description: 'Для сетей парковок и крупного бизнеса',
    price: 'По запросу',
    period: '',
    buttonText: 'Связаться с нами',
    features: [
      'Неограниченное количество камер',
      'Индивидуальная настройка',
      'Выделенный сервер',
      'Персональный менеджер',
      'Обучение персонала',
      'Кастомные интеграции',
      'SLA 99.9%'
    ]
  }
]

const faqItems: FAQItem[] = [
  {
    question: 'Как быстро можно установить систему?',
    answer: 'Установка и настройка занимает от 1 до 3 дней в зависимости от размера парковки. Мы предоставляем полную техническую поддержку на всех этапах внедрения.'
  },
  {
    question: 'Какая точность распознавания номеров?',
    answer: 'Наша система обеспечивает точность распознавания до 98% даже в сложных погодных условиях. Используются современные алгоритмы машинного обучения.'
  },
  {
    question: 'Можно ли интегрировать с существующими системами?',
    answer: 'Да, UniPark предоставляет API для интеграции с вашими системами учета, CRM, 1С и другими платформами. Также доступны готовые интеграции с популярными сервисами.'
  },
  {
    question: 'Что происходит при отключении интернета?',
    answer: 'Система имеет локальный режим работы и продолжает функционировать без подключения к интернету. Все данные синхронизируются после восстановления связи.'
  },
  {
    question: 'Какая поддержка предоставляется?',
    answer: 'Мы предлагаем техническую поддержку по всем тарифам. План "Бизнес" и выше включает приоритетную поддержку 24/7 с гарантированным временем ответа.'
  },
  {
    question: 'Можно ли попробовать систему бесплатно?',
    answer: 'Да, мы предлагаем 14-дневный бесплатный пробный период для тарифа "Стартовый" и "Бизнес". Без привязки карты и обязательств.'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Автоматизация парковки без лишних усилий"
      subtitle="Интеллектуальная система управления парковкой с распознаванием номеров, гибкими тарифами и контролем в реальном времени"
      primary-button-text="Смотреть демо"
      primary-button-icon="lucide:play-circle"
      :images="[
        '/images/screenshots/1.jpg',
        '/images/screenshots/2.jpg',
        '/images/screenshots/3.jpg',
        '/images/screenshots/4.jpg'
      ]"
    />

    <!-- Features Section -->
    <FeaturesGrid
      title="Возможности системы"
      subtitle="Всё необходимое для автоматизации вашей парковки"
      :features="features"
    />

    <!-- Benefits Section -->
    <BenefitsSection
      title="Преимущества для вашего бизнеса"
      subtitle="Увеличьте эффективность и прибыль с UniPark"
      :benefits="benefits"
    />

    <!-- Stats Section -->
    <StatsCounter
      title="UniPark в цифрах"
      subtitle="Наша система обрабатывает тысячи въездов ежедневно"
      :stats="stats"
    />

    <!-- Testimonials Section -->
    <TestimonialsSection
      title="Отзывы наших клиентов"
      subtitle="Более 100 компаний уже используют UniPark"
      :testimonials="testimonials"
    />

    <!-- Pricing Section -->
    <PricingSection
      title="Тарифные планы"
      subtitle="Выберите подходящий тариф для вашего бизнеса"
      :plans="pricingPlans"
    />

    <!-- FAQ Section -->
    <FAQSection
      title="Часто задаваемые вопросы"
      subtitle="Ответы на популярные вопросы о системе UniPark"
      :items="faqItems"
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
