import Vue from 'vue';
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters';


sync(store, router)


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})