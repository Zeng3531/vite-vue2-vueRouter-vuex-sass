<template>
    <div class="goodsDetailcotainer">
        <div class="card">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in imgs" :key="item.src" @click="fetchLunboimg(index)"><img
                        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fimages01%2F20211005%2F4b88d16427634e3b92947f7b7614c01e.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666150091&t=772696e26fc978a8c41c5e9e699128bc" alt=""></van-swipe-item>
            </van-swipe>
        </div>
        <div class="card">
            <div class="price">
                <span class="sell_price">&yen;{{goodsinfo.sell_price}}</span>
                <span class="market_price">&yen;{{goodsinfo.market_price}}</span>
            </div>
            <div class="title van-multi">
                {{goodsinfo.title}}
            </div>
        </div>
        <div class="card">
            <!-- 分割线 -->
            <van-divider content-position="left">介绍</van-divider>
            <div class="content" v-html="goodsinfo.content"></div>
        </div>
        <div>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" dot />
                <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.getscreeningcarnumber" to="/home/shopcar"/>
                <van-goods-action-button type="warning" text="加入购物车" @click="addcar(true)" />
                <van-goods-action-button type="danger" text="立即购买" @click='buy(false)' />
            </van-goods-action>
        </div>
        <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="goodsinfo.id" :hide-stock="sku.hide_stock"
            :show-add-cart-btn="isShowBut" @add-cart="addCart" @buy-clicked="buyClicked">
            <template #sku-messages>
                <div class="card">
                    <!-- 分割线 -->
                    <van-divider>文字</van-divider>
                    <div>商品货号：{{goodsinfo.goods_no}}</div>
                    <div>库存：{{goodsinfo.stock_quantity}}</div>
                    <div>上架时间：{{goodsinfo.add_time | dataFormat('YYYY-MM-DD')}}</div>
                </div>
            </template>
        </van-sku>

    </div>
</template>

<script>
// 导入接口
import { fetchLunboDetail, fetchGoodsinfo } from '../api/goodsdetail.js'
import { ImagePreview } from 'vant';
export default {
    data() {
        return {
            id: this.$route.params.id,
            imgs: [],
            goodsinfo: {},

            //sku 
            isShowBut: false,
            show: false,
            sku: {
                // 数据结构
                tree: [],
                price: '3333',
                stock_num: 18,
                hide_stock: false
            },
            goods: {
                picture: ''
            }
            
        }
    },
    created() {
        this._fetchLunboDetail(),
            this._fetchGoodsinfo()
    },
    methods: {
        async _fetchLunboDetail() {
            const { message } = await fetchLunboDetail(this.id)
            console.log(message);
            this.imgs = message
            //给图片赋值
            this.goods.picture = this.imgs[0].src
        },

        // 基本信息
        async _fetchGoodsinfo() {
            const { message } = await fetchGoodsinfo(this.id)
            // 去掉图片的默认宽度
            let reg = /\width=['"]\w+['"]\s/ig;
            message.content = message.content.replace(reg, '')
            this.goodsinfo = message
            //给sku赋值
            this.sku.price = this.goodsinfo.sell_price
            this.sku.stock_num = this.goodsinfo.stock_quantity
        },
        // 预览图片
        fetchLunboimg(index) {
            let imgs = this.imgs.map(item => item.src)
            ImagePreview({
                images: imgs,
                startPosition: index
            });
        },
        // 加入购物车
        addcar(bool) {
            this.show = true
            this.isShowBut = bool
        },
        buy(bool) {
            this.show = true
            this.isShowBut = bool
        },
        // sku 加入到商品到购物车 依然停留在当前页面

        addCart(skuData) {
            let { goodsId, selectedNum } = skuData;
            let item = { id: goodsId, number: selectedNum, price: this.goodsinfo.sell_price, selected: true }
            // 提交一个方法mutation
            this.$store.commit('addGoodShopcar', item)
            this.show = false
            this.$toast({
                message: '加入购物车成功',
                icon: 'https://img1.baidu.com/it/u=2910771201,3194888889&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=400',
            });
            console.log('skuData', skuData);
        },
        buyClicked(skuData) {
            // 提交一个方法mutation
            let { goodsId, selectedNum } = skuData;
            let item = { id: goodsId, number: selectedNum, price: this.goodsinfo.sell_price, selected: true }
            // 提交一个方法mutation
            this.$store.commit('addGoodShopcar', item)
            this.show = false
            this.$toast({
                message: '加入购物车成功',
                icon: 'https://img1.baidu.com/it/u=2910771201,3194888889&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=400',
            });
            this.$router.push('/home/shopcar')
            console.log('skuData', skuData);
        },
        //sku 立即购买 跳转到购物车页面
    },
}
</script>

<style lang="scss" scoped>
.goodsDetailcotainer {
    height: 100vh;

    .card {
        border-radius: 6px;
        margin-bottom: 8px;
        background: rgb(250, 250, 250);
        padding: 8px;

        .my-swipe .van-swipe-item {
            height: 230px;
            text-align: center;

            img {
                width: 100%;
                height: 169px;
            }
        }

        .price {
            display: flex;
            justify-content: space-between;

            .sell_price {
                color: red;
                font-size: 20px;
                margin-right: 20px;
            }

            .market_price {
                color: #ccc;
                font-size: 14px;
                text-decoration: line-through;
            }
        }

        .title {
            color: #ccc;
            font-weight: 500;
        }

        .content {
            color: rgb(49, 145, 71);
            font-weight: 500;

            ::v-deep img {
                width: 100%;
                height: 100%;
            }
        }

    }
}
</style>