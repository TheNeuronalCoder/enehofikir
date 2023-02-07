export function click_outside(node) {
  const handle_click = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

	document.addEventListener('click', handle_click, true)
  
  return {
    destroy() {
      document.removeEventListener('click', handle_click, true)
    }
	}
}