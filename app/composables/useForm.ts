import type { ValidationRule } from '~/types'

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, ValidationRule<any>>>
) => {
  const values = ref<T>({ ...initialValues }) as Ref<T>
  const errors = ref<Partial<Record<keyof T, string>>>({})
  const isSubmitting = ref(false)
  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const validate = (field?: keyof T) => {
    if (!validationRules) return true

    if (field) {
      const rule = validationRules[field]
      if (rule) {
        const error = rule(values.value[field])
        if (error) {
          errors.value[field] = error
        } else {
          delete errors.value[field]
        }
      }
    } else {
      // Validate all fields
      Object.keys(validationRules).forEach((key) => {
        validate(key as keyof T)
      })
    }

    return isValid.value
  }

  const reset = () => {
    values.value = { ...initialValues }
    errors.value = {}
    isSubmitting.value = false
  }

  const handleSubmit = async (
    submitFn: (values: T) => Promise<void>
  ) => {
    if (!validate()) return

    isSubmitting.value = true
    try {
      await submitFn(values.value)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    validate,
    reset,
    handleSubmit
  }
}

// Validation helpers
export const validators = {
  required: (message: string = 'Это поле обязательно'): ValidationRule<any> => {
    return (value: any) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message
      }
      return null
    }
  },

  email: (message: string = 'Введите корректный email'): ValidationRule<string> => {
    return (value: string) => {
      if (!value) return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) ? null : message
    }
  },

  phone: (message: string = 'Введите корректный номер телефона'): ValidationRule<string> => {
    return (value: string) => {
      if (!value) return null
      const phoneRegex = /^[\d\s()+-]+$/
      return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10 ? null : message
    }
  },

  minLength: (min: number, message?: string): ValidationRule<string> => {
    return (value: string) => {
      if (!value) return null
      return value.length >= min ? null : message || `Минимум ${min} символов`
    }
  },

  maxLength: (max: number, message?: string): ValidationRule<string> => {
    return (value: string) => {
      if (!value) return null
      return value.length <= max ? null : message || `Максимум ${max} символов`
    }
  }
}
