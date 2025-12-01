<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checkboxId = computed(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <div class="w-full">
    <div class="flex items-start">
      <div class="flex items-center h-5">
        <input
          :id="checkboxId"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          :required="required"
          :class="[
            'w-4 h-4 rounded border-2 text-primary',
            'focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:bg-dark-100 disabled:cursor-not-allowed transition-all',
            {
              'border-red-500': error,
              'border-dark-300': !error
            }
          ]"
          @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        >
      </div>
      <label
        v-if="label"
        :for="checkboxId"
        class="ml-3 text-sm text-dark-700"
      >
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </div>
    <p v-if="error" class="mt-1 ml-7 text-sm text-red-500">{{ error }}</p>
  </div>
</template>
