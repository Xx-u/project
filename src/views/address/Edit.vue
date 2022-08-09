<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <van-nav-bar
          title="编辑收货地址"
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
            show-set-default
            show-delete
            :address-info="list"
            :is-saving="false"
            :is-deleting="false"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="delAddress(route.query.key)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
let store = useStore()
import { Toast, Dialog } from 'vant';
import { toast } from '../../Utils/index.js'
import { get, post, put, del } from '../../Utils/request.js'
import { areaList } from '@vant/area-data';
import { useRoute, useRouter } from 'vue-router'
let route = useRoute()
let router = useRouter()
let value = ref(0)
let id = ref(route.query.key)
let list = ref({})

getID()
async function getID () {
  toast()
  let res = await get('/address')
  let obj = res.result.find(ele => ele.id == id.value);
  list.value = {
    name: obj.name,
    tel: obj.phone,
    province: obj.area_name,
    addressDetail: obj.desc,
    areaCode: obj.area,
    postalCode: obj.post_code,
    isDefault: obj.default_set === '1' ? true : false
  }
}

// 返回
const onClickLeft = () => {
  store.commit("changeRouterType", "back")
  router.push('/address')
  //   history.back()
}


// 获取表单内容
const onSave = async (data) => {
  // 设置默认地址
  if (data.isDefault) {
    let res = await post(`/setDefault/${id.value}`)
  }
  //   更新表单
  let body = {
    name: data.name,
    phone: data.tel,
    area_name: data.city,
    desc: data.addressDetail,
    area: data.areaCode,
    post_code: data.postalCode,
    status: '1'
  }
  let putRes = await put(`/address/${id.value}`, body)
  Toast({
    message: '保存成功',
    position: 'top',
  })
  router.push('/address')
};

// 删除选中
const delAddress = (val) => {
  Dialog.confirm({
    title: '小xu提示',
    theme: 'round-button',
    message:
      '您是否确认删除地址?',
  })
    .then(() => {
      del(`/address/${val}`).then(res => {
        Toast({
          message: '删除成功',
          position: 'top',
        })
        store.commit("changeRouterType", "back")
        router.push('/address')
      })
    }).catch(() => { });
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