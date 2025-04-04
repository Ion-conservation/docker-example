import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';
import { api, apiKey } from './utils/api.ts';
import router from './router/index'


const app = createApp(App)
const pinia = createPinia()

app.provide(apiKey, api)

app.use(pinia)
app.use(router)

app.mount('#app');
