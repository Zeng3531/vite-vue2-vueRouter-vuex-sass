<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="goodslist">
                    <Good v-for="item in lists" :key="item.id" :data="item" @goodClick="foo">
                        <template #bottom>
                            <div class="footerArea">
                                <div class="price">
                                    <span class="sell_price">&yen;{{item.sell_price}}</span>
                                    <span class="margin_price">&yen;{{item.market_price}}</span>
                                </div>

                                <div class="info">
                                    <span class="hot">
                                        <van-icon name="hot-o" />
                                    </span>
                                    <span class="kucun">库存{{item.stock_quantity}}</span>
                                </div>
                            </div>
                        </template>
                    </Good>
                </div>

            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
//导入接口
import { fetchReGoodslist } from '../api/goodslist.js'
import Good from '../components/Good.vue'
export default {
    data() {
        return {
            page: 1,
            pagesize: 3,
            lists: [],
            loading: false,
            finished: false,
            refreshing: false,
        };
    },

    methods: {
        // 上拉加载
        onLoad() {
            this.page++
            this._fetchReGoodslist()
        },

        // 下拉刷新
        onRefresh() {
            // 清空列表数据
            this.page = 0
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },


        async _fetchReGoodslist() {
            if (this.refreshing) {
                this.lists = [];
                this.refreshing = false;
            }
            const result = await fetchReGoodslist(this.page, this.pagesize);
            this.loading = false
            this.lists = [...this.lists, ...result.message]
            if (result.message.length === 0) {
                this.lists.length % 2 !== 0 && this.lists.pop()
                this.finished = true;
            }
        },
        foo({ data }) {
            console.log('111111111111',data.id);
            this.$router.push(`goodsDetail/${data.id}`)
        },
    },
    components: {
        Good
    }
};
</script>

<style lang="scss" scoped>
.goodslist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;

    .footerArea {
        .price {
            display: flex;
            justify-content: space-between;

            .sell_price {
                color: red;
                font-weight: 600;
            }

            .margin_price {
                font-size: 14px;
                color: #666;
            }
        }

        .info {
            display: flex;
            justify-content: space-between;

            .hot {
                font-size: 25px;
                font-weight: 800;
                color: red;
            }

            .kucun {
                font-size: 14px;
                color: #ccc;
            }
        }
    }
}
</style>