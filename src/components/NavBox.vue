<template>
  <div v-show="$store.state.show">
    <div class="nav">
      <!-- 底部导航栏 -->
      <van-tabbar
        v-model="$store.state.index"
        active-color="#ee0a24"
        inactive-color="#000"
      >
        <van-tabbar-item @click="goToHome" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item @click="goToShopping" icon="shopping-cart-o"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item @click="goToOrder" icon="notes-o"
          >订单</van-tabbar-item
        >
        <van-tabbar-item @click="goToMy" icon="contact">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { ref } from 'vue'
let router = useRouter();
let store = useStore()

const goToHome = () => {
  store.commit("changeRouterType", "push")
  router.push('/')
}
const goToShopping = () => {
  store.commit("changeRouterType", "push")
  router.push('/shopping')
}
const goToOrder = () => {
  store.commit("changeRouterType", "push")
  router.push('/order')
}
const goToMy = () => {
  store.commit("changeRouterType", "push")
  router.push('/my')
}

</script>
<style lang="scss" scoped>
</style>