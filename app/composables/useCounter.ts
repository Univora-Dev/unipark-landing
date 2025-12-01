export const useCounter = (
  target: number,
  duration: number = 2000
) => {
  const count = ref(0)
  const isAnimating = ref(false)

  const start = () => {
    if (isAnimating.value) return
    isAnimating.value = true

    const startTime = Date.now()
    const startValue = count.value

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      count.value = Math.floor(startValue + (target - startValue) * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        count.value = target
        isAnimating.value = false
      }
    }

    animate()
  }

  return { count, start, isAnimating }
}
