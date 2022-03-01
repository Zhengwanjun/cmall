import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()//事件总线，只要在vue实例中都可以使用$bus
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
