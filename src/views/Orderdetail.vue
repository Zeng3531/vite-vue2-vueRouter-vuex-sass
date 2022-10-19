<template>
    <div class="usercss">
        <div class="head">
            <div class="headtop">
                <div class="content">
                    <h3>{{statusText}}</h3>
                </div>
            </div>
        </div>

        <!-- 头像 -->
        <div class="imgs">
            <van-image round width="4rem" height="4rem"
                src="https://img1.baidu.com/it/u=1245799470,2479082810&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=423"
                class="images" />
        </div>
        <!-- 地址 -->
        <div class="isShowress" v-if="orderInfo.address_info">
            <div class="icon">
                <i class="iconfont  icon-dizhi"></i>
            </div>
            <div class="content">
                <div class="userinfo">{{orderInfo.address_info.name}}&perp;<span>{{orderInfo.address_info.tel}}</span>
                </div>
                <div class="detailedress">
                    {{orderInfo.address_info.province}}
                    {{orderInfo.address_info.city}}
                    {{orderInfo.address_info.country}}

                </div>
            </div>
        </div>
        <!-- 商品列表 -->
        <div>
            <!-- 卡片 -->
            <van-card :price="orderInfo.total_price" title="asdfas"
                thumb="https://img2.baidu.com/it/u=2563154504,1200436114&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500">
            </van-card>
        </div>
        <div class="groups">
            <van-cell-group v-if="orderInfo.address_info">
                <van-cell title="下单时间"> {{orderInfo.address_info.add_time | dataFormat('YYYY-MM-DD')}} </van-cell>
                <van-cell title="商品总价"> {{orderInfo.total_price}}</van-cell>
                <van-cell title="实付款">{{orderInfo.actual_price}} </van-cell>
                <van-cell title="付款方式">{{orderInfo.pay_way}}</van-cell>
                <van-cell title="运费险">正在进行中</van-cell>
                <van-cell title="填单号">{{order_id}}
                    <van-button size="mini" color="#3242dd" v-clipboard:copy="orderInfo.order_id"
                        v-clipboard:success="onCopy">复制
                    </van-button>
                </van-cell>
                <!-- 订单的一些按钮 -->
                <van-cell title="订单状态">
                    <van-button size="mini" color="#7232dd" v-if="orderInfo.status===0" @click="puy">立即付款</van-button>
                    <van-button size="mini" color="#3242dd" v-if="orderInfo.status===1 && orderInfo.is_out===0">提醒发货
                    </van-button>
                    <template v-if="orderInfo.status===2">
                        <div>
                            <van-button size="mini" color="#7232dd">完成</van-button>
                            <van-button size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)"
                                v-if="orderInfo.is_out===1" @click="information">物流信息</van-button>
                            <van-button size="mini" color="#3242dd">去评价</van-button>
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
        <!-- 物流信息 -->

        <van-popup v-model="isShow" position="bottom" style="height: 83%;">
            <div class="isShowress" v-if="orderInfo.address_info">
                <div class="icon">
                    <i class="iconfont  icon-dizhi"></i>
                </div>
                <div class="content">
                    <div class="userinfo">
                        {{orderInfo.address_info.name}}&perp;<span>{{orderInfo.address_info.tel}}</span>
                    </div>
                    <div class="detailedress">
                        {{orderInfo.address_info.province}}
                        {{orderInfo.address_info.city}}
                        {{orderInfo.address_info.country}}

                    </div>
                </div>
            </div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="item in informations" :key="item.time">
                    <h3>{{item.location}}</h3>
                    <p>{{item.time}}</p>
                </van-step>
            </van-steps>
        </van-popup>
    </div>
</template>
<script>
import { fetchgetordersInfo, fetchgetorderId, fetchgetinformation } from '../api/orders.js'
import { fetchRegetshopcarlist } from '../api/goodslist.js'
export default {
    data() {
        return {
            order_id: this.$route.params.order_id,
            orderInfo: {},
            goods: [],
            isShow: false,
            informations: []
        }
    },
    created() {
        this._fetchgetordersInfo()
        this._fetchCarGoods()
    },
    computed: {
        // 订单状态
        statusText() {
            let { is_take, is_out, status } = this.orderInfo
            console.log(is_take, is_out, status);
            if (is_out === 0 && is_take === 0) {
                return '你的商品正在派送中'
            }
            if (status === 2) {
                return '你的商品已签收'
            }
        }
    },
    methods: {
        async _fetchgetordersInfo() {
            const orderInfo = await fetchgetordersInfo(this.order_id)
            this.orderInfo = orderInfo
            console.log(this.orderInfo);
        },
        // 获取关联的商品 拼接商品内容
        async _fetchCarGoods() {
            console.log('111');
            let { message } = await fetchRegetshopcarlist(this.orderInfo.goods_ids)
            this.goods = message
            console.log(goods);
        },

        puy() {
            // 调用接口
            const _this = this
            this.$dialog.confirm({
                title: '付款',
                message: '是否确定支付?',
            })
                .then(async () => {
                    try {
                        await fetchgetorderId(this.orderInfo.order_id)
                        // 支付成功提示
                        _this.$toast.usercss({
                            message: '微信支付成功',
                            icon: "wechat-pay",
                        });
                        // 修改订单状态
                        _this.orderInfo.status = 2
                        _this.orderInfo.is_out = 1
                        _this.orderInfo.is_take = 1
                    } catch (error) {
                        console.log(' 网络异常,请稍后在支付');
                        _this.$toast('网络异常,请稍后在支付')
                    }
                })
                .catch(() => {
                    _this.$toast('支付失败')
                    // on cancel
                });
        },
        // 查看物流信息
        async information() {
            // 小优化
            if (this.informations.length !== 0) {
                // 有数据就直接返回
                return
            } else {
                //没有数据就发请求
                this.isShow = true
                const information = await fetchgetinformation()
                this.informations = information
            }
        },
        onCopy() {
            event.stopPropagation();
            console.log('111111');
            this.$toast('复制成功')
        },

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
            height: 130px;
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
            top: 50px;
            left: 70px;
            z-index: 1000000;
            border-radius: 50%;
            background-color: green;
        }
    }

    .toxiang {
        position: relative;
        width: 30%;
        height: 30px;
        border-radius: 10px;
        top: 150px;
        color: white;
        background-color: #6472b6;
        margin: 145px auto;
        line-height: 30px;
        font-weight: 600;
        text-align: center;
    }

    .isShowress {
        display: flex;
        width: 100%;
        height: 55px;
        margin: 29px auto;
        font-weight: 600;
        font-size: 12px;
        color: white;
        background-color: #6472b6;

        .icon {
            position: relative;
            color: white;
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
            justify-content: space-evenly;
            font-size: 14px;
            font-weight: 600;
            width: 80%;
            height: 100%;
            margin-left: 40px;

        }
    }


    .groups {
        background-color: #6472b6;
    }
}
</style>