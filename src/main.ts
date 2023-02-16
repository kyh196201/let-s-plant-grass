import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/styles/main.scss';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { default as initFontAwesome } from '@/plugins/font-awesome';

initFontAwesome();

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');
