import Vue from 'vue'
import 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue } from 'bootstrap-vue'
import { BFormRating } from 'bootstrap-vue'
Vue.component('b-form-rating', BFormRating)
import { IconsPlugin } from 'bootstrap-vue'
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')