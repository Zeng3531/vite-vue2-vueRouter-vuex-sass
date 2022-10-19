<template>
  <div>
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
      @change-area="changearea" @change-default="changeDefault" :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave" @delete="onDelete" :address-info="addressInfo" />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { fetchdeleteerss } from '../api/address.js'
import { fetchupeerss } from '../api/address.js'

export default {
  data() {
    return {
      areaList,
      isDefault: '',
      areaCode: '',
      fromaddressInfo: JSON.parse(this.$route.params.addressInfo),
      list: [

      ],
    };
  },
  created() {
    this.isDefault = this.fromaddressInfo.isDefault
    this.areaCode = this.fromaddressInfo.areaCode
  },
  computed: {
    addressInfo() {
      let addressinfo = JSON.parse(this.$route.params.addressInfo)
      addressinfo.isDefault = addressinfo.isDefault == 1 ? true : false
      addressinfo.areaCode = addressinfo.areaCode.split('-')[2]
      return addressinfo
    }
  },
  methods: {
    async onSave(addressInfo) {
      let isDefault = this.isDefault ? 1 : 0
      let areaCode = this.areaCode
      let country = addressInfo.county
      let data = {
        ...addressInfo,
        areaCode,
        isDefault,
        country,
      }
      let { status, message } = await fetchupeerss(addressInfo.id, data)
      this.$toast(message)
      if (status === 0) {
        this.$router.back()
      }
    },

    // 切换省市区
    changearea(data) {
      this.areaCode = data.map(item => item.code).join('-')
    },

    // 切换默认地址
    changeDefault(bool) {
      this.isDefault = bool
    },
    async onDelete(item) {
      let { id } = item
      let { status, message } = await fetchdeleteerss(id)
      this.$toast(message)
      if (status === 0) {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>