<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <div class="left" @click="onCancel">
          <van-icon name="arrow-left" />
        </div>
        <div class="input">
          <form action="/">
            <van-search
              v-model="searchVal"
              shape="round"
              placeholder="请输入搜索关键词"
              @search="onSearch"
              :clearable="true"
            />
          </form>
        </div>
        <div class="right" @click="search">
          <span>搜索</span>
        </div>
      </div>

      <div class="oldSearch search" v-show="show">
        <div class="title">
          <h2>历史搜索</h2>
          <van-icon @click="deloldlist" name="delete-o" />
        </div>
        <van-button
          v-for="(item, index) in oldlist"
          :key="index"
          type="default"
          size="small"
          @click="checkoldlist(item)"
          >{{ item }}</van-button
        >
      </div>
      <div class="listSearch search" v-show="show">
        <h2>热门搜索</h2>
        <van-button
          v-for="(item, index) in shopList"
          :key="index"
          type="default"
          size="small"
          @click="checklist(item.id, item.name)"
          >{{ item.name }}</van-button
        >
      </div>

      <div class="empty" v-show="emptyShow">
        <van-empty image="search" description="暂无搜索商品" />
        <h3>推荐商品</h3>
      </div>

      <div class="goodslist" v-show="flag">
        <div v-for="item in goodslist" :key="item.id">
          <van-card
            :price="item.price"
            :desc="item.desc"
            :title="item.name"
            :thumb="item.s_goods_photos[0].path"
            @click="checkgoods(item.id)"
          >
            <template #tags>
              <van-tag plain type="danger">新品</van-tag>
              <van-tag plain type="danger">特价</van-tag>
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from '../../Utils/request.js'
import { toast } from '../../Utils/index.js'
import { getSession } from '../../Utils/index.js'
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter();
let searchVal = ref('')
let oldlist = ref(getSession('oldSearch'))
let show = ref(true)
let flag = ref(false)
let shopList = ref([])
let goodslist = ref([])
let emptyShow = ref(false)
// 获取商品分类
get('/classify/classifyGoods', { project_id: 240 }).then(res => {
  shopList.value = res.result
})
const goodsGet = (val) => {
  searchVal.value = val
  get('/goodsSearch', { project_id: 240, name: val }).then(res => {
    console.log(res);
    if (!res.result.rows.length) {
      emptyShow.value = true
      get('/goods', { project_id: 240, page: 3, limit: 10 }).then(res => {
        goodslist.value = res.result.rows
      })
    } else {
      emptyShow.value = false
    }
    goodslist.value = res.result.rows
  })
}

// 确定搜索
const onSearch = (val) => {
  toast()
  show.value = false
  flag.value = true
  if (val) {
    store.dispatch('search/changoldlist', val)
  }
  goodsGet(val)
}
// 点击搜索
const search = () => {
  toast()
  show.value = false
  flag.value = true
  if (searchVal.value) {
    store.dispatch('search/changoldlist', searchVal.value)
  }
  goodsGet(searchVal.value)
}
// 点击历史搜索
const checkoldlist = (data) => {
  toast()
  show.value = false
  flag.value = true
  goodsGet(data)
}
// 删除历史
const deloldlist = () => {
  toast()
  store.dispatch('search/delList')
  oldlist.value = getSession('oldSearch')
}

// 点击列表搜索
const checklist = (id, val) => {
  searchVal.value = val
  toast()
  show.value = false
  flag.value = true
  if (val) {
    store.dispatch('search/changoldlist', val)
  }
  get('/goods', { project_id: 240, page: 1, limit: 10, classify_id: id }).then(res => {
    if (!res.result.rows.length) {
      emptyShow.value = !emptyShow.value
      get('/goods', { project_id: 240, page: 3, limit: 10 }).then(res => {
        goodslist.value = res.result.rows
      })
    }
    goodslist.value = res.result.rows
  })
  //   goodsGet(val)
}

// 取消
const onCancel = () => {
  toast()
  store.commit("changeRouterType", "back")
  history.back()
}
// 点击进入商品详情
const checkgoods = (id) => {
  store.commit("changeRouterType", "push")
  router.push(`shoppage?key=${id}`)
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .page {
    margin-top: 0.53rem;
    padding-left: 0.16rem;
    padding-right: 0.16rem;
    min-height: calc(100vh - 0.54rem);
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      background-color: #fff;

      .left {
        margin-left: 000.12rem;
      }
      .input {
        width: 90%;
      }
      .right {
        margin-right: 00.16rem;
        width: 0.4rem;
        height: 0.3rem;
        color: #fff;
        background-color: #e93b3d;
        border-radius: 00.05rem;
        text-align: center;
        line-height: 00.3rem;
      }
    }
    .search {
      margin-top: 00.54rem;
      padding-top: 00.26rem;
      padding-left: 00.16rem;
      padding-right: 00.16rem;
      .title {
        display: flex;
        justify-content: space-between;
      }
      h2 {
        font-size: 00.16rem;
        color: #333;
      }
      button {
        margin-top: 00.15rem;
        margin-left: 00.15rem;
      }
    }
    .empty {
      h3 {
        padding-left: 00.16rem;
        font-size: 0.18rem;
        color: #333;
      }
    }
    .goodslist {
      padding-bottom: 00.5rem;
    }
  }
}
.van-icon {
  font-size: 00.2rem;
}
</style>