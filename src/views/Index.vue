<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" active-color="red">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="$store.getters.getscreeningcarnumber" to="/home/shopcar">购物车
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  watch: {
    '$route': {
      handler: function (newRoute, oldRoute) {
        let { name } = newRoute.meta
        const nameMap = {
          'home': 0,
          'shopcar': 1,
          'user': 2,
        }
        this.active = nameMap[name]
      },
      // 立即执行
      immediate: true
    }
  },

};
</script>

<style lang="scss" scoped>

</style>
  