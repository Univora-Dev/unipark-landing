<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const currentYear = new Date().getFullYear();

const footerLinks = computed(() => ({
	product: [
		{ name: t('footer.links.features'), path: '/features' },
		{ name: t('footer.links.pricing'), path: '/pricing' },
		{ name: t('footer.links.documentation'), path: '#' },
	],
	company: [
		{ name: t('footer.links.aboutUs'), path: '#' },
		{ name: t('footer.links.blog'), path: '#' },
		{ name: t('footer.links.careers'), path: '#' },
		{ name: t('footer.links.contacts'), path: '/contact' },
	],
	support: [
		{ name: t('footer.links.help'), path: '#' },
		{ name: t('footer.links.faq'), path: '#' },
		{ name: t('footer.links.techSupport'), path: '#' },
		{ name: t('footer.links.api'), path: '#' },
	],
	legal: [
		{ name: t('footer.links.privacyPolicy'), path: '#' },
		{ name: t('footer.links.termsOfUse'), path: '#' },
		{ name: t('footer.links.publicOffer'), path: '#' },
	],
}));

const socialLinks = [
	{ name: 'Telegram', icon: 'lucide:send', url: 'https://t.me/univorauz' },
	{ name: 'Instagram', icon: 'lucide:instagram', url: 'https://instagram.com/univorauz' },
	{ name: 'LinkedIn', icon: 'lucide:linkedin', url: 'https://www.linkedin.com/company/univorauz/' },
];
</script>

<template>
	<footer class="bg-dark-900 text-white">
		<div class="container-custom py-16">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
				<!-- Logo & Description -->
				<div class="lg:col-span-2">
					<div class="flex items-center mb-4">
						<img src="/unipark-dark.svg" alt="UniPark" class="h-8 w-auto" />
					</div>
					<p class="text-dark-300 mb-6 max-w-xs">
						{{ t('footer.description') }}
					</p>
					<!-- Contact Info -->
					<div class="space-y-3 mb-6">
						<a href="tel:+998992208484" class="flex items-center gap-2 text-dark-300 hover:text-white transition-colors">
							<Icon name="lucide:phone" class="w-4 h-4" />
							<span>+998 99 220 84 84</span>
						</a>
						<a href="https://t.me/univorauz" target="_blank" class="flex items-center gap-2 text-dark-300 hover:text-white transition-colors">
							<Icon name="lucide:send" class="w-4 h-4" />
							<span>@univorauz</span>
						</a>
					</div>
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
					<h3 class="font-heading font-bold text-lg mb-4">{{ t('footer.sections.product') }}</h3>
					<ul class="space-y-3">
						<li v-for="link in footerLinks.product" :key="link.name">
							<NuxtLink
								:to="link.path.startsWith('#') ? link.path : localePath(link.path)"
								class="text-dark-300 hover:text-white transition-colors"
							>
								{{ link.name }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Company Links -->
				<div>
					<h3 class="font-heading font-bold text-lg mb-4">{{ t('footer.sections.company') }}</h3>
					<ul class="space-y-3">
						<li v-for="link in footerLinks.company" :key="link.name">
							<NuxtLink
								:to="link.path.startsWith('#') ? link.path : localePath(link.path)"
								class="text-dark-300 hover:text-white transition-colors"
							>
								{{ link.name }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Support Links -->
				<div>
					<h3 class="font-heading font-bold text-lg mb-4">{{ t('footer.sections.support') }}</h3>
					<ul class="space-y-3">
						<li v-for="link in footerLinks.support" :key="link.name">
							<NuxtLink
								:to="link.path.startsWith('#') ? link.path : localePath(link.path)"
								class="text-dark-300 hover:text-white transition-colors"
							>
								{{ link.name }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Legal Links -->
				<div>
					<h3 class="font-heading font-bold text-lg mb-4">
						{{ t('footer.sections.legal') }}
					</h3>
					<ul class="space-y-3">
						<li v-for="link in footerLinks.legal" :key="link.name">
							<NuxtLink
								:to="link.path.startsWith('#') ? link.path : localePath(link.path)"
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
				<div
					class="flex flex-col md:flex-row items-center justify-between gap-4"
				>
					<p class="text-dark-400 text-sm">
						© {{ currentYear }} UniPark. {{ t('common.allRightsReserved') }}
					</p>
					<p class="text-dark-400 text-sm">
						{{ t('common.madeWith') }}
					</p>
				</div>
			</div>
		</div>
	</footer>
</template>
