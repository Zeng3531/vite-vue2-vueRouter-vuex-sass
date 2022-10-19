import axios from 'axios'
import store from '../store/index.js'
import { Toast } from 'vant';
import router from '../router/index.js'
const instance = axios.create({
    baseURL: 'http://api.w0824.com/',
    timeout: 10000,
})

//添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 将token 带给服务器验证 
    if (store.state.token) {
        config.headers.token = store.state.token
        config.headers['If-Modified-Since'] = 0
    }

    Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

//添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 关闭加载
    Toast.clear()
    // 对后台的接口进行统一的状态码 进行统一
    let { status, message } = response.data
    if (status === 40001) {
        Toast(message)
        // 清除旧的token
        store.commit('clearOldToken')
        router.push('/login')
        return
    }
    return response.data;
}, function (error) {
    Toast.clear()
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 导出axios实例
export default instance