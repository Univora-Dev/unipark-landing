<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 pt-20 lg:pt-24">
      <slot />
    </main>
    <Footer />
  </div>
</template>
