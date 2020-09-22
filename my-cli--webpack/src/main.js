import Vue from 'vue';
import '@/index.css';
import '@/index.scss';
import App from './App.vue';
import router from './router/index';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
