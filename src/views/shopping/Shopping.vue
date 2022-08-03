<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <van-nav-bar
          :title="lenght"
          left-arrow
          @click-left="onClickLeft"
          right-text="删除"
          @click-right="onClickRight"
        />
      </div>
      <div class="main">
        <div class="card" v-for="item in goodsList" :key="item.id">
          <van-swipe-cell>
            <van-card
              :price="item.s_good.price"
              :desc="item.s_good.desc"
              :title="item.s_good.name"
              :thumb="item.s_good.s_goods_photos[0].path"
              @click-thumb="checkCard(item.s_good.id)"
            >
              <template #tags>
                <van-tag plain type="danger">新款</van-tag>
                <van-tag plain type="danger">上新</van-tag>
              </template>
              <template #footer>
                <van-stepper
                  v-model="item.num"
                  @change="checkNum(item.id, item.num)"
                />
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="delClick(item.id)"
              />
            </template>
          </van-swipe-cell>

          <div class="checked">
            <van-checkbox
              v-model="item.checked"
              checked-color="#FE6201"
            ></van-checkbox>
          </div>
        </div>
        <div class="submit">
          <van-submit-bar
            :price="sumPrice"
            button-text="结算"
            @submit="goToOrderpage"
          >
            <van-checkbox v-model="checkAll" checked-color="#FE6201"
              >全选</van-checkbox
            >
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Toast, Dialog } from 'vant';
import { toast } from '../../Utils/index.js'
import { get, del, put } from '../../Utils/request.js'
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
let router = useRouter()
let store = useStore()
let goodsParams = reactive({ project_id: 240 })
let goodsList = ref([])
let lenght = ref('')

toast()
card()
// 请求goods
async function card () {
  let res = await get('/shoppingCart', goodsParams)
  res.result.forEach(ele => {
    ele.checked = true
  })
  goodsList.value = res.result
  lenght.value = '我的购物车(' + goodsList.value.length + ')'
}
// 更新num
const checkNum = (id, num) => {
  put(`/shoppingCart/${id}`, { "num": num }).then(res => {
    console.log(res);
  })
}
// 全选
const checkAll = computed({
  get () {
    let flag = false
    if (goodsList.value.length) {
      flag = goodsList.value.every(ele => ele.checked)
    }
    return flag
  },
  set (val) {
    toast()
    goodsList.value.forEach(ele => {
      ele.checked = val
    })
  }
})
// 总额
const sumPrice = computed(() => {
  toast()
  let money = 0
  goodsList.value.forEach(ele => {
    if (ele.checked) {
      money += ele.s_good.price * ele.num * 100
    }
  })
  return money
})

// 点击进入商品详情
const checkCard = (id) => {
  store.commit("changeRouterType", "push")
  router.push(`/shoppage?key=${id}`)
}

// 返回
const onClickLeft = () => {
  toast()
  store.commit("changeRouterType", "back")
  history.back()
}
// 删除选中
const onClickRight = async () => {
  let a = goodsList.value.filter(ele => ele.checked).length
  if (!a) {
    Toast('请选择商品');
  } else {
    Dialog.confirm({
      title: '小xu提示',
      theme: 'round-button',
      message:
        '是否删除?',
    })
      .then(() => {
        goodsList.value.map(async ele => {
          if (ele.checked) {
            let res = await del(`/shoppingCart/${ele.id}`)
            toast('删除成功!')
            card()
          }
        })
      }).catch(() => { });
  }
}
// 单个删除
const delClick = (id) => {
  Dialog.confirm({
    title: '小xu提示',
    theme: 'round-button',
    message:
      '是否删除?',
  })
    .then(() => {
      del(`/shoppingCart/${id}`)
      toast('删除成功!')
      card()
    }).catch(() => { });
}
// 结算
const goToOrderpage = () => {
  let idList = []
  let arr = goodsList.value.filter(ele => ele.checked)
  store.state.shoporder.cradList = arr
  arr.forEach(ele => {
    idList.push(ele.id)
  })
  if (arr.length) {
    toast()
    router.push('/orderpage')
  } else {
    Toast('请选择商品');
  }
}


</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  min-height: calc(100vh - 1rem);
  background-color: #f6f6f6;
  .page {
    padding-top: 0.16rem;
    margin-top: 000.46rem;
    margin-left: 00.16rem;
    margin-right: 00.16rem;
  }
}
.main {
  padding-bottom: 1rem;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}

.card {
  position: relative;
  margin-bottom: 00.2rem;
  border-radius: 0.15rem;
  box-shadow: rgb(0 0 0 / 25%) 0rem 0.05rem 0.15rem;
  .van-card {
    border-radius: 00.15rem;
    // margin-left: 00.1rem;
    background-color: #fff;
  }
  .delete-button {
    height: 100%;
  }
  .checked {
    position: absolute;
    left: -2%;
    top: 3%;
    transform: translate(0, -50%);
  }
}
.submit {
  .van-submit-bar {
    bottom: 00.5rem !important;
  }
}
</style>