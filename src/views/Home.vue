<template >
    <div class="homeContainer">
        <!-- 搜索框 -->
        <van-sticky>
            <div class="search">
                <van-search shape="round" background="#5e73b6" placeholder="请输入搜索关键词" @focus='seach' />
            </div>
        </van-sticky>

        <!-- 輪播圖 -->
        <div>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red" >
                <van-swipe-item v-for="(item,index) in LunboData" :key="item.img">
                    <img :src="item.img" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 九宫格 -->
        <div>
            <van-grid :column-num="4">
                <van-grid-item v-for="item in gridData" :key="item.src" :to="item.to">
                    <div class="mygriditem">
                        <img :src="item.src" alt="">
                        <span class="text">{{item.text}}</span>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>

        <!-- 分割线 -->
        <div>
            <van-divider>推荐商品</van-divider>
        </div>
        <!-- 推荐商品 -->
        <div class="goodslist">
            <Good v-for="item in goodsList" :key="item.id" :data="item" ></Good>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
// 轮播的接口
import { fetchLunbo, fetchRecommendGoods } from '../api/home.js'
import Good from '../components/Good.vue'
import img1 from '../assets/image/1.png'
import img2 from '../assets/image/2.png'
import img3 from '../assets/image/3.png'
import img4 from '../assets/image/4.png'
import img5 from '../assets/image/5.png'
import img6 from '../assets/image/6.png'
import img7 from '../assets/image/7.png'
import img8 from '../assets/image/8.png'
export default {
    data() {
        return {
            LunboData: [],
            gridData: [
                { src: img1, text: "快乐购物", to: '/goodslist' },
                { src: img2, text: "快乐购物", to: '/goodslist' },
                { src: img3, text: "快乐购物", to: '/goodslist' },
                { src: img4, text: "快乐购物", to: '/goodslist' },
                { src: img5, text: "快乐购物", to: '/goodslist' },
                { src: img6, text: "快乐购物", to: '/goodslist' },
                { src: img7, text: "快乐购物", to: '/goodslist' },
                { src: img8, text: "快乐购物", to: '/goodslist' },
            ],
            goodsList: []
        };
    },
    name: "Home",
    created() {
        this._fetchLunbo();
        this._fetchRecommendGoods()
    },
    methods: {
        async _fetchLunbo() {
            let data = await fetchLunbo();
            this.LunboData = data.message;
        },
        async _fetchRecommendGoods() {
            let { message } = await fetchRecommendGoods();
            console.log(message);
            this.goodsList = message
        },
        seach() {
            this.$router.push('/home/index/search')
        }
    },
    components: { Good }
}
</script>

<style lang="scss" scoped>
.homeContainer {
    margin-bottom: 50px;
    font-size: 14px;
    color: #666;

    .my-swipe {
        .van-swipe-item {
            height: 200px;
            line-height: 200px;
            text-align: center;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #fff;
    }

    .mygriditem {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        img {
            width: 50%;
        }

        .text {
            margin-top: 4px;
        }
    }
}
</style>
