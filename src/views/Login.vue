<template>
    <div class="registereds">
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <div class="registered" style="margin: 16px;">
            <span @click="register">没有账号?去注册</span>
        </div>
    </div>
</template>

<script>
// 导入接口
import { fetchLogin } from '../api/login.js'
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        //当我点击的时候去调用这个接口
        async onSubmit(obj) {
            const { username, password } = obj
            const { token, status, userInfo, massage } = await fetchLogin(username, password)

            if (status === 0) {
                this.$toast(massage)
                //登录成功后将数据存储带vuex里面
                this.$store.commit('tokentovuex', token)
                this.$store.commit('userinfotovuex', userInfo)
                // 获取到重定向的的参数redirect
                let { redirect } = this.$route.query
                if(redirect){
                    this.$router.push(redirect)//打回之前访问的页面
                }else{
                    this.$router.push('/home/index')
                }

            } else {
                this.$toast('用户名,或密码失败')
            }
        },
        register() {
            this.$router.push('/regisered')
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