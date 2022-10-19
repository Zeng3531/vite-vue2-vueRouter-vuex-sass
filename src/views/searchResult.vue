<template>
    <div>
        <van-search v-model="keyword" placeholder="请输入搜索关键词" show-action @cancel="onCancel" @search="onSearch" />
        <!-- 下啦菜单 -->
        <van-dropdown-menu>
            <van-dropdown-item v-model="solt" :options="option2" @change="change" />
        </van-dropdown-menu>
        <div class="goodslist">
            <Good v-for="item in goodList" :key="item.id" :data="item" @goodClick="goodClick"></Good>
        </div>
    </div>
</template>

<script>
import { fetchFuzzyMatching } from '../api/home.js'
import Good from '../components/Good.vue'
export default {
    data() {
        return {
            goodList: [],
            keyword: this.$route.params.thisValue,
            solt: 'buy',
            order: 'desc',
            option2: [
                { text: '销量', value: 'buy' },
                { text: '好评', value: 'likes' },
                { text: '价格', value: 'sell_price' },
            ],
            page: 1,
            pagesize: 10,
        }
    },

    activated() {
        this._fetchFuzzyMatching()
        this.keyword = this.$route.params.thisValue
    },

    methods: {
        onCancel() {
            this.$router.back()
        },
        async _fetchFuzzyMatching() {
            // 数据 
            let data = {
                value: this.keyword,
                solt: this.solt,
                order: this.order,
                page: this.page,
                pagesize: this.pagesize,
            }

            let goodList = await fetchFuzzyMatching(data)
            this.goodList = goodList
        },
        onSearch() {
            this._fetchFuzzyMatching()
        },
        //更改 排序  字段 请求
        async change(value) {
            if (value == "sell_price") {
                this.order = 'asc'
            } if (value == "buy") {
                this.order = 'desc'

            } if (value == "likes") {
                this.order = 'desc'
            }
            console.log('排序的字段', value);
            this.solt = value
            let data = {
                value: this.keyword,
                solt: this.solt,
                order: this.order,
                page: this.page,
                pagesize: this.pagesize,
            }
            let result = await fetchFuzzyMatching(data)
            this.goodList = result
            console.log('新的数据', result);
        },
        goodClick({data:{id}}) {
            console.log('111121',data);
            this.router.push(`/goodsDetail/${id}`)
        }

    },
    components: { Good }
}
</script>

<style lang="scss" scoped>
.goodslist {
    margin-top: 3px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: rgb(230, 227, 227);
}
</style>