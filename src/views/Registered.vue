<template>
  <div class="body">
    <div class="homepage">
      <div class="head">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-touxiang-"></use>
        </svg>
      </div>

      <input
        type="text"
        :class="{ green: !regName }"
        v-model="username"
        placeholder="请输入用户名"
      />
      <input
        type="text"
        :class="{ green: !regPhone }"
        v-model="userphone"
        placeholder="请输入电话号码"
      />

      <div class="box">
        <input
          type="password"
          :class="{ red: regPassword, green: !regPassword }"
          ref="pwd"
          v-model="password"
          placeholder="请输入密码"
        />
        <div class="yuan">
          <van-icon v-show="eye" @click="eyeClick" name="closed-eye" />
          <van-icon v-show="!eye" @click="eyeClick" name="eye-o" />
        </div>
      </div>
      <button @click="landing">注册</button>
      <router-link to="/login">
        <span>已有账号去登陆</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { nameRegular, phoneRegular, passwordRegular, checkAll } from '../Utils/regular.js'
import { Dialog } from 'vant';
import { post } from '../Utils/request.js'
import { ref, computed } from 'vue'
let router = useRouter();
let username = ref('')
let userphone = ref('')
let password = ref('')
let pwd = ref('')
let eye = ref(true)

// 注册
let regName = computed(() => {
  let newName = nameRegular(username)
  return newName
})
let regPhone = computed(() => {
  let newPhone = phoneRegular(userphone)
  return newPhone
})
let regPassword = computed(() => {
  let newPassword = passwordRegular(password)
  return newPassword
})

const landing = async () => {
  let flag = checkAll([username, userphone, password])
  if (flag) {
    if (!regName.value && !regPhone.value && !regPassword.value) {
      let data = {
        name: username.value,
        password: password.value,
        phone: userphone.value
      }
      await post('/register', data).then(res => {
        if (res.status == 200) {
          Dialog({ message: res.data.msg }).then(() => {
            router.push('/login')
          })
        }
      }).catch(err => {
        Dialog({ message: err.response.data.msg })
      })
    }
  } else {
    Dialog({ message: '请填写完整!' })
  }
}


// 眼睛 显示密码
const eyeClick = () => {
  eye.value = !eye.value
  pwd.value.type = eye.value ? 'password' : 'text'
}


</script>

<style lang="scss" scoped>
.body {
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
  height: 3.98rem;
  .head {
    margin: 0 auto;
    width: 0.66rem;
    height: 0.66rem;
    border-radius: 50%;
    .icon {
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
    border: 1px solid #f9f9f9;
  }
  input:focus {
    background: rgba(0, 0, 0, 0.2);
  }
  .green {
    border: 1px solid green;
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
  button:active {
    background: rgba(230, 234, 236, 0.82);
  }
  a {
    margin: 0 auto;
  }
  span {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>