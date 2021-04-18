export function createSingleton<T> (fn: () => T) {
  let instance: T
  return function () {
    if (!instance) {
      instance = fn()
    }
    return instance
  }
}
