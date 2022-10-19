<template>
    <div class="item" @click="chickHandle($event)">
        <div class="imgWrap">
            <img :src='data.img_url' alt="">
        </div>
        <div class="title">{{data.title}}</div>
        <slot name="bottom">
            <div class="footer">
                <span class="price">&yen;{{data.sell_price}}</span>
                <span class="buy">{{data.buy}}购买</span>
            </div>
        </slot>
    </div>
</template>

<script>

export default {
    name: 'Good',
    props: ['data'],
    methods: {
        chickHandle() {
            // 触发自定义事件
            this.$emit('goodClick', { data: this.data })
        }
    },
}
</script>

<style lang="scss" scoped>
.item {
    overflow: hidden;
    width: 45%;
    background-color: #fff;
    padding: 5px;
    border-radius: 20px;
    margin-bottom: 6px;

    .imgWrap {
        height: 104px;
        overflow: hidden;
        width: 100%;

        img {
            width: 100%;
        }
    }

    .title {
        padding: 5px;
        height: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .footer {
        display: flex;
        justify-content: space-between;

        .price {
            color: red;
            font-weight: 600;
        }
    }
}
</style>