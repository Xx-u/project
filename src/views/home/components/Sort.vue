<template>
  <div class="sortBox">
    <div class="img"></div>
    <p>{{ title }}</p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: ["title"]
}
export const useMsgEffact = () => {
  // 定义data响应式数据
  const data = reactive({
    title: ''
  }),
    //   showToast方法
    showToast = (title) => {
      data.title = title
    }
  const { title } = toRefs(data)
  return { title, showToast }
}

</script>

<style lang="scss" scoped>
.sortBox {
  width: 0.66rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background-size: cover !important;
}
p {
  width: 0.48rem;
  height: 0.17rem;
  padding-top: 00.06rem;
  text-align: center;
}
.sortBox:nth-child(1) .img {
  background: url("../../../assets/image/时尚单品.png") no-repeat;
}
.sortBox:nth-child(2) .img {
  background: url("../../../assets/image/连衣裙.png") no-repeat;
}
.sortBox:nth-child(3) .img {
  background: url("../../../assets/image/手机.png") no-repeat;
}
.sortBox:nth-child(4) .img {
  background: url("../../../assets/image/食品.png") no-repeat;
}
.sortBox:nth-child(5) .img {
  background: url("../../../assets/image/美妆.png") no-repeat;
}
.sortBox:nth-child(6) .img {
  background: url("../../../assets/image/运动.png") no-repeat;
}
.sortBox:nth-child(7) .img {
  background: url("../../../assets/image/药店.png") no-repeat;
}
.sortBox:nth-child(8) .img {
  background: url("../../../assets/image/电器.png") no-repeat;
}
.sortBox:nth-child(9) .img {
  background: url("../../../assets/image/饰品.png") no-repeat;
}
.sortBox:nth-child(10) .img {
  background: url("../../../assets/image/鞋靴.png") no-repeat;
}
</style>