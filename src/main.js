import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import './style.css'

// 编写vue插件(指令,过滤器,原型,组件)
Vue.use({
  install(vue) {
    console.log('install插件');
    Vue.prototype.$title='hello'
    Vue.component('my-button',{
      template:`<button>button</button>`
    })
    Vue.filter('dateFormat')
  }
})

Vue.use(function(Vue){
 console.log('install插件2');
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')