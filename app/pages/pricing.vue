<script setup lang="ts">
import type { PricingPlan, FAQItem } from '~/types';

const { t } = useI18n();

definePageMeta({
	layout: 'default',
});

useHead({
	title: () => t('seo.pricing.title'),
	meta: [
		{ name: 'description', content: () => t('seo.pricing.description') },
		{ name: 'keywords', content: () => t('seo.pricing.keywords') },
		{ property: 'og:title', content: () => t('seo.pricing.title') },
		{ property: 'og:description', content: () => t('seo.pricing.description') }
	]
});

const plans = computed<PricingPlan[]>(() => [
	{
		name: t('pricing.plans.small.name'),
		description: t('pricing.plans.small.description'),
		capacity: t('pricing.plans.small.capacity'),
		price: '400 000',
		priceDescription: t('pricing.perMonthPrice'),
		period: t('common.month'),
		yearlyDiscount: t('pricing.yearlyDiscount'),
		features: [
			`2 ${t('pricing.features.cameras')}`,
			`1 ${t('pricing.features.barriers')}`,
			`3 ${t('pricing.features.users')}`,
			t('pricing.features.basicReports'),
			t('pricing.features.emailSupport'),
			t('pricing.features.backup7'),
			'99.5% SLA',
		],
		buttonText: t('common.select'),
	},
	{
		name: t('pricing.plans.medium.name'),
		description: t('pricing.plans.medium.description'),
		capacity: t('pricing.plans.medium.capacity'),
		price: '800 000',
		priceDescription: t('pricing.perMonthPrice'),
		period: t('common.month'),
		yearlyDiscount: t('pricing.yearlyDiscount'),
		popular: true,
		features: [
			`4 ${t('pricing.features.cameras')}`,
			`2 ${t('pricing.features.barriers')}`,
			`5 ${t('pricing.features.users')}`,
			t('pricing.features.advancedReports'),
			t('pricing.features.emailChatSupport'),
			t('pricing.features.backup14'),
			t('pricing.features.limitedIntegration'),
			'99.5% SLA',
		],
		buttonText: t('common.select'),
	},
	{
		name: t('pricing.plans.large.name'),
		description: t('pricing.plans.large.description'),
		capacity: t('pricing.plans.large.capacity'),
		price: '1 600 000',
		priceDescription: t('pricing.perMonthPrice'),
		period: t('common.month'),
		yearlyDiscount: t('pricing.yearlyDiscount'),
		features: [
			`8 ${t('pricing.features.cameras')}`,
			`4 ${t('pricing.features.barriers')}`,
			`10 ${t('pricing.features.users')}`,
			t('pricing.features.advancedReports'),
			t('pricing.features.support247'),
			t('pricing.features.backup30'),
			t('pricing.features.fullIntegration'),
			'99.9% SLA',
		],
		buttonText: t('common.select'),
	},
	{
		name: t('pricing.plans.mega.name'),
		description: t('pricing.plans.mega.description'),
		capacity: t('pricing.plans.mega.capacity'),
		price: '3 000 000',
		priceDescription: t('pricing.perMonthPrice'),
		period: t('common.month'),
		yearlyDiscount: t('pricing.individualTerms'),
		features: [
			`16+ ${t('pricing.features.cameras')}`,
			`8+ ${t('pricing.features.barriers')}`,
			`20+ ${t('pricing.features.users')}`,
			t('pricing.features.customReports'),
			t('pricing.features.personalManager'),
			t('pricing.features.backup90'),
			t('pricing.features.fullIntegration'),
			'99.9% SLA',
		],
		buttonText: t('common.contactUs'),
	},
]);

// Региональные коэффициенты
const regionCoefficients = computed(() => [
	{ category: 'A', region: t('pricing.coefficients.region.a'), coefficient: '1.0' },
	{ category: 'B', region: t('pricing.coefficients.region.b'), coefficient: '0.85' },
	{ category: 'C', region: t('pricing.coefficients.region.c'), coefficient: '0.7' },
	{ category: 'D', region: t('pricing.coefficients.region.d'), coefficient: '0.6' },
]);

// Коэффициенты транспортного потока
const flowCoefficients = computed(() => [
	{ level: t('pricing.coefficients.flow.low'), description: t('pricing.coefficients.flow.lowDesc'), coefficient: '0.9' },
	{ level: t('pricing.coefficients.flow.medium'), description: t('pricing.coefficients.flow.mediumDesc'), coefficient: '1.0' },
	{ level: t('pricing.coefficients.flow.high'), description: t('pricing.coefficients.flow.highDesc'), coefficient: '1.15' },
]);

// Разовые услуги установки
const installationServices = computed(() => [
	{ plan: t('pricing.plans.small.name'), price: '3 000 000', description: t('pricing.installation.baseConfig') },
	{ plan: t('pricing.plans.medium.name'), price: '5 000 000', description: t('pricing.installation.advancedSetup') },
	{ plan: t('pricing.plans.large.name'), price: '8 000 000', description: t('pricing.installation.complexIntegration') },
	{ plan: t('pricing.plans.mega.name'), price: '12 000 000', description: t('pricing.installation.enterpriseLevel') },
]);

