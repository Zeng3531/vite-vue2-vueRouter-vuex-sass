import Vue from 'vue'
import moment from 'moment'
// 定义一个时间函数
Vue.filter('dataFormat', (date, format = 'YYYY-MM-DD  HH:mm:ss') => {
    return moment(date).format(format)
})
// 将时间戳转换为时间
Vue.filter('timeFormat', (time, format = 'YYYY-MM-DD  HH:mm:ss') => {
    return moment.unix(time).format(format)
})




