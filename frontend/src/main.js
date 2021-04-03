import Vue from 'vue'

import 'bootswatch/dist/lux/bootstrap.min.css'
import './assets/css/animations.styl'
import './assets/css/pace.styl'
import './assets/css/index.styl'
import './utilities/pace-config'
import './assets/js/pace.min'
import './utilities'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import VeeValidate from 'vee-validate'
import App from './App.vue'
import store from './store'
import router from './router'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VeeValidate)
Vue.use(VueFormulate)

// eslint-disable-next-line
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App,
  },
  template: '<App/>',
})
