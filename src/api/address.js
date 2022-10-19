import instance from './request.js'

export function fetchAddress(user_id, data) {
    return instance.post(`/api/addaddress/${user_id}`, data)
}

export function fetchgetAddress(user_id) {
    return instance.get(`/api/getaddress/${user_id}`)
}

export function fetchdeleteerss(address_id) {
    return instance.post(`/api/deladdress/${address_id}`)
}

export function fetchupeerss(address_id,data) {
    return instance.post(`/api/updateaddress/${address_id}`,data)
}

