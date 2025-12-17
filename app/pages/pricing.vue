<script setup lang="ts">
import type { PricingPlan, FAQItem } from '~/types';

definePageMeta({
	layout: 'default',
});

useSEO({
	title: 'Тарифлар - UniPark автотураргоҳ бошқарув тизими',
	description:
		'UniPark SaaS тарифлари. Автотураргоҳ сиғимига асосланган шаффоф нархлар. Small Park дан Mega Park гача.',
	keywords:
		'unipark тарифлар, автотураргоҳ тизими нархлари, parking system pricing',
});

const plans: PricingPlan[] = [
	{
		name: 'Small Park',
		description: 'Кичик шаҳар, туман марказлари, хусусий автотураргоҳлар',
		capacity: '20 — 100 та авто',
		price: '400 000',
		priceDescription: 'сўм / ой',
		period: 'ой',
		yearlyDiscount: '−10% (12 ой), −20% (24 ой)',
		features: [
			'2 та камера',
			'1 та шлагбаум',
			'3 та фойдаланувчи',
			'Базавий ҳисоботлар',
			'Email қўллаб-қувватлаш',
			'7 кунлик резерв нусха',
			'99.5% SLA',
		],
		buttonText: 'Танлаш',
	},
	{
		name: 'Medium Park',
		description: 'Шаҳар ичи, савдо марказлари атрофи',
		capacity: '101 — 200 та авто',
		price: '800 000',
		priceDescription: 'сўм / ой',
		period: 'ой',
		yearlyDiscount: '−10% (12 ой), −20% (24 ой)',
		popular: true,
		features: [
			'4 та камера',
			'2 та шлагбаум',
			'5 та фойдаланувчи',
			'Кенгайтирилган ҳисоботлар',
			'Email + Chat қўллаб-қувватлаш',
			'14 кунлик резерв нусха',
			'Чекланган интеграция',
			'99.5% SLA',
		],
		buttonText: 'Танлаш',
	},
	{
		name: 'Large Park',
		description: 'Йирик шаҳарлар, бозорлар, вокзаллар',
		capacity: '201 — 500 та авто',
		price: '1 600 000',
		priceDescription: 'сўм / ой',
		period: 'ой',
		yearlyDiscount: '−10% (12 ой), −20% (24 ой)',
		features: [
			'8 та камера',
			'4 та шлагбаум',
			'10 та фойдаланувчи',
			'Кенгайтирилган ҳисоботлар',
			'24×7 қўллаб-қувватлаш',
			'30 кунлик резерв нусха',
			'API ва тўлиқ интеграция',
			'99.9% SLA',
		],
		buttonText: 'Танлаш',
	},
	{
		name: 'Mega Park',
		description: 'Мегаполис, аэропорт, стадион, давлат объектлари',
		capacity: '501 — 1000 та авто',
		price: '3 000 000',
		priceDescription: 'сўм / ой',
		period: 'ой',
		yearlyDiscount: 'Индивидуал шартлар',
		features: [
			'16+ камера',
			'8+ шлагбаум',
			'20+ фойдаланувчи',
			'Махсус ҳисоботлар',
			'Шахсий менежер',
			'90 кунлик резерв нусха',
			'API ва тўлиқ интеграция',
			'99.9% SLA',
		],
		buttonText: 'Боғланиш',
	},
];

// Региональные коэффициенты
const regionCoefficients = [
	{ category: 'A', region: 'Тошкент ш., марказий туманлар', coefficient: '1.0' },
	{ category: 'B', region: 'Вилоят марказлари', coefficient: '0.85' },
	{ category: 'C', region: 'Туман марказлари', coefficient: '0.7' },
	{ category: 'D', region: 'Қишлоқ, кичик аҳоли пункти', coefficient: '0.6' },
];

// Коэффициенты транспортного потока
const flowCoefficients = [
	{ level: 'Паст', description: 'Кам кирим-чиқим', coefficient: '0.9' },
	{ level: 'Ўрта', description: 'Кун давомида барқарор', coefficient: '1.0' },
	{ level: 'Юқори', description: 'Катта навбат, юқори тушум', coefficient: '1.15' },
];

// Разовые услуги установки
const installationServices = [
	{ plan: 'Small Park', price: '3 000 000 сўм', description: 'Базавий конфигурация' },
	{ plan: 'Medium Park', price: '5 000 000 сўм', description: 'Кенгайтирилган созлаш' },
	{ plan: 'Large Park', price: '8 000 000 сўм', description: 'Мураккаб интеграция' },
	{ plan: 'Mega Park', price: '12 000 000 сўм', description: 'Enterprise даражаси' },
];

