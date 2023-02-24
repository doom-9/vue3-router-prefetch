const observerMap = new WeakMap()

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const callback = observerMap.get(entry.target)
      if (callback instanceof Function)
        callback()
      observer.unobserve(entry.target)
    }
  })
})

export function beginObserve(target: Element, callback: () => any) {
  observerMap.set(target, callback)

  observer.observe(target)
}

export function stopObserve(target: Element) {
  observerMap.delete(target)

  observer.unobserve(target)
}
