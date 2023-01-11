import { createApp } from 'vue';
import App from './App.vue'
import store from './store'
import translation from './assets/utils/translation';

createApp(App).use(translation).use(store).mount('#app');
