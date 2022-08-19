<template>
  <div class="body">
    <div class="homepage">
      <div class="search">
        <van-search
          @click="goToSearchpage"
          shape="round"
          background="#f6f6f6"
          placeholder="山姆会员商店优惠商品"
        />
      </div>

      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img :src="item.s_photos[0].path" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="sort">
        <Sort
          v-for="(item, index) in sortTitle"
          :key="index"
          :title="item.name"
          @click="goodsSortCheck(index)"
        />
      </div>

      <div class="wrapper">
        <NearBy :goodsData="goodsData" @go="handler" title="热门商品" />
      </div>

      <div class="upgrade" v-show="upgradeShow" @click="goTop">
        <van-icon name="back-top" color="#C1C2C8" size="0.2rem" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home"
}
</script>

<script setup>
import NearBy from './../../components/goodsBy.vue'
import Sort, { useMsgEffact } from './components/Sort.vue'
import { toast } from '../../Utils/index.js'
import { reactive, ref } from 'vue';
import { get } from '../../Utils/request.js';
import { delayPrint } from '../../Utils/index.js'
let { title, showToast } = useMsgEffact()
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant';
const router = useRouter()
const store = useStore()
let bannerList = ref([])
let goodsData = ref([])
let upgradeShow = ref(false)
let userProjectId = reactive({ project_id: 240 })
let dataParams = reactive({ project_id: 240, page: 1, limit: 6 })
let sortTitle = ref([])
// 获取商品分类
get('/classify/classifyGoods', { project_id: 240 }).then(res => {
  sortTitle.value = res.result
})
showToast(title)

// 请求商品
const getDatas = async () => {
  toast()
  let res = await get('/goods', dataParams)
  if (!res.result.rows.length) {
    Toast('没有更多商品了');
  }
  goodsData.value = goodsData.value.concat(res.result.rows)
}
getDatas()

// 请求banner
const bannerGet = async () => {
  let list = await get('/carousel', userProjectId)
  bannerList.value = list.result
}
bannerGet()

// 触底加载
const handler = () => {
  dataParams.page++
  getDatas()
}

// 监听滚动事件
document.addEventListener('scroll', delayPrint(100, function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  upgradeShow.value = scrollTop > 400 ? true : false
}))

const goTop = () => {
  window.scrollTo(0, 0);
}

// 点击进入商品分类
const goodsSortCheck = (index) => {
  toast()
  store.commit("changeRouterType", "push")
  router.push(`/goodspage?key=${index}`)
}

// 进入搜索页面
const goToSearchpage = () => {
  store.commit("changeRouterType", "push")
  router.push('/searchpage')
}

</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .homepage {
    margin-left: 00.16rem;
    margin-right: 00.16rem;
  }
}

// search
.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
}
::v-deep .van-search__content--round {
  background-color: #fff !important;
}
// banner
.banner {
  padding-top: 0.1rem;
  margin-top: 0.5rem;
  width: 100%;
  height: 0.86rem;
  margin-bottom: 00.16rem;
  border-radius: 0.08rem;
  .my-swipe {
    width: 100%;
    height: 0.86rem;
    border-radius: 0.08rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.sort {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  margin: 0 auto;
  padding-top: 0.16rem;
  padding-bottom: 0.12rem;
  border-radius: 00.15rem;
  background-color: #fff;
}

.wrapper {
  width: 100%;
  height: auto;
  padding-bottom: 0.49rem;
  .van-loading {
    margin-top: 00.22rem;
    margin-bottom: 00.12rem;
    display: flex;
    justify-content: center;
  }
}

.upgrade {
  position: fixed;
  right: 00.16rem;
  bottom: 0.8rem;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #c1c2c8;
  padding: 0.07rem;
}
</style>