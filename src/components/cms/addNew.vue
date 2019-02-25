<template>
  <div class="step">
    <div class="up">
      <Steps :current="0">
        <Step title="已完成" content="上传安装包"></Step>
        <Step title="进行中" content="填写应用信息"></Step>
        <Step title="待进行" content="完成"></Step>
      </Steps>
    </div>
    <div class="down">
      <div class="center">
        <Button type="primary" icon="md-cloud-upload" ghost>点击上传安装包</Button>
        <p>* 必须上传，仅支持ipa或apk文件</p>
        <span>跳过，先不上传</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   data () {
     return {

     }
   },
   components: {

   }
}
</script>

<style>
.step{
  height: 100%;
  width: 100%;
  padding: 0 1rem 1.4rem .4rem;
  /* text-align: center; */
}
.step .up{
  height: 2.35rem;
  width: 9rem;
  margin: 0 auto;
  padding-top: 1rem;
}
.step .up .ivu-steps-title,.step .up .ivu-steps-head{
  background: #f7f7fd;
}
.step .down{
  position: relative;
  width: 100%;
  height: calc(100% - 2.35rem);
  background: #FFF; 
  
}
.step .down .center{
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: .3rem;
}
.step .center p{
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #EB944F;
  text-align: center;
}
.step .center span{
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #3651BF;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
}
.step .down .ivu-icon{
  font-size: 22px;
  line-height: 1;
}
</style>
