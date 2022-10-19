import instance from './request.js'

export function fetchReGoodslist(page=1,pageindex=10) {
    return instance.get(`/api/getgoods?pageindex=${page}&pagesize=${pageindex}`)
}
// 获取购物车商品
export function fetchRegetshopcarlist(id) {
    return instance.get(`/api/getshopcarlist/${id}`)
}
