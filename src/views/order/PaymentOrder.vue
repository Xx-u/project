<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <van-nav-bar title="订单支付" left-arrow @click-left="onClickLeft" />
      </div>
      <div class="center">
        <div class="vanCell">
          <van-icon name="passed" color="#83C44E" size="0.5rem" />
          <div class="orderInfo">
            <div class="fl">
              <h2>订单提交成功！去付款咯～</h2>
              <p>
                <span
                  >请在<span class="payTime"> 0小时14分 </span>内完成支付,
                  超时后将取消订单</span
                >
              </p>
            </div>
          </div>
        </div>

        <div class="orderForm">
          <h2>订单详情</h2>
          <ul>
            <li>
              <p>收货信息：</p>
              <p class="orderNews">
                {{ address.name }} {{ userPhone }} {{ address.area_name }}
                {{ address.desc }}
              </p>
            </li>
            <li>
              <p>商品名称：</p>
              <p
                class="orderNews"
                v-for="(item, index) in orderGoodList"
                :key="index"
              >
                {{ item.goods_name }} x{{ item.num }}
              </p>
            </li>
            <li>
              <p>发票信息：</p>
              <p class="orderNews">电子普通发票(个人)</p>
            </li>
          </ul>
        </div>

        <div class="pay">
          <h2>选择以下支付方式付款</h2>
          <van-divider />
          <h3>支付工具</h3>
          <div class="payTool">
            <div class="zfb">
              <van-button type="default" class="btn" @click="Pay">
                <van-icon name="alipay" color="#0078F2" size="0.5rem" />
              </van-button>
            </div>
            <div class="wx">
              <van-button type="default" class="btn" @click="Pay"
                ><van-icon name="wechat-pay" color="#00B600" size="0.5rem"
              /></van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Dialog, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../Utils/request.js'
let route = useRoute()
let router = useRouter()
let store = useStore()
let address = ref([])
let userPhone = ref('')
let orderGoodList = ref([])
// 正则隐藏手机号码
const geTel = (tel) => {
  let reg = /^(\d{3})\d{4}(\d{4})$/;
  return tel.replace(reg, "$1****$2");
}

// 获取订单单条信息
const getShop = () => {
  get(`/order/${route.query.key}`).then(res => {
    address.value = res.result.s_address
    userPhone.value = geTel(address.value.phone)
    orderGoodList.value = res.result.goods_info
  })
}
getShop()

// 点击支付
const Pay = () => {
  Toast({
    message: '敬请期待!',
    position: 'top',
  });
}

// 返回订单
const onClickLeft = () => {
  Dialog.confirm({
    title: '小xu提示',
    message:
      '是否放弃支付?',
  })
    .then(() => {
      store.commit("changeRouterType", "back")
      router.push('/order')
    }).catch(() => { });
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: calc(100vh - 0.46rem);
  background-color: #f6f6f6;
}
.top {
  width: 100%;
  height: 0.46rem;
}
.center {
  .vanCell {
    margin: 0 auto;
    margin-top: 00.3rem;
    display: flex;
    align-items: center;
    width: 3.43rem;
    padding: 00.12rem;
    .orderInfo {
      padding-left: 00.16rem;
      h2 {
        margin-bottom: 0.12rem;
        font-size: 0.2rem;
        font-weight: 400;
        line-height: 36px;
      }
      p {
        color: #616161;
        .payTime {
          color: #ff6700;
        }
      }
    }
  }

  .orderForm {
    margin-top: 00.3rem;
    margin-left: 00.1rem;
    margin-right: 00.1rem;
    padding: 00.12rem;
    background-color: #fff;
    li {
      //   display: flex;
      padding-top: 0.1rem;
    }
    h2 {
      margin-bottom: 0.12rem;
      font-size: 0.16rem;
      font-weight: 600;
    }
    p {
      color: #616161;
    }
    span {
      color: #616161;
    }
  }

  .pay {
    margin-top: 00.3rem;
    margin-left: 00.1rem;
    margin-right: 00.1rem;
    padding: 00.12rem;
    background-color: #fff;
    h2 {
      margin-bottom: 0.12rem;
      font-size: 0.16rem;
      font-weight: 400;
      color: #616161;
    }
    h3 {
      margin-bottom: 0.12rem;
      font-size: 0.14rem;
      font-weight: 400;
      color: #616161;
    }
    .payTool {
      margin-top: 00.16rem;
      display: flex;
      .btn {
        padding: 0.3rem;
        margin-right: 00.16rem;
      }
    }
  }
}
.orderNews {
  text-indent: 00.16rem;
  padding-top: 0.05rem;
}
</style>