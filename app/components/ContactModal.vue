<script setup lang="ts">
import ToastNotification from '~/components/ui/ToastNotification.vue'

const { isOpen, close } = useContactModal()
const { t } = useI18n()

const emit = defineEmits<{
  'submit': [data: any]
}>()

const form = ref({
  name: '',
  phone: '+998 ',
  message: ''
})

const loading = ref(false)

const isFormValid = computed(() => {
  return form.value.name.trim().length > 0 && form.value.phone.length > 7 // +998 + at least 2 digits
})

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

const closeModal = () => {
  close()
}

// Phone masking
const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '') // Faqat raqamlarni olamiz
  
  // 998 prefixini tekshirish va saqlash
  if (!value.startsWith('998')) {
    value = '998' + value
  }
  
  // Formatlash: +998 99 999 99 99
  let formatted = '+998 '
  if (value.length > 3) formatted += value.substring(3, 5)
  if (value.length > 5) formatted += ' ' + value.substring(5, 8)
  if (value.length > 8) formatted += ' ' + value.substring(8, 10)
  if (value.length > 10) formatted += ' ' + value.substring(10, 12)

  // Maksimal uzunlikni cheklash
  form.value.phone = formatted.substring(0, 17)
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    
    // In this simulation, response is always success if no error was thrown
    showNotification(t('contact.modal.successMessage'), 'success')
    setTimeout(() => {
        closeModal()
        // Formani tozalash
        form.value = { name: '', phone: '+998 ', message: '' }
    }, 500)

  } catch (error) {
    showNotification(t('contact.modal.errorMessage'), 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <ToastNotification 
      :show="showToast" 
      :message="toastMessage" 
      :type="toastType"
      @close="showToast = false" 
    />
  </Teleport>

  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />

      <!-- Modal Content -->
      <div class="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl scale-100 opacity-100">
        <!-- Close Button -->
        <button 
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          @click="closeModal"
        >
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>

        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ t('contact.modal.title') }}</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('contact.modal.nameLabel') }}</label>
            <input 
              v-model="form.name"
              type="text" 
              :placeholder="t('contact.modal.namePlaceholder')"
              maxlength="50"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white focus:ring-0 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('contact.modal.phoneLabel') }}</label>
            <input 
              v-model="form.phone"
              type="tel" 
              placeholder="+998 90 123 45 67"
              @input="handlePhoneInput"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white focus:ring-0 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('contact.modal.messageLabel') }}</label>
            <textarea 
              v-model="form.message"
              :placeholder="t('contact.modal.messagePlaceholder')"
              rows="3"
              maxlength="140"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary-500 focus:bg-white focus:ring-0 transition-all outline-none resize-none"
            ></textarea>
            <div class="text-xs text-gray-400 text-right mt-1" :class="{'text-red-500': form.message.length >= 140}">
              {{ form.message.length }}/140
            </div>
          </div>

          <button 
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed mt-4"
          >
            <span v-if="loading">{{ t('contact.modal.submitting') }}</span>
            <span v-else>{{ t('contact.modal.submitButton') }}</span>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .scale-100,
.modal-leave-to .scale-100 {
  transform: scale(0.95);
}
</style>
