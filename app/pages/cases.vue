<script setup lang="ts">
import type { CaseStudy, Testimonial } from '~/types'

definePageMeta({
  layout: 'default'
})

useSEO({
  title: 'Кейсы UniPark - Истории успеха наших клиентов',
  description: 'Реальные примеры внедрения UniPark. Увеличение выручки, автоматизация процессов и довольные клиенты.',
  keywords: 'кейсы парковка, примеры внедрения, отзывы клиентов, истории успеха'
})

const caseStudies: CaseStudy[] = [
  {
    title: 'Торговый центр "Мега"',
    description: 'Автоматизация парковки на 500 мест с интеграцией в систему лояльности торгового центра. Внедрили распознавание номеров и автоматический расчет бесплатного времени для посетителей магазинов.',
    industry: 'Торговый центр',
    image: '',
    year: '2024',
    results: [
      { value: '+45%', label: 'Рост выручки' },
      { value: '99.2%', label: 'Точность' }
    ]
  },
  {
    title: 'Бизнес-центр "Империя"',
    description: 'Система контроля доступа для 3 подземных уровней парковки с абонементами для арендаторов офисов. Интеграция с системой пропусков и 1С.',
    industry: 'Бизнес-центр',
    image: '',
    year: '2023',
    results: [
      { value: '1200', label: 'Автомобилей/день' },
      { value: '-60%', label: 'Время въезда' }
    ]
  },
  {
    title: 'Аэропорт "Внуково"',
    description: 'Масштабная система для нескольких терминалов с краткосрочной и долгосрочной парковкой. Онлайн-бронирование и предоплата.',
    industry: 'Аэропорт',
    image: '',
    year: '2023',
    results: [
      { value: '50+', label: 'Камер' },
      { value: '24/7', label: 'Работа без сбоев' }
    ]
  },
  {
    title: 'ЖК "Солнечный"',
    description: 'Парковка для жителей жилого комплекса на 800 квартир. Гостевые парковочные места с оплатой через мобильное приложение.',
    industry: 'Жилой комплекс',
    image: '',
    year: '2024',
    results: [
      { value: '800+', label: 'Резидентов' },
      { value: '100%', label: 'Автоматизация' }
    ]
  },
  {
    title: 'Сеть отелей "Гранд"',
    description: 'Единая система для 5 отелей сети с централизованным управлением. Автоматическая выдача пропусков гостям при заселении.',
    industry: 'Гостиничный бизнес',
    image: '',
    year: '2023',
    results: [
      { value: '5', label: 'Локаций' },
      { value: '+30%', label: 'Довольных гостей' }
    ]
  },
  {
    title: 'Медицинский центр "Здоровье+"',
    description: 'Парковка для посетителей и сотрудников с приоритетом для пациентов с записью. Интеграция с CRM клиники.',
    industry: 'Медицина',
    image: '',
    year: '2024',
    results: [
      { value: '-40%', label: 'Жалоб' },
      { value: '95%', label: 'Удовлетворенность' }
    ]
  }
]

const testimonials: Testimonial[] = [
  {
    name: 'Алексей Петров',
    position: 'Директор по эксплуатации',
    company: 'ТЦ "Мега"',
    text: 'UniPark полностью оправдал наши ожидания. За первый месяц работы выручка от парковки выросла на 45%, а количество жалоб сократилось до минимума. Система работает стабильно даже в часы пик.',
    rating: 5
  },
  {
    name: 'Мария Соколова',
    position: 'Управляющая',
    company: 'Бизнес-центр "Империя"',
    text: 'Отличное решение для бизнес-центра. Арендаторы довольны удобством абонементов, а мы получили прозрачную аналитику и контроль. Окупилось за 8 месяцев.',
    rating: 5
  },
  {
    name: 'Дмитрий Иванов',
    position: 'Технический директор',
    company: 'Аэропорт "Внуково"',
    text: 'Работаем с UniPark уже год. Система обрабатывает тысячи машин ежедневно без сбоев. Особо отмечу качество техподдержки - отвечают быстро и по делу.',
    rating: 5
  },
  {
    name: 'Елена Кузнецова',
    position: 'Председатель ТСЖ',
    company: 'ЖК "Солнечный"',
    text: 'Жители очень довольны. Больше нет проблем с чужими машинами на парковке, а гости могут легко оплатить через приложение. Рекомендуем всем управляющим компаниям!',
    rating: 5
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 md:px-8 bg-gradient-to-br from-primary-50 to-accent-50">
      <div class="container-custom text-center">
        <ScrollReveal>
          <h1 class="text-5xl md:text-6xl font-heading font-bold text-dark-900 mb-6">
            Истории успеха
          </h1>
        </ScrollReveal>
        <ScrollReveal :delay="200">
          <p class="text-xl text-dark-600 max-w-3xl mx-auto">
            Узнайте, как UniPark помогает бизнесу автоматизировать парковки и увеличивать прибыль
          </p>
        </ScrollReveal>
      </div>
    </section>

    <!-- Case Studies Grid -->
    <section class="py-20 px-4 md:px-8">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal
            v-for="(caseStudy, index) in caseStudies"
            :key="caseStudy.title"
            :delay="100 * (index % 3)"
          >
            <CaseStudyCard :case-study="caseStudy" />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <StatsCounter
      title="UniPark в цифрах"
      subtitle="Результаты работы наших клиентов"
      :stats="[
        { value: 150, label: 'Довольных клиентов', suffix: '+' },
        { value: 50000, label: 'Автомобилей в день' },
        { value: 99.5, label: 'Точность распознавания', suffix: '%' },
        { value: 24, label: 'Техподдержка', suffix: '/7' }
      ]"
    />

    <!-- Testimonials Section -->
    <section class="py-20 px-4 md:px-8">
      <div class="container-custom">
        <div class="text-center mb-16">
          <ScrollReveal>
            <h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Отзывы клиентов
            </h2>
          </ScrollReveal>
          <ScrollReveal :delay="200">
            <p class="text-xl text-dark-600 max-w-2xl mx-auto">
              Что говорят о нас наши клиенты
            </p>
          </ScrollReveal>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ScrollReveal
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.name"
            :delay="100 * (index % 2)"
          >
            <TestimonialCard :testimonial="testimonial" />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CTASection
      title="Станьте следующей историей успеха"
      subtitle="Присоединяйтесь к 150+ компаниям, которые доверяют UniPark"
      button-text="Начать бесплатный период"
      secondary-button-text="Заказать консультацию"
      secondary-button-icon="lucide:calendar"
    />
  </div>
</template>
