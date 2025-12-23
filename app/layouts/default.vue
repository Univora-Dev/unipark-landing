<template>
	<div class="min-h-screen flex flex-col">
		<Header />
		<main class="flex-1 pt-20 lg:pt-20">
			<slot />
		</main>
		<Footer />
		<ContactModal />
	</div>
</template>