// Что входит в установку
const installationIncludes = [
	{
		title: 'Техник ишлар',
		icon: 'lucide:server',
		items: [
			'Сервер муҳитини тайёрлаш (Cloud / On-premise)',
			'Камера ва шлагбаумларни улаш',
			'Локал тармоқ ва интернет конфигурацияси',
		],
	},
	{
		title: 'Дастурий ишлар',
		icon: 'lucide:settings',
		items: [
			'Тарифлар ва ҳудудий коэффициентларни созлаш',
			'Фойдаланувчи роллари ва ҳуқуқлари',
			'Ҳисоботлар ва журналлар',
		],
	},
	{
		title: 'Ўқитиш',
		icon: 'lucide:graduation-cap',
		items: [
			'Администраторлар учун (1 кун)',
			'Операторлар учун (1 кун)',
			'Қўлланма ва видео йўриқномалар',
		],
	},
];

const faqItems: FAQItem[] = [
	{
		question: 'Ҳудудий коэффициент қандай ҳисобланади?',
		answer:
			'Якуний нарх = базавий тариф × ҳудуд коэффициенти × оқим коэффициенти. Масалан, Тошкент марказида юқори оқимли автотураргоҳ учун: базавий нарх × 1.0 × 1.15.',
	},
	{
		question: 'Қўшимча дарвоза (gate) қўшса нарх қанча ошади?',
		answer:
			'Ҳар бир қўшимча дарвоза учун +300 000 сўм/ой тўланади. Қўшимча автотураргоҳ объекти эса алоҳида тарифланади.',
	},
	{
		question: 'Йиллик тўловда қандай чегирма бор?',
		answer:
			'12 ойлик тўловда −10% чегирма, 24 ойлик тўловда −20% чегирма берилади. Mega Park учун индивидуал шартлар муҳокама қилинади.',
	},
	{
		question: 'Давлат ташкилотлари учун алоҳида шартлар борми?',
		answer:
			'Ҳа, давлат ва йирик мижозлар учун Enterprise Custom тариф мавжуд: SaaS + On-premise hybrid, индивидуал функционал, UZS/USD ҳисоб-китоб, давлат ахборот тизимлари билан интеграция, алоҳида SLA ва шартнома.',
	},
	{
		question: 'Ўрнатиш хизмати нимани ўз ичига олади?',
		answer:
			'Бир марталик ўрнатиш хизмати: сервер ва тармоқ созлаш, камера ва шлагбаумларни улаш, тарифлар ва роллар конфигурацияси, администратор ва операторларни ўқитиш, қўлланма ва видео йўриқномалар.',
	},
	{
		question: 'Тизим ўзини қанча вақтда қоплайди?',
		answer:
			'Мисол: Large Park — бир марталик 8 000 000 сўм + 12 ойлик SaaS ≈ 19 200 000 сўм. Жами 1 йиллик харажат ≈ 27.2 млн сўм. Амалиётда тўлов интизоми ва шаффоф назорат орқали 6—9 ойда ўзини қоплайди.',
	},
];
</script>

