<template>
    <div>
        <van-tabs v-model="active" @change="changeTabs">
            <van-tab v-for="item in tabs" :key="item.status" :title="item.text">
                <!-- 卡片 -->
                <van-card v-for="item in orderStatus" :key="item.order_id"
                    @click="$router.push(`/orderdetail/${item.order_id}`)" :num="item.number" :price="item.total_price"
                    :title="item.goods[0].title" :thumb="item.goods[0].thumb_path">
                    <template #tags>
                        <div>{{item.status}}</div>
                        <div class="vanTag">{{item.pay_way}}</div>
                        <div class="vanTag">下单的时间:{{item.add_time | timeFormat('YYYY-MM-DD HH:mm:ss')}}</div>
                    </template>
                    <template #footer>
                        <van-button size="mini" color="#7232dd" v-if="item.status===0">未付款</van-button>
                        <van-button size="mini" color="#3242dd" v-if="item.status===1">已付款</van-button>
                        <van-button size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)"
                            v-if="item.status===0" @click="tokefu">客服
                        </van-button>
                        <van-button size="mini" color="#3242dd" v-if="item.status===0" v-clipboard:copy="item.order_id
                        " v-clipboard:success="onCopy">复制订单号</van-button>
                        <template v-if="item.status===2">
                            <div>
                                <van-button size="mini" color="#3242dd">已完成</van-button>
                                <van-button size="mini" color="#3242dd" v-if="item.is_out===1">物流信息</van-button>
                                <van-button size="mini" color="#3242dd">评价</van-button>
                            </div>
                        </template>
                    </template>
                </van-card>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { fetchgetordersId } from '../api/orders.js'
import { fetchRegetshopcarlist } from '../api/goodslist.js'
export default {
    data() {
        return {
            active: 0,
            status: 'all',
            tabs: [
                { status: 'all', text: '全部' },
                { status: '0', text: '未付款' },
                { status: '1', text: '已付款' },
                { status: '2', text: '完成' },
            ],
            allOrderGoods: [],
        };
    },
    // 计算属性
    computed: {
        orderStatus() {
            if (this.status === 'all') {
                return this.allOrderGoods
            }
            // 筛选出对应状态
            return this.allOrderGoods.filter((item) => item.status == this.status)
        }
    },
    created() {
        this._fetchgetordersId()
    },
    methods: {
        changeTabs(index, text) {
            console.log(text);
            let statusMap = {
                '全部': 'all',
                '未付款': 0,
                '已付款': 1,
                '完成': 2,
            }
            console.log(statusMap[text]);
            let status = statusMap[text]
            this.status = status
        },
        tokefu() {
            this.$toast('扣我电话:13670382489')
        },
        onCopy() {
            event.stopPropagation();
            console.log('111111');
            this.$toast('复制成功')
        },
        async _fetchgetordersId() {
            let user_id = this.$store.state.userInfo.id
            console.log(user_id);
            let allOrder = await fetchgetordersId(user_id)

            // 获取关联的商品 拼接商品内容
            let PromiseAll = []
            // 不要在循环里面写await 这里是属于串行 
            allOrder.forEach(async (order) => {
                PromiseAll.push(fetchRegetshopcarlist(order.goods_ids))
            })
            let allGoods = await Promise.all(PromiseAll)
            const allOrderGoods = allOrder.map((order, index) => {
                order.goods = allGoods[index].message;
                return order;
            })
            this.allOrderGoods = allOrderGoods
            console.log(this.allOrderGoods);
        }
    },
};
</script>

<style lang="scss" scoped>
.vantag {
    color: #ccc;
    border: none;
    display: block;
    font-size: 12px;
}
</style>