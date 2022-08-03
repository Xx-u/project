<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- 不同的name会执行不同的动画效果
      进入一个新页面的时候，name变成push 执行新页面跳转动画
      返回一个旧页面的时候，name变成back 执行返回动画 -->
      <transition
        @before-enter="beforeEnter"
        @after-leave="afterLeave"
        :name="transitionName"
      >
        <!-- include 控制缓存组件 是一个数组 数组中的元素是组件名称 -->
        <keep-alive :include="virtualTaskStack">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
// 变量通常是大写，定义一些不变的变量
const ROUTER_TYPE_PUSH = 'push';
const ROUTER_TYPE_BACK = 'back';
const NONE = 'none';
const ROUTER_TYPE_ENUM = [ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK, NONE];
// 因为做成一个通用的组件，判断当前你的组件使用是否正确
</script>

<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex'
// 需要做一个标记，标记你是新页面，执行push动画
// 需要另外一个标记，表明返回旧页面，执行back页面
let props = defineProps({
  // 如果 routerType  push back
  //   路由跳转的类型：push是进入组件，back退出组件
  routerType: {
    type: String,
    default: NONE,
    validator (val) {
      // 如果我们在设置跳转的过程中没有设置push 或者back 提示开发者，你要设置 
      //   保证开发者一定要传递 routerType ，且routerType 是push 或者 back 或者 none
      const result = ROUTER_TYPE_ENUM.includes(val)
      //   console.log(result);
      if (!result) {
        // routerType 的值不是push back none 三者之一，提示错误
        // 抛出异常
        throw new Error(`你的reoterType必须是ROUTER_TYPE_ENUM数组其中一个`)
      }
      return result
    }
  },
  //   接收显示的组件,也是任务栈中第一个组件
  mainComponentName: {
    type: String,
    routerType: true,
  }
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let transitionName = ref("")
let router = useRouter()
const store = useStore()
// 在路由守卫中设置动画名称
router.beforeEach((to, name) => {
  const resetIcon = ['/', '/shopping', '/order', '/my']
  let index = resetIcon.findIndex(ele => ele == to.fullPath)
  store.state.index = index
  // to是即将跳转的目的路由
  transitionName.value = props.routerType
  //   进栈出栈操作
  if (props.routerType === ROUTER_TYPE_PUSH) {
    //   进栈操作
    virtualTaskStack.value.push((to.name))
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    //   出栈操作
    virtualTaskStack.value.pop()
  }
  if (to.name === props.mainComponentName) {
    //   跳回首页，清空任务栈的操作 => 数组重置
    clearTask()
  }

  let arr = ['/shoppage', '/orderpageT', 'searchpage', 'goodspage',
    '/orderpage', '/login', '/registered', '/address', '/edit', '/newedit']
  //   console.log(to);


  let res = arr.some(ele => to.fullPath.indexOf(ele) != -1);
  store.state.show = true

  if (res) store.state.show = false

})
// isAimate 控制动画执行
let isAnimate = ref(false)
const beforeEnter = () => {
  isAnimate.value = true
}
const afterLeave = () => {
  isAnimate.value = false
}
// 初始化一个空的任务栈 => 首页放在初始化数组
let virtualTaskStack = ref([props.mainComponentName])
// 定义重置任务栈方法
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}
</script>

<style lang="scss" scoped>
.ding {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(100%, 0);
  }
}
</style>