<template>
	<div>
		<!-- Hero Section -->
		<PageHero
			title="Шаффоф тарифлар"
			subtitle="Автотураргоҳ сиғимига асосланган мослашувчан SaaS тарифлар"
		/>

		<!-- Pricing Cards -->
		<section class="py-20 px-4 md:px-8">
			<div class="container-custom">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
					<ScrollReveal
						v-for="(plan, index) in plans"
						:key="plan.name"
						:delay="100 * index"
					>
						<Card
							:class="[
								'relative h-full transition-all duration-300',
								{
									'border-2 border-primary-500 shadow-2xl scale-105': plan.popular,
									'hover:shadow-xl hover:-translate-y-1': !plan.popular
								}
							]"
						>
							<div v-if="plan.popular" class="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
								Оммабоп
							</div>

							<div class="p-6">
								<h3 class="text-xl font-heading font-bold text-dark-900 mb-1">
									{{ plan.name }}
								</h3>
								<p class="text-sm text-primary-600 font-medium mb-2">
									{{ plan.capacity }}
								</p>
								<p class="text-dark-600 text-sm mb-4">
									{{ plan.description }}
								</p>

								<div class="mb-4">
									<div class="flex items-baseline gap-1">
										<span class="text-3xl font-heading font-bold text-primary-600">
											{{ plan.price }}
										</span>
										<span class="text-dark-600 text-sm">
											/ {{ plan.period }}
										</span>
									</div>
									<p class="text-sm text-dark-500 mt-1">
										{{ plan.priceDescription }}
									</p>
									<p class="text-xs text-accent-600 mt-1">
										{{ plan.yearlyDiscount }}
									</p>
								</div>

								<Button
									:variant="plan.popular ? 'primary' : 'outline'"
									size="md"
									class="w-full mb-6"
								>
									{{ plan.buttonText }}
								</Button>

								<div class="space-y-3">
									<div
										v-for="feature in plan.features"
										:key="feature"
										class="flex items-start gap-2"
									>
										<Icon
											name="lucide:check"
											class="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5"
										/>
										<span class="text-dark-700 text-sm">{{ feature }}</span>
									</div>
								</div>
							</div>
						</Card>
					</ScrollReveal>
				</div>

				<!-- Additional Services -->
				<ScrollReveal :delay="400">
					<div class="mt-8 text-center">
						<p class="text-dark-600">
							<Icon name="lucide:plus-circle" class="w-5 h-5 inline mr-2" />
							Қўшимча дарвоза (gate): <strong class="text-dark-900">+300 000 сўм/ой</strong>
						</p>
					</div>
				</ScrollReveal>
			</div>
		</section>

		<!-- Coefficients Section -->
		<section class="py-20 px-4 md:px-8 bg-dark-50">
			<div class="container-custom">
				<div class="text-center mb-16">
					<ScrollReveal>
						<h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
							Ҳудудий коэффициентлар
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-3xl mx-auto">
							Тарифлар мижоз жойлашган ҳудуд ва транспорт оқимига қараб коэффициент асосида ҳисобланади
						</p>
					</ScrollReveal>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					<!-- Region Coefficients -->
					<ScrollReveal :delay="300">
						<Card class="p-6">
							<h3 class="text-xl font-heading font-bold text-dark-900 mb-6 flex items-center gap-2">
								<Icon name="lucide:map-pin" class="w-6 h-6 text-primary-600" />
								Ҳудуд категориялари
							</h3>
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead>
										<tr class="border-b-2 border-dark-200">
											<th class="text-left py-3 px-2 font-semibold text-dark-900">Категория</th>
											<th class="text-left py-3 px-2 font-semibold text-dark-900">Ҳудуд</th>
											<th class="text-center py-3 px-2 font-semibold text-dark-900">Коэф.</th>
										</tr>
									</thead>
									<tbody class="text-dark-700">
										<tr v-for="item in regionCoefficients" :key="item.category" class="border-b border-dark-100">
											<td class="py-3 px-2">
												<span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold">
													{{ item.category }}
												</span>
											</td>
											<td class="py-3 px-2">{{ item.region }}</td>
											<td class="text-center py-3 px-2 font-mono font-semibold text-primary-600">{{ item.coefficient }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Card>
					</ScrollReveal>

					<!-- Flow Coefficients -->
					<ScrollReveal :delay="400">
						<Card class="p-6">
							<h3 class="text-xl font-heading font-bold text-dark-900 mb-6 flex items-center gap-2">
								<Icon name="lucide:activity" class="w-6 h-6 text-primary-600" />
								Транспорт оқими коэффициенти
							</h3>
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead>
										<tr class="border-b-2 border-dark-200">
											<th class="text-left py-3 px-2 font-semibold text-dark-900">Даража</th>
											<th class="text-left py-3 px-2 font-semibold text-dark-900">Таъриф</th>
											<th class="text-center py-3 px-2 font-semibold text-dark-900">Коэф.</th>
										</tr>
									</thead>
									<tbody class="text-dark-700">
										<tr v-for="item in flowCoefficients" :key="item.level" class="border-b border-dark-100">
											<td class="py-3 px-2 font-medium">{{ item.level }}</td>
											<td class="py-3 px-2">{{ item.description }}</td>
											<td class="text-center py-3 px-2 font-mono font-semibold text-primary-600">{{ item.coefficient }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Card>
					</ScrollReveal>
				</div>

				<!-- Formula -->
				<ScrollReveal :delay="500">
					<div class="mt-12 max-w-3xl mx-auto">
						<Card class="p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
							<div class="text-center">
								<p class="text-lg text-dark-700 mb-2">Якуний нарх формуласи:</p>
								<p class="text-2xl font-heading font-bold text-dark-900">
									Якуний нарх = Базавий тариф × Ҳудуд коэф. × Оқим коэф.
								</p>
								<p class="text-dark-600 mt-4 text-sm">
									Мисол: Medium Park Тошкент марказида юқори оқим билан = 800 000 × 1.0 × 1.15 = <strong>920 000 сўм/ой</strong>
								</p>
							</div>
						</Card>
					</div>
				</ScrollReveal>
			</div>
		</section>

		<!-- Installation Services -->
		<section class="py-20 px-4 md:px-8">
			<div class="container-custom">
				<div class="text-center mb-16">
					<ScrollReveal>
						<h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
							Бир марталик хизматлар
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-3xl mx-auto">
							Ўрнатиш, созлаш ва ўқитиш хизматлари автотураргоҳ ҳажмига қараб бир марталик тўлов асосида
						</p>
					</ScrollReveal>
				</div>

				<!-- Installation Prices -->
				<ScrollReveal :delay="300">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
						<Card v-for="service in installationServices" :key="service.plan" class="p-6 text-center">
							<h4 class="font-heading font-bold text-dark-900 mb-2">{{ service.plan }}</h4>
							<p class="text-2xl font-bold text-primary-600 mb-2">{{ service.price }}</p>
							<p class="text-sm text-dark-600">{{ service.description }}</p>
						</Card>
					</div>
				</ScrollReveal>

				<!-- What's Included -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<ScrollReveal
						v-for="(section, index) in installationIncludes"
						:key="section.title"
						:delay="400 + index * 100"
					>
						<Card class="p-6 h-full">
							<div class="flex items-center gap-3 mb-4">
								<div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
									<Icon :name="section.icon" class="w-6 h-6 text-primary-600" />
								</div>
								<h4 class="font-heading font-bold text-dark-900">{{ section.title }}</h4>
							</div>
							<ul class="space-y-3">
								<li v-for="item in section.items" :key="item" class="flex items-start gap-2 text-sm text-dark-700">
									<Icon name="lucide:check-circle" class="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
									{{ item }}
								</li>
							</ul>
						</Card>
					</ScrollReveal>
				</div>
			</div>
		</section>

		<!-- Comparison Table -->
		<section class="py-20 px-4 md:px-8 bg-dark-50">
			<div class="container-custom">
				<div class="text-center mb-16">
					<ScrollReveal>
						<h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
							Тарифларни солиштириш
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-2xl mx-auto">
							Автотураргоҳингизга мос тарифни танланг
						</p>
					</ScrollReveal>
				</div>

				<ScrollReveal :delay="300">
					<div class="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead>
									<tr class="border-b-2 border-dark-200">
										<th class="text-left py-4 px-4 font-heading font-bold text-dark-900">
											Функция
										</th>
										<th class="text-center py-4 px-4 font-heading font-bold text-dark-900">
											Small
										</th>
										<th class="text-center py-4 px-4 font-heading font-bold text-primary-600">
											Medium
										</th>
										<th class="text-center py-4 px-4 font-heading font-bold text-dark-900">
											Large
										</th>
										<th class="text-center py-4 px-4 font-heading font-bold text-dark-900">
											Mega
										</th>
									</tr>
								</thead>
								<tbody class="text-dark-700">
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Камера сони</td>
										<td class="text-center py-4 px-4">2</td>
										<td class="text-center py-4 px-4 bg-primary-50">4</td>
										<td class="text-center py-4 px-4">8</td>
										<td class="text-center py-4 px-4">16+</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Шлагбаум</td>
										<td class="text-center py-4 px-4">1</td>
										<td class="text-center py-4 px-4 bg-primary-50">2</td>
										<td class="text-center py-4 px-4">4</td>
										<td class="text-center py-4 px-4">8+</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Фойдаланувчи</td>
										<td class="text-center py-4 px-4">3</td>
										<td class="text-center py-4 px-4 bg-primary-50">5</td>
										<td class="text-center py-4 px-4">10</td>
										<td class="text-center py-4 px-4">20+</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Ҳисоботлар</td>
										<td class="text-center py-4 px-4">Basic</td>
										<td class="text-center py-4 px-4 bg-primary-50">Advanced</td>
										<td class="text-center py-4 px-4">Advanced</td>
										<td class="text-center py-4 px-4">Custom</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">API</td>
										<td class="text-center py-4 px-4">
											<Icon name="lucide:x" class="w-5 h-5 text-dark-400 mx-auto" />
										</td>
										<td class="text-center py-4 px-4 bg-primary-50">
											<Icon name="lucide:x" class="w-5 h-5 text-dark-400 mx-auto" />
										</td>
										<td class="text-center py-4 px-4">
											<Icon name="lucide:check" class="w-5 h-5 text-accent-500 mx-auto" />
										</td>
										<td class="text-center py-4 px-4">
											<Icon name="lucide:check" class="w-5 h-5 text-accent-500 mx-auto" />
										</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Интеграция</td>
										<td class="text-center py-4 px-4">
											<Icon name="lucide:x" class="w-5 h-5 text-dark-400 mx-auto" />
										</td>
										<td class="text-center py-4 px-4 bg-primary-50">Чекланган</td>
										<td class="text-center py-4 px-4">Тўлиқ</td>
										<td class="text-center py-4 px-4">Тўлиқ</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">SLA</td>
										<td class="text-center py-4 px-4">99.5%</td>
										<td class="text-center py-4 px-4 bg-primary-50">99.5%</td>
										<td class="text-center py-4 px-4">99.9%</td>
										<td class="text-center py-4 px-4">99.9%</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">Қўллаб-қувватлаш</td>
										<td class="text-center py-4 px-4">Email</td>
										<td class="text-center py-4 px-4 bg-primary-50">Email + Chat</td>
										<td class="text-center py-4 px-4">24×7</td>
										<td class="text-center py-4 px-4">Шахсий менежер</td>
									</tr>
									<tr>
										<td class="py-4 px-4">Резерв нусха</td>
										<td class="text-center py-4 px-4">7 кун</td>
										<td class="text-center py-4 px-4 bg-primary-50">14 кун</td>
										<td class="text-center py-4 px-4">30 кун</td>
										<td class="text-center py-4 px-4">90 кун</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>

		<!-- Enterprise Section -->
		<section class="py-20 px-4 md:px-8">
			<div class="container-custom">
				<ScrollReveal>
					<Card class="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-dark-900 to-dark-800 text-white">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
							<div>
								<h2 class="text-3xl font-heading font-bold mb-4">
									Enterprise Custom
								</h2>
								<p class="text-dark-300 mb-6">
									Давлат ва йирик мижозлар учун махсус ечимлар
								</p>
								<ul class="space-y-3 mb-8">
									<li class="flex items-center gap-3">
										<Icon name="lucide:check-circle" class="w-5 h-5 text-accent-400" />
										<span>SaaS + On-premise hybrid</span>
									</li>
									<li class="flex items-center gap-3">
										<Icon name="lucide:check-circle" class="w-5 h-5 text-accent-400" />
										<span>Индивидуал функционал ва интеграциялар</span>
									</li>
									<li class="flex items-center gap-3">
										<Icon name="lucide:check-circle" class="w-5 h-5 text-accent-400" />
										<span>UZS / USD ҳисоб-китоб</span>
									</li>
									<li class="flex items-center gap-3">
										<Icon name="lucide:check-circle" class="w-5 h-5 text-accent-400" />
										<span>Давлат ахборот тизимлари билан интеграция</span>
									</li>
									<li class="flex items-center gap-3">
										<Icon name="lucide:check-circle" class="w-5 h-5 text-accent-400" />
										<span>Алоҳида SLA ва шартнома</span>
									</li>
								</ul>
								<Button variant="accent" size="lg">
									Боғланиш
									<Icon name="lucide:arrow-right" class="w-5 h-5 ml-2" />
								</Button>
							</div>
							<div class="hidden md:block">
								<div class="relative">
									<div class="absolute inset-0 bg-primary-500 rounded-2xl blur-3xl opacity-20"></div>
									<div class="relative bg-dark-700 rounded-2xl p-6">
										<div class="flex items-center gap-3 mb-4">
											<Icon name="lucide:building-2" class="w-8 h-8 text-primary-400" />
											<span class="font-heading font-bold text-xl">Давлат объектлари</span>
										</div>
										<p class="text-dark-300 text-sm mb-4">
											Тендерлар ва давлат харидлари учун мос. Барқарор ва шаффоф нархлар.
										</p>
										<div class="flex items-center gap-2 text-accent-400 text-sm">
											<Icon name="lucide:shield-check" class="w-4 h-4" />
											<span>Маълумотлар хавфсизлиги кафолати</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</ScrollReveal>
			</div>
		</section>

		<!-- FAQ -->
		<section class="py-20 px-4 md:px-8 bg-dark-50">
			<div class="container-custom">
				<div class="text-center mb-16">
					<ScrollReveal>
						<h2 class="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
							Кўп бериладиган саволлар
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-2xl mx-auto">
							Тарифлар ва тўлов бўйича саволларга жавоблар
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
			title="Бепул консультация олинг"
			subtitle="Автотураргоҳингизга мос тарифни танлашда ёрдам берамиз"
			button-text="Боғланиш"
			secondary-button-text="Савол бериш"
			secondary-button-icon="lucide:help-circle"
		/>
	</div>
</template>
