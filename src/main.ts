import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入标准化css
import '@/assets/css/main.css'
// 引入通用字体
import 'vfonts/Lato.css'
// 引入等宽字体
import 'vfonts/FiraCode.css'
import App from './App.vue'
import router from './router'
import { getData } from './api'
// import naive from 'naive-ui'
const app = createApp(App)

// app.use(createPinia())
app.use(router)

app.mount('#app')
// app.use(naive)