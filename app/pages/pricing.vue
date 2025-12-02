<script setup lang="ts">
import type { PricingPlan, FAQItem } from '~/types';

definePageMeta({
	layout: 'default',
});

useSEO({
	title: 'Тарифы UniPark - Выберите подходящий план для вашей парковки',
	description:
		'Прозрачные тарифы на систему управления парковкой. От базового до корпоративного. 14 дней бесплатно.',
	keywords:
		'тарифы парковка, цены система управления, стоимость автоматизации парковки',
});

const plans: PricingPlan[] = [
	{
		name: 'Базовый',
		description: 'Для небольших парковок',
		price: '15 000 ₽',
		period: 'мес',
		priceDescription: 'До 2 камер включено',
		features: [
			'До 2 камер распознавания',
			'До 100 автомобилей в базе',
			'Базовые отчеты',
			'Email поддержка',
			'Облачное хранение 30 дней',
			'Мобильное приложение',
		],
		buttonText: 'Попробовать бесплатно',
	},
	{
		name: 'Профессиональный',
		description: 'Для средних парковок',
		price: '35 000 ₽',
		period: 'мес',
		priceDescription: 'До 10 камер включено',
		features: [
			'До 10 камер распознавания',
			'До 1000 автомобилей в базе',
			'Расширенные отчеты и аналитика',
			'Приоритетная поддержка 24/7',
			'Облачное хранение 90 дней',
			'API и интеграции',
			'Белые списки и абонементы',
			'SMS уведомления',
			'Персональный менеджер',
		],
		buttonText: 'Начать',
	},
	{
		name: 'Корпоративный',
		description: 'Для крупных парковок',
		price: 'По запросу',
		priceDescription: 'Неограниченное количество камер',
		features: [
			'Неограниченное количество камер',
			'Неограниченная база автомобилей',
			'Полная аналитика и BI',
			'Выделенная поддержка 24/7',
			'Собственный сервер (опция)',
			'Интеграция с 1С и CRM',
			'Индивидуальные доработки',
			'Обучение персонала',
			'SLA 99.9%',
			'Выделенный аккаунт-менеджер',
		],
		buttonText: 'Связаться с нами',
	},
];

const faqItems: FAQItem[] = [
	{
		question: 'Что входит в бесплатный пробный период?',
		answer:
			'В течение 14 дней вы получаете полный доступ ко всем функциям выбранного тарифа. Не требуется привязка карты. По окончании пробного периода вы можете оформить подписку или продолжить использовать бесплатную версию с ограничениями.',
	},
	{
		question: 'Можно ли изменить тариф в процессе использования?',
		answer:
			'Да, вы можете в любой момент повысить или понизить тариф. При повышении тарифа разница будет пересчитана пропорционально. При понижении новый тариф вступит в силу со следующего платежного периода.',
	},
	{
		question: 'Какие способы оплаты доступны?',
		answer:
			'Мы принимаем оплату банковскими картами (Visa, Mastercard, МИР), по счету для юридических лиц, а также электронными деньгами. Доступна оплата на 1, 6 или 12 месяцев с скидкой при годовой оплате.',
	},
	{
		question: 'Что происходит, если превышен лимит камер?',
		answer:
			'Если вам нужно больше камер, чем включено в ваш тариф, вы можете либо перейти на более высокий тариф, либо оплатить дополнительные камеры отдельно по цене 5000 ₽/камера/месяц.',
	},
	{
		question: 'Включена ли установка оборудования в стоимость?',
		answer:
			'Стоимость тарифов включает только программное обеспечение. Установка камер и шлагбаумов оплачивается отдельно. Наши партнеры помогут с подбором и монтажом оборудования под ключ.',
	},
	{
		question: 'Можно ли получить скидку?',
		answer:
			'Да! При оплате на год предоставляется скидка 15%. Для некоммерческих организаций действует скидка 20%. Также мы предлагаем специальные условия для управляющих компаний с несколькими парковками.',
	},
];
</script>

