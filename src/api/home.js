import instance from './request.js'

export function fetchLunbo() {
    return instance.get('/api/getlunbo')
}
// 获取轮播的数据
export function fetchRecommendGoods(page = 1, limit = 10) {
    return instance.get(`/api/recommend?page=${page}&limit=${limit}`)
}

// 模糊匹配
export function fetchFuzzyMatching(data) {
    let queryString = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')
    console.log(queryString);
    return instance.get(`/api/search?${queryString}`)
}



