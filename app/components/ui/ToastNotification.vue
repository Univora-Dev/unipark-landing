<script setup lang="ts">
const props = defineProps<{
  show: boolean
  message: string
  type?: 'success' | 'error'
}>()

const emit = defineEmits<{
  'close': []
}>()

watch(() => props.show, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      emit('close')
    }, 3000)
  }
})
</script>

<template>
  <Transition name="toast">
    <div 
      v-if="show"
      class="fixed top-24 right-4 z-[60] flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border backdrop-blur-md"
      :class="[
        type === 'error' 
          ? 'bg-red-50/90 border-red-100 text-red-900' 
          : 'bg-green-50/90 border-green-100 text-green-900'
      ]"
    >
      <div 
        class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        :class="type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'"
      >
        <Icon 
          :name="type === 'error' ? 'lucide:alert-circle' : 'lucide:check'" 
          class="w-5 h-5" 
        />
      </div>
      
      <p class="font-medium text-sm">{{ message }}</p>

      <button 
        @click="$emit('close')"
        class="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors ml-2"
      >
        <Icon name="lucide:x" class="w-4 h-4 opacity-50" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}
</style>
