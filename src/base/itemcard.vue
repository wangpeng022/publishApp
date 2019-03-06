<template>
  <Card class="item_card">
    <div class="item_card_haeder">
      <div class="item_card_haeder_logo"></div>
      <div class="item_card_haeder_body">
        <div class="item_card_haeder_title">MEOS-尚格云</div>
        <p>iphone 版本：v2.2.0    Android 版本：v2.2.0</p>
      </div>
    </div>
    <div class="item_card_btns">
      <Button>iphone 版下载</Button>
      <Button>Android 版下载</Button>
      <Button>二维码下载</Button>
    </div>
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
.item_card {
  width: 550px;
  padding: 40px 39px 33px 40px;
}
.item_card_haeder {
  width: 100%;
  height: 111px;
}
.item_card_haeder_logo{
  display: inline-block;
  width: 111px;
  height: 111px;
  background: lightblue;
  border-radius: 17px;
  vertical-align: top;
}
.item_card_haeder_body{
  display: inline-block;
  vertical-align: top;
  margin: 15px 0 0 19px;
}
.item_card_haeder_title{
  font-size: 28px;
  color: #2C2C2C;
}
.item_card_haeder_body p{
  font-size: 14px;
  color: #717171;
}
.item_card_btns{
  margin-top: 20px; 
}
.item_card_btns .ivu-btn-default{
  width: 140px;
  height: 46px;
}
.item_card_btns .ivu-btn-default:hover{
  color: #fff;
  background: #2D8CF0;
}
</style>
