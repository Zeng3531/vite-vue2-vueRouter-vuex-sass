let obj = { a: 1, b: 2 }

let result = Object.keys(obj).map(key =>`${key}=${obj[key]}`).join('&')
console.log(result);