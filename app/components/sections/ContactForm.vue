<script setup lang="ts">
import type { ContactFormData } from '~/types'

const emit = defineEmits<{
  submit: [data: ContactFormData]
}>()

const { values: formData, errors, isValid, validate, reset } = useForm<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  agreeToTerms: false
})

const isSubmitting = ref(false)

// Создаем computed для безопасного доступа к errors
const errorName = computed(() => errors.value?.name)
const errorEmail = computed(() => errors.value?.email)
const errorMessage = computed(() => errors.value?.message)
const errorAgreeToTerms = computed(() => errors.value?.agreeToTerms)

const handleSubmit = async () => {
  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    // Эмитим данные формы родительскому компоненту
    emit('submit', { ...formData.value })

    // Сброс формы после успешной отправки
    reset()

    // TODO: Показать уведомление об успехе
  } catch (error) {
    // TODO: Показать уведомление об ошибке
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        v-model="formData.name"
        label="Имя *"
        placeholder="Ваше имя"
        :error="errorName"
        required
      />

      <Input
        v-model="formData.email"
        type="email"
        label="Email *"
        placeholder="your@email.com"
        :error="errorEmail"
        required
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        v-model="formData.phone"
        type="tel"
        label="Телефон"
        placeholder="+7 (___) ___-__-__"
      />

      <Input
        v-model="formData.company"
        label="Компания"
        placeholder="Название компании"
      />
    </div>

    <Textarea
      v-model="formData.message"
      label="Сообщение *"
      placeholder="Расскажите о вашем проекте..."
      :error="errorMessage"
      :rows="6"
      required
    />

    <Checkbox
      v-model="formData.agreeToTerms"
      :error="errorAgreeToTerms"
    >
      Я согласен с
      <NuxtLink to="#" class="text-primary-600 hover:underline">
        политикой конфиденциальности
      </NuxtLink>
      и
      <NuxtLink to="#" class="text-primary-600 hover:underline">
        условиями использования
      </NuxtLink>
    </Checkbox>

    <Button
      type="submit"
      variant="primary"
      size="lg"
      icon="lucide:send"
      :disabled="!isValid || isSubmitting"
      class="w-full md:w-auto"
    >
      {{ isSubmitting ? 'Отправка...' : 'Отправить сообщение' }}
    </Button>
  </form>
</template>
