<template>
  <div id="app">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.back()" v-show='isShowNarbar' />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      isShowNarbar: false,
      title: '易购!'

    }
  },


  watch: {
    '$route': {
      handler: function (newRoute, oldRoute) {
        // 是主頁就隱藏narbar 
        let { isMainPage, title } = newRoute.meta
        this.title = title
        if (isMainPage == true) {
          this.isShowNarbar = false
        } else {
          this.isShowNarbar = true
        }
      }
    },
    immediate: true
  },
}
</script>
<style lang="scss">
@import url(./assets/css/common.scss);

#app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
}
</style>

