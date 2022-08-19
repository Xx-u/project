import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// 主页
import Home from '../views/home/Index.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: '多快好省,购物上xu商城'
        },
    },
    {
        path: '/shopping',
        name: 'shopping',
        component: () => import('../views/shopping/Shopping.vue'),
        meta: {
            auth: true,
            title: 'xu商城-用户购物车'
        }
    },
    {
        path: '/shoppage',
        name: 'shoppage',
        component: () => import('../views/shopping/ShopPage.vue'),
        meta: {
            auth: true,
            title: 'xu商城-商品详情'
        }
    },
    {
        path: '/goodspage',
        name: 'goodspage',
        component: () => import('../views/shopping/GoodsPage.vue'),
        meta: {
            title: 'xu商城-商品列表详情'
        }
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/order/Order.vue'),
        meta: {
            auth: true,
            title: 'xu商城-用户订单'
        }
    },
    {
        path: '/orderpage',
        name: 'orderpage',
        component: () => import('../views/order/orderPage.vue'),
        meta: {
            auth: true,
            title: 'xu商城-提交订单'
        }
    },
    {
        path: '/orderpageT',
        name: 'orderpageT',
        component: function () {
            return import('../views/order/orderpageT.vue')
        },
        meta: {
            auth: true,
            title: 'xu商城-提交订单'
        }
    },
    {
        path: '/paymentOrder',
        name: 'PaymentOrder',
        component: function () {
            return import('../views/order/PaymentOrder.vue')
        },
        meta: {
            auth: true,
            title: 'xu商城-支付订单'
        }
    },
    {
        path: '/my',
        name: 'my',
        component: function () {
            return import('../views/my/My.vue')
        },
        meta: {
            auth: true,
            title: 'xu商城-用户'
        }
    },
    {
        path: '/editoruser',
        name: 'editoruser',
        component: function () {
            return import('../views/my/EditorUser.vue')
        },
        meta: {
            auth: true,
            title: 'xu商城-用户信息编辑'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: function () {
            return import('../views/Login.vue')
        },
        meta: {
            title: 'xu商城-登录注册'
        },
    },
    {
        path: '/registered',
        name: 'registered',
        component: () => import('../views/Registered.vue'),
    },
    {
        path: '/address',
        name: 'address',
        component: () => import('../views/address/Address.vue'),
        meta: {
            title: '用户编辑'
        },
    },
    {
        path: '/newedit',
        name: 'newedit',
        component: () => import('../views/address/newEdit.vue'),
        meta: {
            title: '地址新建'
        },
    },
    {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/address/Edit.vue'),
        meta: {
            title: '地址编辑'
        },
    },
    {
        path: '/searchpage',
        name: 'searchpage',
        component: () => import('../views/search/Searchpage.vue'),
        meta: {
            title: 'xu商城-搜索'
        },
    },
]

const router = createRouter({
    // history: createWebHashHistory(),//hash
    history: createWebHistory(),//history
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.auth) {
        let isLogin = sessionStorage.getItem('isLogin')
        // console.log(isLogin);
        if (!isLogin) {
            // 没有登录
            router.push("/login?redirect=" + to.fullPath)
        } else {
            // 登录了
            next()
        }
    } else {
        // 正常跳转
        next()
    }
});

export default router
