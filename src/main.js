import { createApp } from 'vue'
import { createPinia } from 'pinia' //импорт стора пинии

import App from './App.vue'
import './assets/main.css'

createApp(App).use(createPinia()).mount('#app') // подключение стора
