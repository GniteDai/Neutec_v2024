import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('click-outside', {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  beforeUnmount(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
});

app.use(createPinia())
app.use(router)

app.mount('#app')
