<template>
  <div class="shop" ref="shopTarget">
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <div
      class="demo"
      style="margin: 0 auto"
      v-masonry
      gutter="15"
      percent-position="true"
      fit-width="true"
      ref="waterfallTarget"
    >
      <div
        v-masonry-tile
        class="card"
        v-for="(item, index) in goodsData"
        :key="item.id"
      >
        <div @click="goToShoppage(item.id)">
          <img :src="item.s_goods_photos[0].path" alt="" />
          <div class="goodsMsg">
            <div class="goodsName">
              <p>
                <span v-show="index % 3 == 1">
                  <van-tag type="primary" color="red">xx超市</van-tag>
                </span>
                {{ item.name }}
              </p>
            </div>
            <div class="goodsDesc">{{ item.desc }}</div>

            <span class="tagIcon" v-show="index % 3 == 2">
              <van-tag type="primary" color="#FFEFF5" text-color="#FF4E91">
                <van-icon name="fire" color="#FF4E91" size="0.2rem" />
                30天最低价
              </van-tag>
            </span>

            <div class="price">
              <p>
                <strong>￥</strong> {{ item.price - item.sale_price }}
                <span v-show="index % 3 == 2">
                  <van-tag color="red" plain type="primary">秒杀</van-tag>
                </span>
                <span>
                  <van-icon color="red" name="free-postage" size="0.2rem" />
                </span>
              </p>

              <div class="root">
                <van-tag class="tag" type="primary" color="red">自营</van-tag>
                <span v-show="index % 3 == 1">1万+条评论</span>
                <span class="num">库存:{{ item.stock_num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onUpdated, nextTick } from "vue";
import { delayPrint } from '../Utils/index.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
let store = useStore()
let router = useRouter()
let shopTarget = ref(null)
let waterfallTarget = ref(null)
defineProps({
  goodsData: Array,
  title: String
})
// 触底加载
onUpdated(() => {
  setTimeout(() => {
    nextTick(() => {
      shopTarget.value.style.height = Number(waterfallTarget.value.style.height.slice(0, -2)) + 50 + 'px'
    })
  }, 300)
})
// 注册事件
const emits = defineEmits(['go'])
document.addEventListener('scroll', delayPrint(800, function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollHeight - scrollTop - 2 <= clientHeight) {
    emits('go')
  }
}))
// 点击进入商品详情页
const goToShoppage = (id) => {
  store.commit("changeRouterType", "push")
  router.push(`/shoppage?key=${id}`)
}
</script>

<style lang="scss" scoped>
.shop {
  width: 100%;
  height: 2rem;
  .title {
    margin-top: 0.16rem;
    display: inline-block;
  }
  .demo {
    width: 3.39rem;
  }
}

.shop {
  .title {
    margin: 0.14rem 0 0.14rem 0.18rem;
    h2 {
      font-size: 0.18rem;
      color: #333;
    }
  }
  .card {
    width: 41vw;
    background-color: #fff;
    margin: 0.04rem;
    border-radius: 0.1rem;
    box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;
    img {
      width: 100%;
      display: block;
      height: auto;
      border-top-right-radius: 00.1rem;
      border-top-left-radius: 00.1rem;
    }
    .goodsMsg {
      .goodsName {
        margin: 0.05rem 0;
        p {
          padding-left: 00.05rem;
          font-size: 0.16rem;
          color: #333;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .goodsDesc {
        padding-left: 00.05rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 0.04rem;
        color: #666;
      }
      .tagIcon {
        margin-left: 00.05rem;
      }
      .price {
        padding-bottom: 00.1rem;
        p {
          font-size: 0.2rem;
          color: #ff4142;
          margin: 0.03rem 0;
          span {
            margin-left: 0;
          }
          strong {
            font-size: 0.14rem;
            margin-left: 0.04rem;
          }
        }
        span {
          font-size: 0.06rem;
          color: #999;
          margin-left: 0.05rem;
          display: inline-block;
        }
        .tag {
          color: #fff;
        }
        .root {
          position: relative;
          .num {
            position: absolute;
            right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>