// Что входит в установку
const installationIncludes = computed(() => [
	{
		title: t('pricing.installation.includes.technical.title'),
		icon: 'lucide:server',
		items: [
			t('pricing.installation.includes.technical.item1'),
			t('pricing.installation.includes.technical.item2'),
			t('pricing.installation.includes.technical.item3'),
		],
	},
	{
		title: t('pricing.installation.includes.software.title'),
		icon: 'lucide:settings',
		items: [
			t('pricing.installation.includes.software.item1'),
			t('pricing.installation.includes.software.item2'),
			t('pricing.installation.includes.software.item3'),
		],
	},
	{
		title: t('pricing.installation.includes.training.title'),
		icon: 'lucide:graduation-cap',
		items: [
			t('pricing.installation.includes.training.item1'),
			t('pricing.installation.includes.training.item2'),
			t('pricing.installation.includes.training.item3'),
		],
	},
]);

const enterpriseFeatures = computed(() => [
	t('pricing.enterprise.feature1'),
	t('pricing.enterprise.feature2'),
	t('pricing.enterprise.feature3'),
	t('pricing.enterprise.feature4'),
	t('pricing.enterprise.feature5'),
]);

const faqItems = computed<FAQItem[]>(() => [
	{
		question: t('pricing.faq.items.coefficient.question'),
		answer: t('pricing.faq.items.coefficient.answer'),
	},
	{
		question: t('pricing.faq.items.additionalGate.question'),
		answer: t('pricing.faq.items.additionalGate.answer'),
	},
	{
		question: t('pricing.faq.items.yearlyDiscount.question'),
		answer: t('pricing.faq.items.yearlyDiscount.answer'),
	},
	{
		question: t('pricing.faq.items.government.question'),
		answer: t('pricing.faq.items.government.answer'),
	},
	{
		question: t('pricing.faq.items.installation.question'),
		answer: t('pricing.faq.items.installation.answer'),
	},
	{
		question: t('pricing.faq.items.roi.question'),
		answer: t('pricing.faq.items.roi.answer'),
	},
]);
</script>

