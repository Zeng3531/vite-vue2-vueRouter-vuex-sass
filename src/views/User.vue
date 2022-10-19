<template>
    <div class="usercss">

        <div class="head">
            <div class="headtop">
                <div class="content">
                    <h3>WELCOME HOME!</h3>
                    <span class="colors">SLGN IN TO YOUR ACCOUNT</span>
                    <h3>库里!</h3>
                </div>
            </div>
        </div>

        <!-- 头像 -->
        <div class="imgs">
            <van-image round width="6rem" height="6rem" :src='avatar' class="images" />
            <input v-show="false" type="file" ref="inputFile" @change="UpPicture">
        </div>

        <div class="toxiang" @click="reqlaceHeada">
            更换头像
        </div>
        <div class="groups">
            <van-cell-group>
                <van-cell title="我的订单" @click="$router.push('/order')"> 全部订单
                    <van-icon name="arrow" />
                </van-cell>
                <van-cell title="收获地址" value="内容" @click="$router.push('/address')">
                    <van-icon name="arrow" />
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="设置">
                    <van-icon name="arrow" />
                </van-cell>
                <van-cell title="关于易购">v1.3.2</van-cell>
            </van-cell-group>
            <div class="gologin" @click="ouTlogin">
                退出登录
            </div>
        </div>
    </div>
</template>

<script>
import { fetchupload } from '../api/login.js'
export default {

    data() {
        return {

        }
    },

    // 计算属性
    computed: {
        avatar() {
            return "https://api.w0824.com/" + this.$store.state.userInfo.avatar
        }
    },
    methods: {
        reqlaceHeada() {
            // 更换头像
            this.$refs.inputFile.click()
        },
        async UpPicture() {
            //拿到user_id
            let user_id = this.$store.state.userInfo.id
            let user_id1 = this.$store.state.userInfo.src
            console.log(user_id1);
            // 拿到图片的二进制文件
            const File = this.$refs.inputFile.files[0]
            if (!File) {
                return
            }
            let formData = new FormData()
            formData.set('user_id', user_id)
            formData.set('file', File)
            let { message, src, status } = await fetchupload(formData)
            if (status === 0) {
                this.$store.commit('UPHead', src)
                this.$toast({
                    message
                })
            }
        },

        ouTlogin() {
            const _this = this
            _this.$dialog.confirm({
                message: '确定要退出当账号？',
            })
                .then(() => {
                    _this.$store.commit('clearOldToken')
                    _this.$router.push('/login')
                })
                .catch(() => {

                });
        }
    },
}
</script>

<style lang="scss" scoped>
.usercss {
    position: relative;

    .head {
        .headtop {
            position: absolute;
            width: 100%;
            height: 180px;
            background-color: #6472b6;
            border-bottom-right-radius: 50%;
            border-bottom-left-radius: 50%;

            .content {
                margin: auto;
                color: white;
                text-align: center;
                margin-top: 20px;

                .colors {
                    color: #ccc;

                }
            }
        }
    }

    .imgs {
        position: relative;
        margin: auto;
        width: 200px;
        height: 100px;


        .images {
            position: absolute;
            top: 130px;
            left: 50px;
        }
    }

    .groups {
        width: 90%;
        height: 100px;
        margin: 60px auto;
        position: absolute;
        left: 3vh;
        top: 36vh;

        .gologin {
            width: 80%;
            height: 50px;
            border-radius: 10px;
            color: white;
            background-color: #6472b6;
            margin: auto;
            line-height: 50px;
            font-weight: 600;
            text-align: center;
        }

    }

    .toxiang {
        position: relative;
        width: 30%;
        height: 30px;
        border-radius: 10px;
        color: white;
        background-color: #6472b6;
        margin: 145px auto;
        line-height: 30px;
        font-weight: 600;
        text-align: center;
    }
}
</style>