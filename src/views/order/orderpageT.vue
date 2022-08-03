<template>
  <div class="body">
    <div class="orderpage">
      <div class="top">
        <van-nav-bar
          title="确认订单"
          left-text=""
          left-arrow
          @click-left="onClickLeft"
        />
      </div>

      <div class="address">
        <div class="edit">
          <h3>收货地址</h3>

          <p>
            {{ site.area_name + site.desc }}
            <van-badge class="badge" :content="title" />
          </p>
          <p>
            {{ site.name }} <span>{{ site.phone }}</span>
          </p>
        </div>
        <van-icon class="edit-icon" name="edit" @click="onEdit" />
      </div>

      <div class="order">
        <div class="goods">
          <van-swipe-cell>
            <van-card
              :num="1"
              :price="shopList.price"
              :desc="shopList.desc"
              :title="shopList.name"
              class="goods-card"
              :thumb="shopList.s_goods_photos[0].path"
            />
          </van-swipe-cell>
        </div>
        <div class="count">
          <van-swipe-cell>
            <van-cell
              :border="false"
              title="配送服务"
              value="快递 包邮"
              is-link
            />
            <van-cell :border="false" title="运费险" value="未选择" is-link />
            <van-cell :border="false" title="订单备注" value="无备注" is-link />
          </van-swipe-cell>
        </div>
      </div>

      <div class="money">
        <div class="goodsMoney">
          <van-cell value="价格明细" />
          <van-cell title="商品总数" value="1" />
        </div>
        <div class="center">
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />
          <van-popup
            :show="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px"
          >
            <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChange"
              @exchange="onExchange"
            />
          </van-popup>
        </div>
        <div class="all">
          <van-cell title="合计" :value="'￥' + shopList.price" />
        </div>
      </div>

      <div class="pay">
        <van-cell value="支付" />
        <van-radio-group v-model="checked">
          <van-cell title="支付宝" icon="after-sale">
            <div class="check">
              <van-radio name="1" checked-color="#FE6201"></van-radio>
            </div>
          </van-cell>
          <van-cell title="微信" icon="after-sale">
            <div class="check">
              <van-radio name="2" checked-color="#FE6201"></van-radio>
            </div>
          </van-cell>
          <van-cell title="银行卡" icon="after-sale">
            <div class="check">
              <van-radio name="3" checked-color="#FE6201"></van-radio>
            </div>
          </van-cell>
        </van-radio-group>
      </div>

      <div class="submit">
        <van-submit-bar
          :price="shopList.price * 100"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Dialog } from 'vant';
import { toast } from '../../Utils/index.js'
import { get, post } from '../../Utils/request.js'
import { ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
let router = useRouter()
let store = useStore()
let checked = ref(true)
let site = ref([])
let title = ref(null)
let shopList = ref(store.state.shoporder.cradList)

// 请求默认地址
toast()
addressGet()
async function addressGet () {
  let res = await get('/defalutAddress')
  console.log(res.result);
  site.value = res.result
  if (res.result.default_set == 1) {
    title.value = '默认'
  }
}
// 编辑地址
const onEdit = () => {
  toast()
  store.commit("changeRouterType", "push")
  router.push('/address')
}

// 优惠券
const coupon = {
  available: 1,
  condition: '无门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};

const coupons = ref([coupon]);
const showList = ref(false);
const chosenCoupon = ref(-1);

const onChange = (index) => {
  showList.value = false;
  chosenCoupon.value = index;
};
const onExchange = (code) => {
  coupons.value.push(coupon);
};


// 返回
const onClickLeft = () => {
  Dialog.confirm({
    title: '小xu提示',
    theme: 'round-button',
    message:
      '您是否确认取消订单?',
  })
    .then(() => {
      store.commit("changeRouterType", "back")
      router.push(`/shoppage?key=${shopList.value.id}`)
    }).catch(() => { });
}
// 提交订单
const onSubmit = async () => {
  toast()
  let shop = store.state.shoporder.cradList
  let address = site.value
  console.log(shop);
  console.log(address.id);
  let shopId = [shop.id]
  let goodsInfo = [{ id: shop.id, num: 1 }]
  let body = {
    addr_id: address.id,
    goods_info: goodsInfo,
    project_id: 240,
    shoppingCartIds: shopId
  }
  let res = await post('/order', body)
  console.log(res);
}

</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: 100%;
  background-color: #f6f6f6;
}
.orderpage {
  padding-top: 00.16rem;
  padding-left: 00.16rem;
  padding-right: 00.16rem;
  padding-bottom: 000.7rem;
  margin-top: 0.46rem;
}
.top {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.van-cell {
  margin-top: 00.08rem;
  border-radius: 00.15rem;
  background-color: #fff;
}
.address {
  position: relative;
  width: 100%;
  border-radius: 00.15rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.16rem;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;
  .edit {
    h3 {
      font-size: 0.16rem;
      color: #333;
      margin-bottom: 0.14rem;
    }
    p {
      font-size: 0.14rem;
      color: #333;
      &:last-child {
        font-size: 0.12rem;
        color: #666;
        margin-top: 0.06rem;
      }
    }
  }
  .badge {
    .van-badge {
      width: 0.5rem;
    }
  }
  .edit-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 0.25rem;
  }
}
.order {
  width: 100%;
  margin-top: 00.2rem;
  border-radius: 00.15rem;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;

  .goods {
    padding-top: 00.15rem;
    .goods-card {
      margin: 0;
      border-radius: 00.2rem;
      background-color: #fff !important;
    }

    .delete-button {
      height: 100%;
    }
    .add {
      position: absolute;
      right: 0.13rem;
      bottom: 0.07rem;
    }
  }
}
.money {
  width: 100%;
  margin-top: 00.2rem;
  border-radius: 00.15rem;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;
}

.pay {
  width: 100%;
  margin-top: 00.2rem;
  border-radius: 00.15rem;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;
  .van-cell {
    position: relative;
    .check {
      position: absolute;
      right: 0;
    }
  }
}
</style>