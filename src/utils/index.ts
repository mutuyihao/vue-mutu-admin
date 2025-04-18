import { h } from 'vue'
import { iconDark, NIcon } from 'naive-ui'
import type { Component } from 'vue'
import dayjs from 'dayjs'
function renderIcon(icon: Component, attributes?: any) {
    if (attributes) {
        return h(NIcon, { ...attributes }, h(icon))
    } else {
        return h(NIcon, h(icon))
    }
}
export function formatterTime(timeString: string) {
    let time = dayjs(timeString).format("YYYY-MM-DD")
    return h('span', time)
}

export function formatTime(timeString: string, type?: string) {
    let time = dayjs(timeString).format(type ? type : "YYYY-MM-DD")
    return time
}
export function isMobile() {
    let isMobile = false
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true
    }
    return isMobile
}

export { renderIcon }
