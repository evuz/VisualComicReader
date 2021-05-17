export function isScrollable (element?: HTMLElement | null) {
  if (!element) {
    return false
  }
  return element.scrollHeight > element.offsetHeight
}
