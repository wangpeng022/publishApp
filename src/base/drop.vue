<template>
  <div class="drop">
    <div class="drop_header" @click="show">
        <div class="left">
            <span>版本：2.2.2</span>
            <span>大小：13MB</span>
        </div>
        <div class="right">
            <span>
                跟新日期：2019.01.01
            </span>
        </div>
    </div>
    <div class="drop_describe" v-show="isShow">
        <p>1、修复了工单执行页，已完成图标错位问题；</p>
        <p>2、修复了签字闪退的bug</p>
        <p>3、解决了部分机型一直加载中的问题</p>
    </div>
  </div>
</template>

<script>
export default {
   data () {
        return {
            isShow: false
            }
    },
    methods: {
        show(){
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style>
    .drop{
        border: 1px solid #000;
    }
    .drop .drop_header{
        /* border-bottom: 1px solid #000; */
        min-height: 30px;
    }
    .drop .drop_header .left{
        float: left;
    }
    .drop .drop_header .right{
        float: right;
    }
    .drop_describe{
        border-top: 1px solid #000;
    }
 
</style>
