<template>
  <div class="shop">
    <div class="shopBox">
      <div class="logo"></div>
      <div class="right">
        <h4>沃尔玛</h4>
        <div class="pBox">
          <p>月售1万+</p>
          <p>起送¥0</p>
          <p>基础运费¥5</p>
        </div>
        <span>VIP尊享满89元减4元运费券（每月3张）</span>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.shop {
  margin: 0 auto;
  width: 3.39rem;
  margin-bottom: 00.12rem;

  .shopBox {
    display: flex;
    margin-top: 0.14rem;
    width: 3.39rem;
    height: 0.86rem;
    .logo {
      width: 0.56rem;
      height: 0.56rem;
      border: 1px solid #333333;
    }
    .right {
      width: 2.83rem;
      padding-left: 00.16rem;
      border-bottom: 1px solid #f1f1f1;
      h4 {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #333333;
      }
      .pBox {
        margin-top: 0.08rem;
        display: flex;
        color: #333333;
        p {
          margin-right: 00.16rem;
          font-size: 0.13rem;
        }
        margin-bottom: 00.08rem;
      }
      span {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #e93b3b;
      }
    }
  }
}
</style>