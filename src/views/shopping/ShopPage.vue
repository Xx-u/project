<template>
  <div class="body">
    <div class="page">
      <header>
        <div class="left" @click="goToHome">
          <span></span>
        </div>
        <div class="right" @click="showShare = !showShare">
          <span></span>
          <van-share-sheet
            :show="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </div>
      </header>
      <!-- banner -->
      <van-swipe>
        <van-swipe-item v-for="item in goodList.s_goods_photos" :key="item.id">
          <img :src="item.path" alt="" />
        </van-swipe-item>
        <template #indicator="{ active, total }">
          <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
        </template>
      </van-swipe>

      <div class="content">
        <div class="price">
          <span> ￥{{ goodList.price - goodList.sale_price }} </span>
          <p class="textP">￥{{ goodList.price }}</p>
        </div>
        <div class="text">
          <h5 class="shopName">{{ goodList.name }}</h5>
          <p class="shopDesc">{{ goodList.desc }}</p>
        </div>
        <div class="tetxHTML" v-html="text"></div>
      </div>

      <footer>
        <van-action-bar>
          <van-action-bar-icon icon="chat-o" text="客服" @click="goShop" />
          <van-action-bar-icon
            icon="cart-o"
            text="购物车"
            :badge="cartMsg"
            :badge-props="cartMsgObj"
            @click="goToOeder"
          />
          <van-action-bar-icon icon="shop-o" text="店铺" @click="goShop" />
          <van-action-bar-button
            type="danger"
            text="加入购物车"
            @click="addCart"
          />
          <van-action-bar-button
            type="danger"
            text="立即购买"
            @click="addBuy"
          />
        </van-action-bar>
      </footer>

      <van-action-sheet v-model:show="showShow" title="请添加客服wx咨询">
        <div class="actionImg">
          <img src="../../assets/image/wxShop.jpg" alt="" />
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script setup>
import { Toast } from 'vant';
import { ref } from 'vue'
import { get, post } from '../../Utils/request.js'
import { toast } from '../../Utils/index.js'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
let route = useRoute()
let router = useRouter()
let store = useStore()
store.state.index = 1
let goodList = ref([])
let cartMsg = ref(0)
let cartMsgObj = ref({ "show-zero": cartMsg.value === 0 ? false : true })
let text = ref('')
let showShow = ref(false)
getShop()
async function getShop () {
  toast()
  // 购物车商品数量
  let shop = await get('/shoppingCart', { project_id: 240 })
  cartMsg.value = shop.result.length
  //   请求商品
  let res = await get(`/goods/${route.query.key}`)
  goodList.value = res.result
  text.value = goodList.value.rich_text
}
// 客服
const goShop = () => {
  showShow.value = !showShow.value
}
// 加入购物车
let flag = 0
const addCart = async () => {
  flag++
  let token = store.state.user.token
  let body = {
    goods_id: route.query.key,
    num: flag,
    project_id: '240'
  }
  if (token == '') {
    router.push('/login')
  } else {
    await post('/shoppingCart', body)
    let shop = await get('/shoppingCart', { project_id: 240 })
    cartMsg.value = shop.result.length
    Toast.success('加入成功！');
  }
}
// 立即购买
const addBuy = () => {
  toast()
  store.state.shoporder.cradList = goodList.value
  router.push('/orderpageT')
}
// go购物车
const goToOeder = () => {
  toast()
  router.push('/shopping')
}

// 返回
const goToHome = () => {
  store.commit("changeRouterType", "back")
  history.back()
}
// 分享
const showShare = ref(false);
const options = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
];

</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: calc(100vh - 4.4rem);
  background-color: #f6f6f6;
}
header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  z-index: 8;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .left {
    background-color: #666;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin: 7px 0 0 5px;
    span {
      background: url("../../assets/image/返回.png") no-repeat;
      background-size: 20px 20px;
      margin: 0;
      z-index: 9;
    }
  }
  .right {
    background-color: #666;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin: 7px 5px 0 0;
    span {
      background: url("../../assets/image/更多.png") no-repeat;
      background-size: 20px 20px;
      margin: 0;
      z-index: 9;
    }
  }
}
.van-swipe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.9rem;
  z-index: 1;
  img {
    width: 100%;
    height: 3.9rem;
    object-fit: cover;
  }
}
.custom-indicator {
  position: absolute;
  bottom: 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px 0 0 10px;
  color: #fff;
  height: 20px;
  line-height: 20px;
  padding: 0 10px;
  right: 0;
  z-index: 20;
}
.content {
  margin-top: 4rem;
  padding-left: 00.16rem;
  padding-right: 00.16rem;
  background-color: #fff;
  .price {
    display: flex;
    span {
      font-size: 30px;
      color: #e93b3b;
      font-weight: 600;
    }
    .textP {
      padding-left: 00.1rem;
      //   padding-top: 0.01rem;
      line-height: 30px;
      font-size: 14px;
      color: #999999;
      text-decoration: line-through;
    }
  }
  .text {
    h5 {
      font-size: 00.16rem;
      margin-top: 00.1rem;
      color: #333333;
    }
    .shopDesc {
      color: #333333;
      line-height: 1.5;
      margin-top: 00.05rem;
      margin-right: 00.1rem;
      margin-bottom: 00.1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .tetxHTML {
    padding-bottom: 00.5rem;
  }
}
.actionImg {
  display: flex;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
  }
}
</style>