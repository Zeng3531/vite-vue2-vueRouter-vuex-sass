<template>
    <van-popup position="top" v-model='isShow' :round='true' :close-on-click-overlay='false'>
        <form action="/">
            <van-search show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" v-model='value' />
        </form>
        <template>
            <div class="SearchHistory">
                <h3>搜索历史</h3>
                <i class="iconfont icon-1" @click="clearinfo"></i>
            </div>
            <ul class="SHistory">
                <li v-for="(item,index) in SHistoryData" :key="item.index">
                    {{item}}</li>
            </ul>
        </template>
        <div class="SearchHistory">
            <h3>热门搜索</h3>
            <!-- <i :class="['iconfont',isShows?'icon-yanjing1':'icon-yanjing-biyan']" @click="SHistory"></i> -->
            <i :class="['iconfont',SHistoryshow]" @click="SHistory"></i>
        </div>
        <ul class="SHistory" v-show="isShows" v-if="isShows">
            <li v-for="item in hotData" :key="item.index" @click="clickli($event)">{{item}} </li>
        </ul>
        <div class="flex_c_c" v-else>隐藏热门搜索</div>

    </van-popup>
</template>

<script>
// 需要把你的搜索值 存储在本地 在取出放来历史里面
// 获取本地存储
let SHistoryData = JSON.parse(localStorage.getItem('SHistoryData' || '[]'))
export default {
    data() {
        return {
            isShow: true,
            isShows: true,
            value: '',
            content: true,
            SHistoryData: [],
            hotData: ['华为', '小米','机',]
        }
    },
    mounted() {
        console.log('为空', this.SHistoryData);
    },
    computed: {
        SHistoryshow() {
            return this.isShows ? 'icon-yanjing1' : 'icon-yanjing-biyan'
        },
    },
    methods: {
        onSearch() {

            // 判断是否有相同的值 有的话就不添加进去了
            if (this.SHistoryData.includes(this.value)) return
            // 1 获取输入的值,并存入到本地存储
            this.SHistoryData.push(this.value)
            console.log(this.value);
            localStorage.setItem('SHistoryData', JSON.stringify(this.SHistoryData))

            // 2 并跳入到搜索结果页面
            this.$router.push(`/searchResult/${this.value}`)
        },
        clearinfo() {
            // 清除本地存储的值 
            localStorage.removeItem('SHistoryData')
            this.SHistoryData = []
        },
        onCancel() {
            this.$router.back()
        },
        SHistory() {
            this.isShows = !this.isShows
            // ：显示： 隐藏
        },
        clickli(value) {
            this.value = value.target.innerText;
          this.onSearch() 
        }
    },
}
</script>

<style lang="scss" scoped>
.SearchHistory {
    display: flex;
    width: 90%;
    margin: auto;
    height: 40px;
    line-height: 40px;
    text-align: center;
    justify-content: space-between;
    align-items: center;
}

.SHistory {
    display: flex;
    width: 90%;
    margin: 10px auto;
    text-align: center;
    align-items: center;

    li {
        padding: 3px 7px;
        border-radius: 10px;
    }

    :nth-child(1) {
        margin-left: 0;
    }

    li {
        background-color: #e5e7eb;
        margin-left: 10px;
    }
}
</style>