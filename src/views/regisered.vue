<template>
    <div class="registereds">
        <van-form>
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="password" type="password" name="密码" label="确定密码   " placeholder="确定密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" @click="register({username,password})" native-type="submit">注册账号
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
// 导入接口
import { fetchregister } from '../api/login.js'
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },

    methods: {
        async register(obj) {
            console.log(obj);
            const { username, password } = obj
            this.username = username
            this.password = password
            const result = await fetchregister(username, password)
            console.log(result);
        },
    },
};
</script>

<style lang="scss" scoped>
.registereds {
    position: relative;
}

.registered {
    color: #ccc;
    position: absolute;
    left: 100px;

}
</style>