<template>
	<div>
		<!-- Hero Section -->
		<PageHero
			:title="t('pricing.hero.title')"
			:subtitle="t('pricing.hero.subtitle')"
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
								{{ t('common.popular') }}
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
							{{ t('pricing.additionalGate') }}: <strong class="text-dark-900">+300 000 {{ t('pricing.perMonthPrice') }}</strong>
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
							{{ t('pricing.coefficients.title') }}
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-3xl mx-auto">
							{{ t('pricing.coefficients.subtitle') }}
						</p>
					</ScrollReveal>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					<!-- Region Coefficients -->
					<ScrollReveal :delay="300">
						<Card class="p-6">
							<h3 class="text-xl font-heading font-bold text-dark-900 mb-6 flex items-center gap-2">
								<Icon name="lucide:map-pin" class="w-6 h-6 text-primary-600" />
								{{ t('pricing.coefficients.region.title') }}
							</h3>
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead>
										<tr class="border-b-2 border-dark-200">
											<th class="text-left py-3 px-2 font-semibold text-dark-900">{{ t('pricing.coefficients.region.category') }}</th>
											<th class="text-left py-3 px-2 font-semibold text-dark-900">{{ t('pricing.coefficients.region.regionName') }}</th>
											<th class="text-center py-3 px-2 font-semibold text-dark-900">{{ t('pricing.coefficients.region.coefficient') }}</th>
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
								{{ t('pricing.coefficients.flow.title') }}
							</h3>
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead>
										<tr class="border-b-2 border-dark-200">
											<th class="text-left py-3 px-2 font-semibold text-dark-900">{{ t('pricing.coefficients.flow.level') }}</th>
											<th class="text-left py-3 px-2 font-semibold text-dark-900">{{ t('pricing.coefficients.flow.description') }}</th>
											<th class="text-center py-3 px-2 font-semibold text-dark-900">{{ t('pricing.coefficients.region.coefficient') }}</th>
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
								<p class="text-lg text-dark-700 mb-2">{{ t('pricing.coefficients.formula.title') }}</p>
								<p class="text-2xl font-heading font-bold text-dark-900">
									{{ t('pricing.coefficients.formula.text') }}
								</p>
								<p class="text-dark-600 mt-4 text-sm">
									{{ t('pricing.coefficients.formula.example') }} <strong>920 000 {{ t('pricing.perMonthPrice') }}</strong>
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
							{{ t('pricing.installation.title') }}
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-3xl mx-auto">
							{{ t('pricing.installation.subtitle') }}
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
							{{ t('pricing.comparison.title') }}
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-2xl mx-auto">
							{{ t('pricing.comparison.subtitle') }}
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
											{{ t('pricing.comparison.function') }}
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
										<td class="py-4 px-4">{{ t('pricing.comparison.cameras') }}</td>
										<td class="text-center py-4 px-4">2</td>
										<td class="text-center py-4 px-4 bg-primary-50">4</td>
										<td class="text-center py-4 px-4">8</td>
										<td class="text-center py-4 px-4">16+</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">{{ t('pricing.comparison.barriers') }}</td>
										<td class="text-center py-4 px-4">1</td>
										<td class="text-center py-4 px-4 bg-primary-50">2</td>
										<td class="text-center py-4 px-4">4</td>
										<td class="text-center py-4 px-4">8+</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">{{ t('pricing.comparison.users') }}</td>
										<td class="text-center py-4 px-4">3</td>
										<td class="text-center py-4 px-4 bg-primary-50">5</td>
										<td class="text-center py-4 px-4">10</td>
										<td class="text-center py-4 px-4">20+</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">{{ t('pricing.comparison.reports') }}</td>
										<td class="text-center py-4 px-4">Basic</td>
										<td class="text-center py-4 px-4 bg-primary-50">Advanced</td>
										<td class="text-center py-4 px-4">Advanced</td>
										<td class="text-center py-4 px-4">Custom</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">{{ t('pricing.comparison.api') }}</td>
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
										<td class="py-4 px-4">{{ t('pricing.comparison.integration') }}</td>
										<td class="text-center py-4 px-4">
											<Icon name="lucide:x" class="w-5 h-5 text-dark-400 mx-auto" />
										</td>
										<td class="text-center py-4 px-4 bg-primary-50">{{ t('pricing.comparison.limited') }}</td>
										<td class="text-center py-4 px-4">{{ t('pricing.comparison.full') }}</td>
										<td class="text-center py-4 px-4">{{ t('pricing.comparison.full') }}</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">{{ t('pricing.comparison.sla') }}</td>
										<td class="text-center py-4 px-4">99.5%</td>
										<td class="text-center py-4 px-4 bg-primary-50">99.5%</td>
										<td class="text-center py-4 px-4">99.9%</td>
										<td class="text-center py-4 px-4">99.9%</td>
									</tr>
									<tr class="border-b border-dark-100">
										<td class="py-4 px-4">{{ t('pricing.comparison.support') }}</td>
										<td class="text-center py-4 px-4">Email</td>
										<td class="text-center py-4 px-4 bg-primary-50">Email + Chat</td>
										<td class="text-center py-4 px-4">24×7</td>
										<td class="text-center py-4 px-4">{{ t('pricing.features.personalManager') }}</td>
									</tr>
									<tr>
										<td class="py-4 px-4">{{ t('pricing.comparison.backup') }}</td>
										<td class="text-center py-4 px-4">7 {{ t('pricing.comparison.days') }}</td>
										<td class="text-center py-4 px-4 bg-primary-50">14 {{ t('pricing.comparison.days') }}</td>
										<td class="text-center py-4 px-4">30 {{ t('pricing.comparison.days') }}</td>
										<td class="text-center py-4 px-4">90 {{ t('pricing.comparison.days') }}</td>
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
									{{ t('pricing.enterprise.title') }}
								</h2>
								<p class="text-dark-300 mb-6">
									{{ t('pricing.enterprise.subtitle') }}
								</p>
								<ul class="space-y-3 mb-8">
									<li v-for="feature in enterpriseFeatures" :key="feature" class="flex items-center gap-3">
										<Icon name="lucide:check-circle" class="w-5 h-5 text-accent-400" />
										<span>{{ feature }}</span>
									</li>
								</ul>
								<Button variant="accent" size="lg">
									{{ t('common.contactUs') }}
									<Icon name="lucide:arrow-right" class="w-5 h-5 ml-2" />
								</Button>
							</div>
							<div class="hidden md:block">
								<div class="relative">
									<div class="absolute inset-0 bg-primary-500 rounded-2xl blur-3xl opacity-20"></div>
									<div class="relative bg-dark-700 rounded-2xl p-6">
										<div class="flex items-center gap-3 mb-4">
											<Icon name="lucide:building-2" class="w-8 h-8 text-primary-400" />
											<span class="font-heading font-bold text-xl">{{ t('pricing.enterprise.govObjects') }}</span>
										</div>
										<p class="text-dark-300 text-sm mb-4">
											{{ t('pricing.enterprise.govDescription') }}
										</p>
										<div class="flex items-center gap-2 text-accent-400 text-sm">
											<Icon name="lucide:shield-check" class="w-4 h-4" />
											<span>{{ t('pricing.enterprise.dataSecurityGuarantee') }}</span>
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
							{{ t('pricing.faq.title') }}
						</h2>
					</ScrollReveal>
					<ScrollReveal :delay="200">
						<p class="text-xl text-dark-600 max-w-2xl mx-auto">
							{{ t('pricing.faq.subtitle') }}
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
			:title="t('pricing.cta.title')"
			:subtitle="t('pricing.cta.subtitle')"
			:button-text="t('common.contactUs')"
			:secondary-button-text="t('pricing.cta.askQuestion')"
			secondary-button-icon="lucide:help-circle"
		/>
	</div>
</template>
