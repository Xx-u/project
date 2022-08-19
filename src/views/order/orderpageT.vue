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
            {{ site.address }}
            <van-badge class="badge" :content="title" />
          </p>
          <p>
            {{ site.name }} <span>{{ site.tel }}</span>
          </p>
        </div>
        <van-icon class="edit-icon" name="edit" @click="onEdit" />
      </div>

      <div class="actionsheet">
        <van-action-sheet v-model:show="show" title="选择收货地址">
          <div class="content">
            <van-address-list
              v-model="value"
              :list="list"
              default-tag-text="默认"
              @select="optSelect"
              switchable
              @add="onAdd"
              @edit="goToEdit"
            />
          </div>
        </van-action-sheet>
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
let list = ref([])
let site = ref([])
let title = ref(null)
let show = ref(false)
let value = ref('')
let shopList = ref(store.state.shoporder.cradList)


// get请求
getEdit()
async function getEdit () {
  list.value = []
  let res = await get('/address')
  res.result.forEach(ele => {
    let obj = {
      id: ele.id,
      name: ele.name,
      tel: ele.phone,
      address: ele.area_name + '  ' + ele.desc,
      isDefault: ele.default_set === '1' ? true : false,
    }
    list.value.push(obj)
  });
  site.value = list.value.find(ele => ele.isDefault)
  value.value = site.value.id
  title.value = '默认'
}
// 切换选中地址
const optSelect = (val) => {
  site.value = val
  show.value = false
  if (site.value.isDefault) {
    title.value = '默认'
  } else {
    title.value = ''
  }
}


// 编辑地址
const onEdit = () => {
  show.value = true
}
// 新建
const onAdd = () => {
  toast()
  store.commit("changeRouterType", "push")
  router.push('/newedit')
};
// 编辑
const goToEdit = (item) => {
  toast()
  store.commit("changeRouterType", "push")
  router.push(`/edit?key=${item.id}`)
};


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
  let shopId = [shop.id]
  let goodsInfo = [{ id: shop.id, num: 1 }]
  let body = {
    addr_id: address.id,
    goods_info: goodsInfo,
    project_id: 240,
    shoppingCartIds: shopId
  }
  post('/order', body).then(res => {
    let id = res.data.result.id
    store.commit("changeRouterType", "push")
    router.push(`/paymentOrder?key=${id}`)
  })
}

</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: 100%;
  background-color: #f6f6f6;
}
.orderpage {
  padding: 0.16rem;
  margin-bottom: 000.5rem;
  margin-top: 0.46rem;
  min-height: calc(100vh - 1.3rem);
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

.actionsheet {
  .content {
    padding: 16px 16px 160px;
    .van-address-list {
      padding: 0 !important;
    }
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
</style>