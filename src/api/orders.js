import instance from './request.js'



export function fetchgetorders(orderData) {
    return instance.post('/api/commitorder', orderData)
}

export function fetchgetordersId(user_id) {
    return instance.post(`/api/userorder/${user_id}`)
}
// 获取订单信息  
export function fetchgetordersInfo(orderinfo) {
    return instance.post(`/api/getorder/${orderinfo}`)
}
// 模拟订单成功
export function fetchgetorderId(order_id) {
    return instance.post(`/api/payorder/${order_id}`)
}
// 模拟物流信息
export function fetchgetinformation() {
    return instance.get(`/api/kuaidi100/`)
}