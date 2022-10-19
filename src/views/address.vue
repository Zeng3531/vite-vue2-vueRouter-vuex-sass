<template>
    <div>
        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
        <van-empty class="custom-image" v-show='isShow'
            image="https://img2.baidu.com/it/u=2281278719,4197881886&fm=253&fmt=auto&app=138&f=GIF?w=658&h=495"
            description="你还没有添加地址" />
    </div>
</template>

<script>
import { fetchgetAddress } from '../api/address.js'
export default {
    data() {
        return {
            isShow: false,
            chosenAddressId: 0,
            list: [
            ],
        };
    },
    created() {
        // 获取到用户地址
        this._fetchgetAddress()
    },
    methods: {
        onAdd() {
            this.$router.push('/Editaddress')
        },
        async _fetchgetAddress() {
            // 拿到id 
            console.log(this.$store.state.userInfo.id, 'ID');
            let user_id = this.$store.state.userInfo.id
            let result = await fetchgetAddress(user_id)
           
            if (result.length === 0) {
                this.isShow = true
                return
            } else if (result.length === 1) {
                this.chosenAddressId = result[0].id
            }

            result = result.map(item => {
                // 是默认地址的话 就取出id赋值
                if (item.isDefault === 1) {
                    this.chosenAddressId = item.id
                }
                let { province, city, country, addressDetail } = item
                item.address = `${province}${city}${country}${addressDetail}`
                return item
            })
            console.log('333', result);
            this.list = result
        },
        onEdit(item, index) {
            // 把当前得地址信息传入到编辑页面 用来回显
            this.$router.push('/Editress/'+JSON.stringify(item))
        },
    },
};
</script>

<style lang="scss" scoped>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
</style>