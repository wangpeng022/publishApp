<template>
  <Card class="drop">
    <div class="drop_header" @click="show">
      <div class="left">
        <span class="ver">版本：2.2.2</span>
        <span class="size">大小：13MB</span>
      </div>
      <div class="right">
        <span>更新日期：2019.01.01</span>
      </div>
      <div class="new">New</div>
    </div>
    <!-- <transition name="toggle"> -->
    <div class="drop_describe" v-if="isShow">
      <div class="box">
        <p>1、修复了工单执行页，已完成图标错位问题；</p>
        <p>2、修复了签字闪退的bug</p>
        <p>3、解决了部分机型一直加载中的问题</p>
      </div>
      <Button class="down_btn">iPhone版下载</Button>
    </div>
    <!-- </transition> -->
  </Card>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style>
/* 动画开始 */
.toggle-enter-active,
.toggle-leave-active,
.tgroup-enter-active,
.tgroup-leave-active {
  transition: all 0.5s !important;
}

.toggle-enter,
.toggle-leave-to,
.tgroup-enter,
.tgroup-leave-to {
  height: 0 !important;
}
/* 动画结束 */
.drop {
  margin: 15px 0;
}
.drop .drop_header {
  position: relative;
  height: 90px;
  line-height: 90px;
}
.drop .drop_header .left {
  padding-left: 20px;
}
.drop .drop_header .new {
  position: absolute;
  top: 34px;
  left: 193px;
  width: 38px;
  height: 18px;
  padding-left: 6px;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  border-radius: 9px;
  background: linear-gradient(-129deg, #f5990b 0%, #fd492e 100%);
}
.drop .left .ver {
  display: inline-block;
  margin-right: 65px;
  font-size: 18px;
  color: #2c2c2c;
  width: 193px;
}
.drop .left .size {
  font-size: 14px;
  color: #717171;
}
.drop .drop_header .right {
  font-size: 14px;
  color: #c5c6c5;
}
.drop_describe {
  position: relative;
  border-top: 1px solid #e7e7e7;
  padding: 30px 20px 20px;
  overflow: hidden;
}
.drop_describe .down_btn {
  position: absolute;
  top: 42px;
  right: 24px;
  width: 160px;
  height: 40px;
  font-size: 16px;
  color: #5d6778;
}
.drop_describe p {
  font-size: 14px;
  color: #555555;
  line-height: 32px;
}
</style>
