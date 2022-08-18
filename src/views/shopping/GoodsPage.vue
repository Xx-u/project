<template>
  <div class="body">
    <div class="top">
      <van-nav-bar
        title="商品列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="page">
      <div class="wrapper">
        <van-sidebar v-model="active" @change="onChange">
          <van-sidebar-item
            v-for="item in titleList"
            :key="item.id"
            :title="item.name"
          />
        </van-sidebar>
        <div class="left">
          <van-card
            v-for="(item, index) in goodsList"
            :key="item.id"
            :tag="index % 2 == 1 ? '新品' : ''"
            :price="item.price - item.sale_price"
            :desc="item.desc"
            :title="item.name"
            :thumb="item.s_goods_photos[0].path"
            :origin-price="item.sale_price"
            @click="cardCheck(item.id)"
          />
          <div class="banner" v-show="show">
            <van-empty
              image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
              image-size="80"
              description="暂无商品信息"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
import { get } from '../../Utils/request.js'
import { toast } from '../../Utils/index.js'
let store = useStore()
let route = useRoute()
let router = useRouter()
let active = ref(route.query.key);
let titleList = ref([])
let goodsList = ref([])
let show = ref(false)
// 获取商品分类
toast()
get('/classify/classifyGoods', { project_id: 240 }).then(res => {
  titleList.value = res.result
  goodsGet(route.query.key)

})

// 请求分类数据
const goodsGet = (key) => {
  get('/goods', { project_id: 240, page: 1, limit: 10, classify_id: titleList.value[key].id }).then(res => {
    show.value = !res.result.count
    goodsList.value = res.result.rows
  })
}
// 切换列表
const onChange = (val) => {
  toast()
  goodsGet(val)
}
// 进入商品详情
const cardCheck = (id) => {
  store.commit("changeRouterType", "push")
  router.push(`shoppage?key=${id}`)
}

// 返回
const onClickLeft = () => {
  toast()
  store.commit("changeRouterType", "back")
  history.back()
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .top {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .page {
    padding-top: 0.46rem;
    margin-left: 00.16rem;
    min-height: calc(100vh - 0.46rem);
    .wrapper {
      padding-bottom: 0.5rem;
      .van-sidebar {
        position: fixed;
        top: 0.46rem;
        left: 0.1rem;
      }
      .left {
        margin-left: 0.7rem;
      }
    }
  }
}
.van-card {
  background-color: #fff;
  margin-top: 0;
}
</style>