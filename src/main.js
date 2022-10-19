import Vue from 'vue'
import App from './App.vue'
// 导入vantui 
import './vantui.js'
// 导入规范化样式 
import './assets/css/normalize.css'
import './assets/css/common.scss'
// 进度条样式
import '../node_modules/nprogress/nprogress.css'

//复制包
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
// 导入工具函数
import './utils/index.js'
//导入vue router
import router from './router/index.js'
import store from './store/index.js'


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')