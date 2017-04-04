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

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

console.log('new app');

router.onReady(() => {
  // actually mount to DOM
  console.log('mount app');
  app.$mount('#app')
})

// new Vue(Vue.util.extend({
//     el: '#app',
//     router,
//     store
// }, App))

// new Vue({ store: stores, router }).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })

// router.push('/')