<template>
  <div class="body">
    <div class="mypage">
      <div class="banner"></div>
      <div class="center">
        <!-- 资料 -->
        <div class="personal">
          <div class="photo">
            <img :src="headImg" alt="" />
          </div>
          <div class="data">
            <van-icon name="friends-o" size="0.25rem" @click="goToEditorMy" />
          </div>
          <div class="nickname">
            {{ userName }}
            <div class="level"></div>
          </div>
          <div class="id">ID: {{ userID }}</div>
          <div class="span"></div>
          <div class="box">
            <div class="contentBox">
              <span>红包</span>
              <p>218</p>
            </div>
            <div class="contentBox">
              <span>优惠券</span>
              <p>12张</p>
            </div>
            <div class="contentBox">
              <span>鲜豆</span>
              <p>88</p>
            </div>
            <div class="contentBox">
              <span>白条</span>
              <p>1000</p>
            </div>
          </div>
        </div>
        <!-- 服务 -->
        <div class="options">
          <!-- 1 -->
          <div class="service" @click="goMoney">
            <div class="logo">
              <van-icon name="gold-coin-o" size="0.25rem" />
              <span>我的钱包</span>
            </div>
            <div class="img">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
              </svg>
            </div>
          </div>
          <!-- 2 -->
          <div class="service" @click="goToAddress">
            <div class="logo">
              <van-icon name="location-o" size="0.25rem" />
              <span>我的地址</span>
            </div>
            <div class="img">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
              </svg>
            </div>
          </div>
          <!-- 3 -->
          <div class="service" @click="goShop">
            <div class="logo">
              <van-icon name="manager-o" size="0.25rem" />
              <span>客服与帮助</span>
            </div>
            <div class="img">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <NearBy :goodsData="goodsData" @go="handler" title="猜你喜欢" />
    </div>

    <van-action-sheet v-model:show="showShow" title="请添加客服wx咨询">
      <div class="actionImg">
        <img src="../../assets/image/wxShop.jpg" alt="" />
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import NearBy from '../../components/goodsBy.vue'
import { get } from '../../Utils/request.js';
import { toast } from '../../Utils/index.js'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { reactive, ref } from 'vue';
import { Toast } from 'vant';
let router = useRouter();
let store = useStore()
let showShow = ref(false)
let headImg = ref(store.state.user.header_img)
let userName = ref(store.state.user.userName)
let userID = ref(store.state.user.userID)
let goodsData = ref([])
let dataParams = reactive({ project_id: 240, page: 4, limit: 6 })

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
// 触底加载
const handler = () => {
  dataParams.page++
  getDatas()
}

const goMoney = () => {
  Toast({
    message: '未开通',
    position: 'top',
  });
}

// 客服
const goShop = () => {
  showShow.value = !showShow.value
}

// 编辑地址
const goToAddress = () => {
  store.commit("changeRouterType", "push")
  router.push('/address')
}

// 编辑user信息
const goToEditorMy = () => {
  store.commit("changeRouterType", "push")
  router.push('/editoruser')
}

</script>
<style lang="scss" scoped>
.body {
  background-color: #f6f6f6;
  .homepage {
    padding-top: 0.16rem;
    margin-top: 000.46rem;
    margin-left: 00.16rem;
    margin-right: 00.16rem;
  }
}
.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5rem;
  overflow: hidden;
  background-color: #f5eef5;
}

.center {
  margin: 0 auto;
  margin-top: 1.08rem;
  margin-left: 00.2rem;
  margin-right: 00.2rem;
  z-index: 3;
  .personal {
    position: relative;
    height: 2.03rem;
    background: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    margin-bottom: 00.16rem;
    .data {
      position: absolute;
      top: -0.51rem;
      right: 0;
      width: 0.24rem;
      height: 0.192rem;
    }
    .photo {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -0.47rem;
      left: 50%;
      transform: translate(-50%, 0);
      width: 0.94rem;
      height: 0.94rem;
      border-radius: 50%;
      background: url("@/assets/image/编组@3x.png") no-repeat center;
      background-size: 100% 100%;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }

    .nickname {
      padding-top: 0.59rem;
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      color: #262628;
      letter-spacing: 0.019rem;
      text-align: center;
      line-height: 0.36rem;
      .level {
        position: absolute;
        right: 0.37rem;
        top: 00.7rem;
        width: 0.35rem;
        height: 0.15rem;
        background: url("../../assets/image/level.jpg") no-repeat center;
      }
    }
    .id {
      margin-top: 0.02rem;
      margin-bottom: 0.12rem;
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
    .span {
      height: 0.01rem;
      background-color: #f1f1f1;
    }
    .box {
      margin-top: 00.15rem;
      display: flex;
      justify-content: space-around;
      .contentBox {
        text-align: center;
        span {
          font-size: 0.12rem;
          color: #c1c0c9;
          //   padding-bottom: 0.03rem;
        }
        p {
          margin-top: 00.05rem;
          font-size: 0.2rem;
          color: #262628;
        }
      }
    }
  }
  .options {
    background: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding-bottom: 00.2rem;
    .service {
      display: flex;
      justify-content: space-between;
      padding-left: 00.16rem;
      padding-right: 00.16rem;
      padding-top: 00.2rem;
      .logo {
        display: flex;
        align-self: center;
        span {
          padding-left: 0.12rem;
          text-align: center;
          line-height: 00.22rem;
          font-size: 0.14rem;
          color: #262626;
        }
      }
      .img {
        .icon {
          width: 0.1rem;
          height: 0.22rem;
        }
      }
    }
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
.wrapper {
  margin-top: 00.3rem;
  margin-bottom: 00.5rem;
}
</style>