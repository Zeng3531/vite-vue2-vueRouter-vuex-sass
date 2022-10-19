import instance from './request.js'

export function fetchLogin(username, password) {
    console.log(username, password, 'NEIBU');
    return instance.post('/api/login', { username, password })
}

export function fetchregister(username, password) {
    return instance.post('/api/register', { username, password })
}

export function fetchupload(formData) {
    return instance.post('/api/upload', formData)
}