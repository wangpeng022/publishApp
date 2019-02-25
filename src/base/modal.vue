<template>
  <div data-transfer="true" class="v-transfer-dom">
    <div class="ivu-modal-mask" style="z-index: 1003" v-show="show">
      <div class="content_box">
        <slot></slot>
        <div class="close">
          <Icon type="md-close" @click="closeModal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: this.isShow,
    };
  },
  props: ['isShow'],
  methods: {
    closeModal(){
      // this.isShow = false;
      console.log(this.isShow);
      
    }
  }
};
</script>

<style slot>
  .v-transfer-dom .content_box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 250px;
    height: 300px;
    background: #fff;
  }
  .close{
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translate(-50%);
    font-size: .2rem;
    color: #fff;
  }
</style>
