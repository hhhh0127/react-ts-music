/* element.scrollTo首先需要注意的是调用scrollTo方法的是出现滚动的父元素，即高度固定overflow:scroll的那个元素 */
/* ？？？没理解 */
export function scrollTo(element: any, to: number, duration: number) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}
