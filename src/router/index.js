import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// 主页
import Home from '../views/home/Index.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/shopping',
        name: 'shopping',
        component: () => import('../views/shopping/Shopping.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/shoppage',
        name: 'shoppage',
        component: () => import('../views/shopping/ShopPage.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/goodspage',
        name: 'goodspage',
        component: () => import('../views/shopping/GoodsPage.vue'),
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/order/Order.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/orderpage',
        name: 'orderpage',
        component: () => import('../views/order/orderPage.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/orderpageT',
        name: 'orderpageT',
        component: function () {
            return import('../views/order/orderpageT.vue')
        },
        meta: {
            auth: true
        }
    },
    {
        path: '/my',
        name: 'my',
        component: function () {
            return import('../views/my/My.vue')
        },
        meta: {
            auth: true
        }
    },
    {
        path: '/editoruser',
        name: 'editoruser',
        component: function () {
            return import('../views/my/EditorUser.vue')
        },
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: function () {
            return import('../views/Login.vue')
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
    },
    {
        path: '/newedit',
        name: 'newedit',
        component: () => import('../views/address/newEdit.vue'),
    },
    {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/address/Edit.vue'),
    },
    {
        path: '/searchpage',
        name: 'searchpage',
        component: () => import('../views/search/Searchpage.vue'),
    },
    {
        path: '/createorder',
        name: 'createorder',
        component: () => import('../views/createorder/Createorder.vue'),
    }
]

const router = createRouter({
    // history: createWebHashHistory(),//hash
    history: createWebHistory(),//history
    routes
})

router.beforeEach((to, from, next) => {
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
