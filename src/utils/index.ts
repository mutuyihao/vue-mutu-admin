import { h } from 'vue'
import { iconDark, NIcon } from 'naive-ui'
import type { Component } from 'vue'

function renderIcon(icon: Component) {
    return h(NIcon, h(icon))
}
export { renderIcon }