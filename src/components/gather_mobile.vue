/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: 手机端 app集合页
******************************************/
<template>
  <div class="gather_mobile">
    <div class="gather_mobile_bg"></div>
    <div class="gather_mobile_select">
      <Select v-model="defaultVer" class="change_version" style="width:2rem" @on-change='chagneSeries'>
        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="gather_mobile_content">

      <div class="gather_mobile_item">
        <div class="gather_mobile_item_header">
          <div class="logo"></div>
          <div class="gather_mobile_header_text">
            <p class="gather_mobile_header_title">设备设施</p>
            <p>iPhone 版本： v2.2.0</p>
            <p>Android 版本：v2.2.0</p>
          </div>
        </div>
        <div class="gather_mobile_btns">
          <Button>iPhone 版下载</Button>
          <Button>Android 版下载</Button>
          <Button>二维码下载</Button>
        </div>
      </div>

      <div class="gather_mobile_item">
        <div class="gather_mobile_item_header">
          <div class="logo"></div>
          <div class="gather_mobile_header_text">
            <p class="gather_mobile_header_title">设备设施</p>
            <p>iPhone 版本： v2.2.0</p>
            <p>Android 版本：v2.2.0</p>
          </div>
        </div>
        <div class="gather_mobile_btns">
          <Button>iPhone 版下载</Button>
          <Button>Android 版下载</Button>
          <Button>二维码下载</Button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>技术支持：北京博锐尚格-MEOS</p>
      <p>© 2016 Persagy. All rights reserved 京ICP备 09030380 号</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      classList: [
        {
          value: "1",
          label: "MEOS系列产品"
        },
        {
          value: "2",
          label: "其它系列产品1"
        }
      ],
      defaultVer: "1"
    };
  },
  components: {},
  mounted(){
    // axios.post('/api/ProductListService',qs.stringify({"jsonString": JSON.stringify({})})).then(res=>{
    //   var result = res.data.content;
    //   if (result && result.length>0) {
    //     var arr=[];
    //     result.forEach(item => {
    //       arr.push({
    //         value: item.id,
    //         label: item.name
    //       });
    //     });
    //     this.classList = arr;
    //     this.defaultVer = this.classList[0].id;
    //   }
    // }).catch(err=>console.log(err));
    axios.post('/api/AppListService',qs.stringify({"jsonString": JSON.stringify({})})).then(res=>{
      var result = res.data.content;
      console.log(result);
    }).catch(err=>console.log(err));
  },
  methods: {
    chagneSeries(name){
      console.log(name);
      
    }
  }
};
</script>

<style>
.gather_mobile {
  background: #f5f5f5;
}
.gather_mobile_bg {
  width: 100%;
  height: 2rem;
  background: url("../assets/img/mobile/banner-产品.png") no-repeat;
  background-size: 100%;
}
.gather_mobile_select {
  margin: 0.14rem 0.2rem 0.06rem;
}
.gather_mobile_select .change_version .ivu-select-arrow{
  font-size: .3rem;
  top: .08rem;
}
.gather_mobile_select .change_version .ivu-select-item{
  font-size: .14rem!important;
}
.gather_mobile_select .ivu-select-selection {
  border: none;
  box-shadow: none;
  background: #f5f5f5;
}
.gather_mobile_select .ivu-select-selected-value {
  font-size: 0.2rem !important;
  color: #363f80;
}
.gather_mobile_content {
  min-height: 3.05rem;
}
.gather_mobile .footer {
  width: 100%;
  height: 0.85rem;
  padding: 0.25rem;
  background: #fff;
  text-align: center;
  font-size: 0.12rem;
  color: #555;
}
.gather_mobile_item {
  width: 100%;
  height: 3.05rem;
  padding: 0.25rem 0.21rem 0;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.gather_mobile_item_header{
  display: flex;
}
.gather_mobile_item_header .logo{
  width: .7rem;
  height: .7rem;
  border-radius: .1rem;
  background: lightblue;
}
.gather_mobile_header_text{
  margin-left: .19rem;
}
.gather_mobile_header_text>p{
  font-size: .12rem;
  color: #666666;
}
.gather_mobile_header_text .gather_mobile_header_title{
  font-size: .18rem;
  color: #2C2C2C;
}
.gather_mobile_btns {
  display: flex;
  flex-direction: column;
  align-items: center;
}
 .gather_mobile_btns .ivu-btn-default{
  margin: .1rem;
  width: 3.33rem;
  height: .4rem;
  background: #FFFFFF;
  font-size: .16rem;
  color: #2587F4;
  border-radius: .4rem;
  border: 1px solid #2D8CF0;
 }
 .gather_mobile_btns .ivu-btn-default:hover{
  color: #fff;
  background: #2D8CF0;
}
</style>
