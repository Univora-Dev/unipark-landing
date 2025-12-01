export const useScrollAnimation = (
  threshold: number = 0.2,
  once: boolean = true
) => {
  const isVisible = ref(false)
  const element = ref<HTMLElement>()

  onMounted(() => {
    if (!element.value) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once) observer.disconnect()
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold }
    )

    observer.observe(element.value)

    onUnmounted(() => {
      observer.disconnect()
    })
  })

  return { isVisible, element }
}
