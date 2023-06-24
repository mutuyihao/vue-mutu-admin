import { createApp } from 'vue'

import { createPinia } from 'pinia'
import 'qweather-icons/font/qweather-icons.css'
// 引入标准化css
import '@/assets/css/main.css'
// // 引入通用字体
// import 'vfonts/Lato.css'
// // 引入等宽字体
// import 'vfonts/FiraCode.css'
import App from './App.vue'
import router from './router'
import { registerDiscreteApi } from '@/plugin/inform'
const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.config.warnHandler = function (msg, vm, trace) {
//     return null
//   }
registerDiscreteApi()
router.isReady().then(() => {
  app.mount('#app')
})

