<template>
  <div class="body">
    <div class="page">
      <div class="top">
        <van-nav-bar
          title="我的收货地址"
          left-arrow
          @click-left="onClickLeft"
          right-text="删除"
          @click-right="onClickRight"
        />
      </div>
      <div class="main">
        <div class="list">
          <div class="edit">
            <van-address-list
              v-model="chosenAddressId"
              :list="list"
              @select="select"
              default-tag-text="默认"
              @add="onAdd"
              @edit="onEdit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { get, del } from '../../Utils/request.js'
import { Toast, Dialog } from 'vant';
import { useRouter } from 'vue-router'
import { toast } from '../../Utils/index.js'
let router = useRouter()
let store = useStore()
let chosenAddressId = ref(null)
let list = ref([])

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
  //   默认选中
  let arr = list.value.find(ele => ele.isDefault)
  if (arr != undefined) {
    chosenAddressId.value = arr.id
  }
}
// 绑定单选框
const select = (data) => {
  chosenAddressId.value = data.id
}

// 返回
const onClickLeft = () => {
  store.commit("changeRouterType", "back")
  router.push('/my')
  //   history.back()

}
// 删除选中
const onClickRight = () => {
  if (!list.value.length) {
    Toast({
      message: '请新建地址',
      position: 'top',
    })
  } else {
    Dialog.confirm({
      title: '小xu提示',
      theme: 'round-button',
      message:
        '您是否确认删除地址?',
    })
      .then(() => {
        del(`/address/${chosenAddressId.value}`).then(res => {
          Toast({
            message: '删除成功',
            position: 'top',
          })
          getEdit()
        })
      }).catch(() => { });
  }
}
// 新建
const onAdd = () => {
  toast()
  store.commit("changeRouterType", "push")
  router.push('/newedit')
};
// 编辑
const onEdit = (item) => {
  toast()
  store.commit("changeRouterType", "push")
  router.push(`/edit?key=${item.id}`)
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
  margin: 0 auto;
  min-height: 100vh;
  padding-top: 00.5rem;

  .list {
    .edit {
      border-radius: 00.15rem;
      .van-address-list {
        padding: 00.15rem !important;
      }
    }
  }
}
</style>