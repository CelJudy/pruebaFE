import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '/i18n.js';

const app = createApp(App)

if(localStorage.getItem('theme', 'light')=='light'){
    document.documentElement.classList.remove("dark");
}else{
    document.documentElement.classList.add("dark");
}

app.use(router)
app.use(i18n);
app.mount('#app')
