<template>
  <div class="body">
    <div class="page">
      <van-nav-bar title="编辑资料" left-arrow @click-left="onClickLeft" />
      <div class="header">
        <van-uploader :after-read="afterRead">
          <img :src="headImg" alt="" />
        </van-uploader>
      </div>
      <div class="editBody">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="phone"
              type="phone"
              name="手机"
              label="手机"
              placeholder="手机"
              :rules="[{ required: true, message: '请填写手机' }]"
            />
            <van-field
              v-model="password"
              :type="type"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="yuan">
              <van-icon v-show="show" @click="checkeye" name="closed-eye" />
              <van-icon v-show="!show" @click="checkeye" name="eye-o" />
            </div>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
import { toast } from '../../Utils/index.js'
import { postT, put } from '../../Utils/request.js'
import { Toast } from 'vant';
import { computed } from '@vue/runtime-core';
const store = useStore()
const router = useRouter();
let username = ref(store.state.user.userName)
let phone = ref(store.state.user.userPhone)
let password = ref(store.state.user.password)
let headImg = ref(store.state.user.header_img)
let show = ref('true')
let pwd = ref(null)
let type = ref('password')

// 显示密码
const checkeye = () => {
  show.value = !show.value
  type.value = show.value ? 'password' : 'text'
}
// 上传头像
const afterRead = (file) => {
  toast()
  postT('/update', { file: file.file }).then(res => {
    console.log(res);
    headImg.value = res.data.result.path
  })
};
// 保存更新用户信息
const onSubmit = (data) => {
  let body = {
    name: username.value,
    password: password.value,
    phone: phone.value,
    header_img: headImg.value
  }
  put(`/user/${store.state.user.userID}`, body).then(res => {
    console.log(res);
    Toast('保存成功')
    store.commit('user/changeName', res.result.name)
    store.commit('user/changePhone', res.result.phone)
    store.commit('user/changePassword', res.result.password)
    store.commit('user/changeimg', res.result.header_img)
    store.commit("changeRouterType", "back")
    router.push('/my')
  })
}
// 返回
const onClickLeft = () => {
  store.commit("changeRouterType", "back")
  router.push('/my');
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .page {
    width: 100%;
    height: 100vh;
    background-color: #f6f6f6;
  }
}

::v-deep button {
  height: 0.4rem !important;
}
.header {
  width: 0.94rem;
  height: 0.94rem;
  margin: 0.5rem auto;
  background: url("../../assets/image/userimg.jpg") no-repeat center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  p {
    margin-top: 0.1rem;
    font-size: 0.14rem;
    width: 100%;
    text-align: center;
  }
}
.editBody {
  position: relative;
  .inputItem {
    margin: 0.2rem 0;
  }
  .yuan {
    position: absolute;
    right: 0.4rem;
    bottom: 0.7rem;
  }
}
::v-deep .van-uploader__wrapper {
  .van-uploader__upload {
    width: 0.94rem;
    height: 0.94rem;
    margin: 0;
    border-radius: 50% !important;
  }
}
::v-deep .van-uploader__input-wrapper {
  width: 0.94rem;
  height: 0.94rem;
}
</style>
