import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"

createApp(App).use(createPinia()).mount('#app')