<template>
  <div>
    <van-address-edit :area-list="areaList" show-postal  show-set-default show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"  @change-area='changeArea' />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { fetchAddress } from '../api/address.js'
export default {
  data() {
    return {
      areaList,
      changeCode: ''
    };
  },
  methods: {
    async onSave(adduserInfo) {
      // 拿到接口对接数据的信息 
      // 1 用户的id 
      let user_id = this.$store.state.userInfo.id
      adduserInfo.isDefault = adduserInfo.isDefault ? 1 : 0;
      adduserInfo.country = adduserInfo.county;
      let data = {
        ...adduserInfo,
        areaCode: this.changeCode
      }
      console.log(data);
      let { status, message } = await fetchAddress(user_id, data)
      Toast(message)
      console.log(message);
      if (status === 0) {
        this.$router.back('/address')
      }
    },
    changeArea(area) {
      this.changeCode = area.map(item => item.code).join('-')
    },
  },
};
</script>

<style lang="scss" scoped>

</style>