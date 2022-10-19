import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
    state: {
        carData: [],
        token: '',
        userInfo: {}
    },
    mutations: {
        addGoodShopcar(state, good) {
            console.log('addGoodShopcar', good);
            // 在加入购物车之前判断一下有没有同名id商品
            const index = state.carData.findIndex(item => item.id == good.id)
            if (index !== -1) {
                state.carData[index].number += good.number
            } else {
                state.carData.push(good)
            }
        },
        upGooodcarselented(state, obj) {
            console.log(state, obj);
            const index = state.carData.findIndex(item => item.id == obj.id)
            console.log(index);
            state.carData[index].selected = obj.selected
        },
        upGooodNumber(state, obj) {
            console.log(state, obj);
            const index = state.carData.findIndex(item => item.id == obj.id)
            console.log(index);
            state.carData[index].number = obj.number
        },
        // 删除
        deleteshopcar(state, id) {
            const index = state.carData.findIndex(item => item.id == id)
            state.carData.splice(index, 1)
        },
        // // 存储用户的token
        tokentovuex(state, token) {
            state.token = token
        },
        userinfotovuex(state, userInfo) {
            state.userInfo = userInfo
        },
        // 清除旧的token 
        clearOldToken(state) {
            state.token = ''
            state.userInfo = ''
            state.carData = []
        },
        //更新头像
        UPHead(state, src) {
            state.userInfo.avatar = src
        }
    },
    getters: {
        // 获取用户id 用来渲染购物车的页面图片
        getshopCarimgtitle(state) {
            let result = state.carData.map(item => item.id).join(',')
            return result
        },
        // 获取用户id 用来渲染购物车的页面图片
        getshopSelectedid(state) {
            let result = state.carData.filter(item => item.selected).map(item=> item.id).join(',')
            return result
        },
        getGoodSelected(state) {
            const obj = {};
            state.carData.forEach(item => {
                obj[item.id] = item.selected
            })
            return obj
        },
        upGooodcarNumber(state) {
            const obj = {};
            state.carData.forEach(item => {
                obj[item.id] = item.number
            })
            return obj
        },
        // 获取筛选的总数量
        getscreeningcarnumber(state) {
            let screeningcarnumbe = 0
            state.carData.forEach(item => {
                screeningcarnumbe += parseInt(item.number)
            })
            return screeningcarnumbe
        },
        // 获取筛选的选中数量
        getselectcarnumber(state) {
            let screeningcarnumbe = 0
            state.carData.forEach(item => {
                if (item.selected) {
                    screeningcarnumbe += parseInt(item.number)
                }
            })
            return screeningcarnumbe
        },
        // 获取筛选的选价格
        getselectcarprice(state) {
            let screeningcarprice = 0
            state.carData.forEach(item => {
                if (item.selected) {
                    screeningcarprice += parseFloat(item.price) * parseInt(item.number) * 100
                }
            })
            return screeningcarprice
        }
    },
    plugins: [createPersistedState()]
})

export default store;