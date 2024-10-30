import { onMounted, onUnmounted } from 'vue'

export const useEventListener = (
  target: Document | HTMLElement,
  event: keyof GlobalEventHandlersEventMap,
  handler: () => any,
) => {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => {
    target.addEventListener(event, handler)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}
