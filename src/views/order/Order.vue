<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <van-nav-bar title="我的订单" />
      </div>
      <div class="main">
        <div class="label">
          <van-tabs v-model="active" swipeable @click-tab="clickOrder">
            <van-tab v-for="item in title" :key="item.id" :name="item.id">
              <template #title>
                <p>{{ item.span }}</p>
              </template>
              <div class="card" v-for="Oritem in orderList" :key="Oritem.id">
                <div class="shop">
                  <span>{{ Oritem.shops_name }} 的店铺</span>
                </div>
                <div
                  class="goodsOrder"
                  v-for="goodsItem in JSON.parse(Oritem.goods_info)"
                  :key="goodsItem.id"
                >
                  <van-card
                    :num="goodsItem.num"
                    :price="goodsItem.price"
                    :desc="goodsItem.desc"
                    :title="goodsItem.goods_name"
                    :thumb="goodsItem.s_goods_photos[0].path"
                    @click="checkCard(goodsItem.id)"
                  />
                </div>
                <div class="choose">
                  <span>总价: ￥{{ Oritem.total_price }}</span>
                  <div class="button">
                    <van-button round size="small" type="default"
                      >追加评价</van-button
                    >
                    <van-button
                      round
                      size="small"
                      type="default"
                      @click="delOrder(Oritem.id)"
                      >删除订单</van-button
                    >
                    <van-button
                      round
                      size="small"
                      type="default"
                      @click="pustGoods(Oritem.id)"
                      >加入购物车</van-button
                    >
                  </div>
                </div>
              </div>
              <div class="hint" v-show="orderList.length == 0">
                <van-empty
                  image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
                  image-size="130"
                  description="你还没有相关的订单"
                />
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Toast, Dialog } from 'vant';
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toast } from '../../Utils/index.js'
import { get, del, post } from '../../Utils/request.js'
let router = useRouter()
let store = useStore()
let active = ref(0)
let orderList = ref([])
// 声明状态
let title = ref([
  { id: 8, icon: 'orders-o', span: '全部' },
  { id: 1, icon: 'credit-pay', span: '待付款' },
  { id: 2, icon: 'send-gift-o', span: '待发货' },
  { id: 3, icon: 'logistics', span: '待收货' },
  { id: 6, icon: 'certificate', span: '已完成' }
])

// 进入订单页面触发
toast()
orderGet()
async function orderGet (node) {
  let res = await get('/order', { project_id: 240, status: node })
  orderList.value = res.result.rows
}
// 点击切换触发
// -1：已删除，0：已过期，1:已下单，2:已支付，3:已发货, 4:退货中，5:退款中，6:已完成，7：已取消
const clickOrder = (data) => {
  toast()
  active.value = data.name
  if (data.name === 8) {
    orderGet()
  } else {
    orderGet(data.name)
  }
}

// 删除订单
const delOrder = async (id) => {
  Dialog.confirm({
    title: '小xu提示',
    theme: 'round-button',
    message:
      '您是否确认删除订单?',
  })
    .then(() => {
      del(`/order/${id}`).then(res => {
        Toast(res.msg)
        orderGet()
      })
    }).catch(() => { });
}
// 加入购物车
const pustGoods = (id) => {
  toast()
  let arr = orderList.value.find(ele => ele.id === id)
  JSON.parse(arr.goods_info).forEach(ele => {
    let body = {
      goods_id: ele.id,
      num: ele.num,
      project_id: 240
    }
    post('/shoppingCart/', body).then((res) => {
      console.log(res);
    })
  });
}
// 点击跳转商品详情页
const checkCard = (id) => {
  store.commit("changeRouterType", "push")
  router.push(`/shoppage?key=${id}`)
}

</script>


<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: 100%;
  background-color: #f6f6f6;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  z-index: 99;
}
.main {
  margin: 0 auto;
  padding-top: 0.5rem;
  padding-bottom: 00.5rem;
  min-height: calc(100vh - 1rem);
  .label {
    height: 100%;
  }
}
.card {
  margin-top: 00.16rem;
  margin-left: 0.16rem;
  margin-right: 0.16rem;
  border-radius: 0.15rem;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;

  .shop {
    padding-top: 00.15rem;
    span {
      padding-left: 0.16rem;
      font-size: 00.16rem;
      font-weight: 600;
    }
  }
  .goodsOrder {
    .van-card {
      background-color: #fff !important;
    }
  }
  .choose {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.08rem;
    span {
      padding-left: 0.16rem;
      line-height: 0.32rem;
      font-size: 00.12rem;
    }
    button {
      margin-right: 0.02rem;
    }
  }
}
</style>