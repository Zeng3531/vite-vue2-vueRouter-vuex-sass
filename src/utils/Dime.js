
// 题目：模拟飞机的起飞时间，和到达时间，
// 起飞时间：2022.10.31， 23：00：00，
// 到达时间：第二天的， 05：00：00，

// 怎么获取第二天的日期
const moment = require('moment')

filter('timeFormat', (time, format = 'YYYY-MM-DD  HH:mm:ss') => {
    return moment.unix(time).format(format)
})

// 2种情况，要么当天就到达，要么第二天到达，第二天到达还可能跨月哦




