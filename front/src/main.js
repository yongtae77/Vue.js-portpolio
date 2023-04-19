import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false
// store 정의 해결
Vue.prototype.$store = store;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')