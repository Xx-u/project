<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <van-nav-bar
          title="新建收货地址"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <div class="main">
        <div class="box">
          <van-address-edit
            :area-list="areaList"
            area-placeholder="选择省 / 市 / 区"
            show-postal
            :is-saving="false"
            :is-deleting="false"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { post } from '../../Utils/request.js'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { useRouter } from 'vue-router'
let router = useRouter()
let store = useStore()
// 返回
const onClickLeft = () => {
  store.commit("changeRouterType", "back")
  router.push('/address')
  //   history.back()
}


// 保存 获取表单内容
const onSave = async (data) => {
  //   console.log(data);
  let body = {
    name: data.name,
    phone: data.tel,
    area_name: data.city,
    desc: data.addressDetail,
    area: data.areaCode,
    post_code: data.postalCode,
    status: '1'
  }
  let res = await post('/address', body)
  //   console.log(res);
  if (res.status == 200) {
    Toast({
      message: '新建成功',
      position: 'top',
    })
    router.push('/address')
  }
};

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
}
.main {
  min-height: calc(100vh - 0.5rem);
  padding-top: 00.5rem;
  .box {
    ul {
      width: 3.39rem;
      margin: 0 auto;
      font-size: 0.14rem;
      color: #666666;
      input {
        border: none;
        outline: none;
      }
      li {
        display: flex;
        align-items: center;
        height: 0.44rem;
        border-bottom: 1px solid #f1f1f1;
      }
    }
  }
}
</style>