import {createApp} from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import './assets/styles/index.css'
import App from './App.vue'
import router from "./router";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});

app.mount('#app')