<template>
	<div>
		<!-- Hero Section -->
		<PageHero
			title="Прозрачные тарифы"
			subtitle="Выберите подходящий план для вашей парковки. Все тарифы включают 14 дней бесплатного доступа"
		/>

		<!-- Pricing Cards -->
		<section class="py-20 px-4 md:px-8">
			<div class="container-custom">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<ScrollReveal
						v-for="(plan, index) in plans"
						:key="plan.name"
						:delay="100 * index"
					>
						<PricingCard
							:plan="plan"
							:featured="plan.name === 'Профессиональный'"
						/>
					</ScrollReveal>
				</div>
			</div>
		</section>

		<!-- Comparison Table -->
		<section class="py-20 px-4 md:px-8 bg-dark-50">
			<div class="container-custom">
				<div class="text-center mb-16">
					<ScrollReveal>
						<h2
							class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4"
						>
							Сравнение тарифов
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-2xl mx-auto">
							Выберите тариф, который лучше всего подходит для вашего бизнеса
						</p>
					</ScrollReveal>
				</div>

				<ScrollReveal :delay="300">
					<div class="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead>
									<tr class="border-b-2 border-dark-200">
										<th
											class="text-left py-4 px-4 font-heading font-bold text-dark-900"
										>
											Функция
										</th>
										<th
											class="text-center py-4 px-4 font-heading font-bold text-dark-900"
										>
											Базовый
										</th>
										<th
											class="text-center py-4 px-4 font-heading font-bold text-primary-600"
										>
											Профессиональный
										</th>
										<th
											class="text-center py-4 px-4 font-heading font-bold text-dark-900"
										>
											Корпоративный
										</th>
									</tr>
								</thead>
								<tbody class="text-dark-700">
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Количество камер</td>
										<td class="text-center py-4 px-4">До 2</td>
										<td class="text-center py-4 px-4 bg-primary-50">До 10</td>
										<td class="text-center py-4 px-4">Безлимит</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">База автомобилей</td>
										<td class="text-center py-4 px-4">100</td>
										<td class="text-center py-4 px-4 bg-primary-50">1000</td>
										<td class="text-center py-4 px-4">Безлимит</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Техподдержка</td>
										<td class="text-center py-4 px-4">Email</td>
										<td class="text-center py-4 px-4 bg-primary-50">24/7</td>
										<td class="text-center py-4 px-4">24/7 + менеджер</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">API доступ</td>
										<td class="text-center py-4 px-4">
											<Icon
												name="lucide:x"
												class="w-5 h-5 text-dark-400 mx-auto"
											/>
										</td>
										<td class="text-center py-4 px-4 bg-primary-50">
											<Icon
												name="lucide:check"
												class="w-5 h-5 text-accent-500 mx-auto"
											/>
										</td>
										<td class="text-center py-4 px-4">
											<Icon
												name="lucide:check"
												class="w-5 h-5 text-accent-500 mx-auto"
											/>
										</td>
									</tr>
									<tr>
										<td class="py-4 px-4">Индивидуальные доработки</td>
										<td class="text-center py-4 px-4">
											<Icon
												name="lucide:x"
												class="w-5 h-5 text-dark-400 mx-auto"
											/>
										</td>
										<td class="text-center py-4 px-4 bg-primary-50">
											<Icon
												name="lucide:x"
												class="w-5 h-5 text-dark-400 mx-auto"
											/>
										</td>
										<td class="text-center py-4 px-4">
											<Icon
												name="lucide:check"
												class="w-5 h-5 text-accent-500 mx-auto"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>

		<!-- FAQ -->
		<section class="py-20 px-4 md:px-8">
			<div class="container-custom">
				<div class="text-center mb-16">
					<ScrollReveal>
						<h2
							class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4"
						>
							Часто задаваемые вопросы
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-2xl mx-auto">
							Ответы на популярные вопросы о тарифах и оплате
						</p>
					</ScrollReveal>
				</div>

				<ScrollReveal :delay="300">
					<div class="max-w-3xl mx-auto">
						<FAQAccordion :items="faqItems" />
					</div>
				</ScrollReveal>
			</div>
		</section>

		<!-- CTA -->
		<CTASection
			title="Начните бесплатный пробный период"
			subtitle="14 дней полного доступа ко всем функциям. Без привязки карты."
			button-text="Попробовать бесплатно"
			secondary-button-text="Задать вопрос"
			secondary-button-icon="lucide:help-circle"
		/>
	</div>
</template>
