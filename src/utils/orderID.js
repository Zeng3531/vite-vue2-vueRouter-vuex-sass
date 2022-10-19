
import {nanoid} from 'nanoid'
// 生成唯一的订单号
export function getOrderId() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const randomId = nanoid()
    return `${year}${month}${day}${hours}${minutes}${year}${randomId}`
}