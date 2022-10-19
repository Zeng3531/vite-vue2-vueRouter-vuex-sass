import instance from './request.js'

export function fetchLunboDetail(id) {
    return instance.get(`http://api.w0824.com/api/getthumbimages/${id}`)
}
export function fetchGoodsinfo(id) {
    return instance.get(`http://api.w0824.com/api/getgoodsinfo/${id}`)
}