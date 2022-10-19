import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import store from '../store/index.js'
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
    routes: [

        // 重定向到首页
        {
            path: '/',
            redirect: '/home/index'
        },
        {
            path: '/home', component: () => { return import('../views/index.vue') },
            children: [
                {
                    path: 'index', component: () => { return import('../views/Home.vue') },
                    meta: {
                        name: 'home',
                        isMainPage: true,
                    },
                    children: [
                        {
                            path: 'search', component: () => { return import('../views/search.vue') },
                            meta: {
                                name: 'search',
                                isMainPage: true,

                            },
                        }
                    ],
                },

                {
                    path: 'shopcar', component: () => { return import('../views/Shopcar.vue') },
                    meta: {
                        name: 'shopcar',
                        title: '购物车',
                        requireAuth: true
                    }
                },
                {
                    path: 'user', component: () => { return import('../views/User.vue') },
                    meta: {
                        name: 'user',
                        isMainPage: true,
                        requireAuth: true,
                    }
                }
            ],
        },

        {
            path: '/Goodslist', component: () => { return import('../views/Goodslist.vue') },
            meta: {
                title: '推荐商品',
                requireAuth: true,
            }
        },

        {
            path: '/goodsDetail/:id', component: () => { return import('../views/goodsDetail.vue') },
            meta: {
                title: '商品详情',
                requireAuth: true,
            }
        },
        {
            path: '/sku/:id', component: () => { return import('../views/sku.vue') },
            meta: {
                title: '商品详情',
                requireAuth: true,
            }
        },
        {
            path: '/Login', component: () => { return import('../views/login.vue') },
            meta: {
                title: '用户登录'
            }
        },
        {
            path: '/regisered', component: () => { return import('../views/regisered.vue') },
            meta: {
                title: '用户注册'
            }
        },
        {
            path: '/address', component: () => { return import('../views/address.vue') },
            meta: {
                title: '地址管理',
                requireAuth: true,
            }
        },
        {
            path: '/order', component: () => { return import('../views/order.vue') },
            meta: {
                title: '用户订单'
            }
        },
        {
            path: '/editaddress', component: () => { return import('../views/editaddress.vue') },
            meta: {
                title: '添加地址',
                requireAuth: true,
            }
        },
        {
            path: '/Editress/:addressInfo', component: () => { return import('../views/Editress.vue') },
            meta: {
                title: '修改地址',
                requireAuth: true,
            }
        },
        {
            path: '/orderdetail/:order_id', component: () => { return import('../views/orderdetail.vue') },
            meta: {
                title: '订单详情',
                requireAuth: true,
            }
        },
        {
            path: '/logistics/:orderInfo', component: () => { return import('../views/logistics.vue') },
            name: 'logistics',
            meta: {
                title: '订单详情',
                requireAuth: true,
            }
        },
        {
            path: '/searchResult/:thisValue', component: () => { return import('../views/searchResult.vue') },
            meta: {
                name: 'searchResult',
                title: '搜索',
            },
        }
    ]
})

// 关闭进度条
Nprogress.configure({
    showSpinner: false
})

// 前守卫
router.beforeEach((to, from, next) => {
    // 开启网页进度条
    Nprogress.start()
    // 判断是否需要权限 token
    if (to.meta.requireAuth) {
        // 有token 就进行下一步操作
        if (store.state.token) {
            next();
        } else {
            // 没有的话就打回登录页面   
            next(`/login?redirect=${to.fullPath}`)
        }
    } else {
        next();
    }
})

// 后守卫
router.afterEach((to, from,) => {
    // 关闭进度条
    Nprogress.done()
})

export default router;