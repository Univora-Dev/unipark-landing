<script setup lang="ts">
import type { ContactFormData } from '~/types'

const { t } = useI18n()

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
    emit('submit', { ...formData.value })
    reset()
  } catch (error) {
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
        :label="t('contact.form.name') + ' *'"
        :placeholder="t('contact.form.namePlaceholder')"
        :error="errorName"
        required
      />

      <Input
        v-model="formData.email"
        type="email"
        :label="t('contact.form.email') + ' *'"
        placeholder="your@email.com"
        :error="errorEmail"
        required
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        v-model="formData.phone"
        type="tel"
        :label="t('contact.form.phone')"
        placeholder="+7 (___) ___-__-__"
      />

      <Input
        v-model="formData.company"
        :label="t('contact.form.company')"
        :placeholder="t('contact.form.companyPlaceholder')"
      />
    </div>

    <Textarea
      v-model="formData.message"
      :label="t('contact.form.message') + ' *'"
      :placeholder="t('contact.form.messagePlaceholder')"
      :error="errorMessage"
      :rows="6"
      required
    />

    <Checkbox
      v-model="formData.agreeToTerms"
      :error="errorAgreeToTerms"
    >
      {{ t('contact.form.agree') }}
      <NuxtLink to="#" class="text-primary-600 hover:underline">
        {{ t('contact.form.privacyPolicy') }}
      </NuxtLink>
      {{ t('contact.form.and') }}
      <NuxtLink to="#" class="text-primary-600 hover:underline">
        {{ t('contact.form.termsOfUse') }}
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
      {{ isSubmitting ? t('contact.form.submitting') : t('contact.form.submit') }}
    </Button>
  </form>
</template>
