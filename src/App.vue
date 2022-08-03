<template>
  <!-- <router-view /> -->
  <!-- routerType 在每个页面都要使用，放在vuex中 -->
  <!-- vuex 可以直接在结构上 $store 直接访问vuex数据 -->
  <div class="main">
    <sliderRouterView
      :routerType="$store.getters.routerType"
      mainComponentName="'home'"
    ></sliderRouterView>
    <Nav />
  </div>
</template>

<script setup>
import Nav from './components/NavBox.vue'
import sliderRouterView from './components/slider-router-view.vue'
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
