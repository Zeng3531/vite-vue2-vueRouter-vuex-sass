<template>
    <div class="shopContainer">
        <div class="isShowress" v-show="isShowress">
            <div class="icon">
                <i class="iconfont  icon-dizhi"></i>
            </div>
            <div class="content">
                <div class="userinfo">姓名:{{address.name}}
                </div>
                <div>手机:{{address.tel}}</div>
                <div class="detailedress">
                    地址:{{address.province}}{{address.city}}{{address.country}}{{address.addressDetail}}</div>
            </div>
        </div>
        <!-- button 为空显示 -->
        <button class="isshowbut" v-show="isShow" @click="$router.push('/Editaddress')"> <i
                class="iconfont  icon-dizhi"></i>请添加地址+</button>
        <!-- 为空 icon显示 -->
        <van-empty class="custom-image" v-show='isshopcar'
            image="https://img2.baidu.com/it/u=2281278719,4197881886&fm=253&fmt=auto&app=138&f=GIF?w=658&h=495"
            description="你还没有添加商品"><button class="tohome" @click="$router.push('/home/index')">前往首页</button>
        </van-empty>


        <div v-show="shopcars">
            <van-swipe-cell v-for="(item,index) in shopCarimgtitle" :key='item.id'>
                <van-card :num="$store.getters.upGooodcarNumber[item.id]" :price="item.sell_price" :desc="item.title"
                    class="goods-card" :thumb="item.thumb_path" />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button"
                        @click="deletefun(item.id,index)" />
                </template>
                <van-checkbox v-model="$store.getters.getGoodSelected[item.id]" class="checkBOx"
                    @click="checkedChange(item.id,$store.getters.getGoodSelected[item.id])"></van-checkbox>
                <van-stepper theme='round' button-size="22" disable-input
                    v-model="$store.getters.upGooodcarNumber[item.id]"
                    @change="checkedNumber(item.id,$store.getters.upGooodcarNumber[item.id])">
                </van-stepper>
            </van-swipe-cell>
        </div>


        <div class="ansubmitbar">
            <!-- vuex 的数据变化了 计算属性也会重新计算 -->
            <van-submit-bar @submit="SubmitOrders" :disabled="isDisabled" :price="$store.getters.getselectcarprice"
                button-text="提交订单">
                <template #default>
                    <div>
                        共选中{{$store.getters.getselectcarnumber}}件
                    </div>
                </template>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import { getOrderId } from '../utils/orderID.js'
import { fetchgetAddress } from "../api/address.js";
import { fetchRegetshopcarlist } from "../api/goodslist.js";
import { fetchgetorders } from '../api/orders.js'

export default {
    data() {
        return {
            id: this.$store.getters.getshopCarimgtitle,
            // 选中的id
            selectedID: this.$store.getters.getshopSelectedid,
            // 
            shopCarimgtitle: [],
            isShow: false,
            isShowress: false,
            isshopcar: false,
            checked: true,
            shopcars: false,
            address: {},
            carList: this.$store.state.carData,
            // 订单号
            ordeRid: ''
        }
    },
    computed: {
        isDisabled() {
            if (this.isShowress == false || this.carList.length == 0 || this.$store.getters.getshopSelectedid == 0) {
                return true
            }
            return false
        }
    },

    async created() {
        // if (!this.goods_ids) {
        //     return
        // }
        // 获取到商品信息
        this._fetchRegetshopcarlist()

        let user_id = this.$store.state.userInfo.id;
        let result = await fetchgetAddress(user_id)
        console.log(result);
        if (this.carList.length == 0) {
            this.isshopcar = true
            this.isShowress = false
            return
        } else if (this.carList.length == 1) {
            this.isshopcar = false
        }

        if (result.length == 0) {
            this.isShow = true
            this.shopcars = true
            this.isShowress = false
            return
        } else if (result.length == 1) {
            this.isShow = false
            this.shopcars = true
            this.isShowress = true
            this.address = result[0]
            return
        }

        let defaultress = result.find(item => item.isDefault == 1)
        if (defaultress) {
            this.address = defaultress
        } else {
            this.address = result[0]
        }
    },
    methods: {
        checkedChange(id, selected) {
            console.log(id, selected);
            this.$store.commit('upGooodcarselented', { id, selected })
        },
        checkedNumber(id, number) {
            console.log('sfdafdadafda', id, number);
            this.$store.commit('upGooodNumber', { id, number })
        },
        deletefun(id, index) {
            this.shopCarimgtitle.splice(index, 1)
            this.$store.commit('deleteshopcar', id,)
        },

        // 获取商品id 用来渲染页面
        async _fetchRegetshopcarlist() {
            const { message } = await fetchRegetshopcarlist(this.id)
            this.shopCarimgtitle = message
        },
        async SubmitOrders() {
            // 准备参数,
            let Orderdata = {
                user_id: this.$store.state.userInfo.id,
                order_id: getOrderId(),
                address_id: this.address.id,
                total_price: this.$store.getters.getselectcarprice,
                number: this.$store.getters.getselectcarnumber,
                goods_ids: this.selectedID,
            }
            console.log(Orderdata);
            // // 调用接口

            let { status, message } = await fetchgetorders(Orderdata)
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '订单提交中...',
            });
            if (status !== 0) {
                this.$toast('订单提交失败 请稍后在试')
                this.$toast.clear()
                return
            } else {
                this.$toast.clear()
                this.$toast('订单提交成功')
                this.$store.state.carData = []
                // this.$router.replace('/goodsDetail')
                this.$router.push('/order')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.shopContainer {
    .ansubmitbar {
        .van-submit-bar {
            bottom: 50px;
        }
    }



    .van-swipe-cell {
        position: relative;
        background-color: #ccc;

        .delete-button {
            width: 60px;
            height: 105px;
        }

        .van-stepper {
            z-index: 1000000000;
            position: absolute;
            top: 45px;
            left: 180px;
        }

        .checkBOx {
            z-index: 10000000000;
            position: absolute;
            top: 46px;
            right: 14px;
        }
    }



    .item {
        display: flex;
        justify-content: space-around;

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 12px;

            .price {
                color: red;
                font-weight: 800;
            }
        }

        .area {

            display: flex;
            justify-content: center;
            align-items: center;
            justify-content: space-between;

            .van-button {
                margin-left: 30px;
            }
        }

        .imgWrap {
            img {
                width: 70px;
                height: 70px;
            }
        }
    }

    .isShowress {
        display: flex;
        width: 100%;
        height: 55px;
        margin: auto;
        font-weight: 600;
        font-size: 12px;
        color: rgb(65, 57, 57);
        border-radius: 10px;
        background-color: #efeded;

        .icon {
            position: relative;
            color: red;
            width: 20px;
            height: 50px;
            line-height: 50px;

            .icon-dizhi {
                position: absolute;
                font-size: 19px;
                left: 25px;
            }
        }

        .content {

            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 13px;
            width: 80%;
            height: 100%;
            margin-left: 40px;

        }
    }

    .isshowbut {
        width: 100%;
        height: 55px;
        border-radius: 10px;
        border: none;
        font-size: 14px;
        color: rgb(65, 57, 57);
    }

    .van-empty {
        .tohome {
            width: 110px;
            border-radius: 10px;
            border: none;
            height: 40px;
            background-color: red;
            color: white;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size: 14px;
            font-weight: 600;

        }
    }
}
</style>