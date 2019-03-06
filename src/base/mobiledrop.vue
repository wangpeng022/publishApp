<template>
  <div class="drop">
    <div class="drop_header" @click="show">
      <div class="left">
        <p class="ver">版本：2.2.2</p>
        <p class="size">大小：13MB</p>
        <p class="size">更新日期：2019.01.01</p>
      </div>
      <div class="right">
        <Icon type="ios-arrow-down" :class="{'up':isShow}"/>
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
      <div class="btns">
        <Button>iPhone版下载</Button>
        <Button>Android 版下载</Button>
      </div>
    </div>
    <!-- </transition> -->
  </div>
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
  /* margin: 0 .2rem; */
}
.drop .drop_header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: .16rem .2rem;
  height: 1.11rem;
  
}
.drop .drop_header .new {
  position: absolute;
  top: .16rem;
  left: 1.7rem;
  width: .38rem;
  height: .18rem;
  padding-left: .06rem;
  color: #fff;
  font-size: .12rem;
  line-height: .18rem;
  border-radius: .09rem;
  background: linear-gradient(-129deg, #f5990b 0%, #fd492e 100%);
}
.drop .left .ver {
  margin-right: 65px;
  margin-bottom: .14rem;
  line-height: 1.5;
  font-size: .16rem;
  color: #2c2c2c;
  width: 193px;
}
.drop .left .size {
  font-size: .13rem;
  color: #999999;
}
.drop .drop_header .right {
  font-size: .3rem;
  color: #c2c4ca;
}
.drop .drop_header .right .ivu-icon.up{
  transform: rotateX(180deg);
}
.drop_describe {
  position: relative;
  background: #f5f5f5;
  padding: .2rem;
  overflow: hidden;
}
.drop_describe .btns {
  margin: .1rem 0;
}
.drop_describe .btns .ivu-btn{
  margin: 0 .08rem;
  width: 1.6rem;
  height: .4rem;
  font-size: .13rem;
  border-radius: .2rem;
  border: 1px solid #2587F4;
  color: #2587F4;
}
.drop_describe p {
  font-size: 14px;
  color: #555555;
  line-height: 32px;
}
</style>
