<template>
  <div class="loginpage">
    <div class="homepage">
      <div class="head">
        <img src="../assets/image/编组@3x.png" alt="" />
      </div>
      <input
        type="text"
        ref="phone"
        :class="{ green: !regPhone }"
        v-model="userphone"
        placeholder="请输入手机号码"
      />
      <div class="box">
        <input
          type="password"
          ref="pwd"
          :class="{ green: !regPassword }"
          v-model="password"
          placeholder="请输入密码"
        />
        <div class="yuan">
          <van-icon v-show="eye" @click="eyeClick" name="closed-eye" />
          <van-icon v-show="!eye" @click="eyeClick" name="eye-o" />
        </div>
      </div>
      <button @click="goToMy">登录</button>
      <div class="bottom">
        <router-link to="registered">
          <span>立即注册</span>
        </router-link>
        <p></p>
        <span>忘记密码</span>
      </div>
    </div>
    <SliderCaptcha :show="show" :page="page" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import { Dialog } from 'vant';
const store = useStore();
import { phoneRegular, passwordRegular, checkAll } from '../Utils/regular.js'
import SliderCaptcha from '../components/SliderCaptcha.vue'
let route = useRoute();
let userphone = ref('')
let password = ref('')
let eye = ref(true)
let pwd = ref('')
let show = ref(false)
let page = ref(route.query.redirect)

let regPhone = computed(() => {
  let newPhone = phoneRegular(userphone)
  return newPhone
})
let regPassword = computed(() => {
  let newPassword = passwordRegular(password)
  return newPassword
})
const goToMy = async () => {
  let flag = checkAll([userphone, password])
  if (flag) {
    if (!regPhone.value && !regPassword.value) {
      let data = {
        password: password.value,
        phone: userphone.value
      }
      try {
        await store.dispatch('user/changeIsLogin', data);
        show.value = true
      } catch (err) {
        Dialog({ message: err.response.data.msg })
      }
    }
  } else {
    Dialog({ message: '请填写完整！' })
  }
}


// 眼睛 显示密码
const eyeClick = () => {
  eye.value = !eye.value
  pwd.value.type = eye.value ? 'password' : 'text'
}

</script>

<style lang="scss" scoped>
.loginpage {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.homepage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  width: 2.95rem;
  height: 3.34rem;
  .head {
    margin: 0 auto;
    width: 0.66rem;
    height: 0.66rem;
    // border: 1px solid pink;
    border-radius: 50%;
    img {
      width: 0.66rem;
      height: 0.66rem;
    }
  }
  input {
    width: 2.95rem;
    height: 0.48rem;
    background: #f9f9f9;
    border-radius: 6px;
    text-indent: 00.16rem;
    font-size: 0.16rem;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .green {
    border: 1px solid green;
  }

  input:focus {
    background: rgba(0, 0, 0, 0.2);
  }
  .box {
    position: relative;
    .yuan {
      position: absolute;
      right: 0.2rem;
      bottom: 0.15rem;
    }
  }
  button {
    width: 2.95rem;
    height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    border: transparent;
    font-size: 00.16rem;
    color: #ffffff;
  }
  .bottom {
    display: flex;
    margin: 0 auto;
    span {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
    }
    p {
      margin-left: 00.12rem;
      margin-right: 00.12rem;
      width: 0.01rem;
      height: 0.15rem;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>