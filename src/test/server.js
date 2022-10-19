const jwt = require('jsonwebtoken')

var data = {
    id: '1',
    username: '没了个没',
    password: '123456'

}

var primaryKey = 'Ysadjfasdad';

var token = jwt.sign(data, primaryKey, {
    // 过期时间
    expiresIn: '1h'
})
console.log(token);

// 校验token有效期 不能去篡改 
try {
    let result = jwt.verify(token+'alfdjalkdjf', primaryKey)
    console.log(result);
} catch (error) {
    // 要么是过期了，要么是失效了 篡改了
    console.log('检测到错误');
}

