/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: 手机 详情页
******************************************/
<template>
  <div class="mobile">
    <div class="mobile_home">
      <div class="mobile_home_header">
        <div class="mobile_home_logo"></div>
        <h2>设备设施-新城控股</h2>
        <p>
          <span>iPhone版本：2.2.0 (build 37)</span>
          <span>Android版本：2.2.0 (build 37)</span>
        </p>
      </div>
      <div class="mobile_home_btns">
        <Button @click="installing=true">iPhone 版下载</Button>
        <Button @click="box_WX=true">Android 版下载</Button>
        <Button @click="useqrcode">二维码下载</Button>
        <p>苹果官网：在 iOS 上安装自定企业级应用</p>
      </div>
    </div>
    <div class="mobile_body">
      <div class="mobile_body_header">
        <span class="title">
          版本说明
        </span>
        <Select v-model="defaultVer" class="change_version" style="width:130px">
          <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="mobile_body_cont">
        <mobiledrop></mobiledrop>
        <mobiledrop></mobiledrop>
      </div>
    </div>
    <div class="footer">
      <p>技术支持：北京博锐尚格-MEOS</p>
      <p>© 2016 Persagy. All rights reserved 京ICP备 09030380 号</p>
    </div>
    <div class="ivu-modal-mask" style="z-index: 1003" v-show="box_WX" @click="box_WX=false">
      <div class="content_box">
        <p>点击这里选择</p>
        <p style="color: #2D8CF0;">[ 在Safari中打开 ]</p>
        <p>进行下载安装</p>
        <img class="img" src="../assets/img/mobile/引导箭头.png">
      </div>
    </div>
    <div class="ivu-modal-mask" style="z-index: 1003" v-show="codeShow">
      <div class="code_box">
        <img class="img" ref="code_a" src="">
        <!-- <p>手机扫描二维码下载</p>
        <p>或</p> -->
        <p>长按保存二维码到手机</p>
        <Icon type="ios-close" @click="codeShow=false"/>
      </div>
    </div>
    <div class="installing" v-show="installing">
      <div class="installing_header">
        <span class="close" @click="installing=false">关闭</span>
        <span>iOS 客户端下载</span>
      </div>
      <div class="installing_footer">
        <p style="font-size:.23rem;">正在安装中…</p>
        <p style="font-size:.17rem; margin: .25rem 0 .16rem 0;">可返回桌面查看</p>
        <p style="font-size:.13rem; color: #67F4FF;">苹果官网：在 iOS 上安装自定企业级应用</p>
      </div>
    </div>
  </div>
</template>

<script>
import mobiledrop from '../base/mobiledrop'
import QRCode from "qrcode";
export default {
   data () {
     return {
       box_WX: false,
       codeShow: false,
       installing: false,
        classList: [
        {
          value: "iPhone 版本",
          label: "iPhone 版本"
        },
        {
          value: "Android 版本",
          label: "Android 版本"
        }
      ],
      defaultVer: "iPhone 版本"
     }
   },
   components: {
     mobiledrop
   },
   methods: {
     //动态生成二维码
    useqrcode() {
      //生成的二维码内容，可以添加变量
      //this.QueryDetail='http://www.kspxzx.com/#/guard'+"?unique_code="+this.QueryDetail;
      this.QueryDetail = window.location.href;
      // var canvas = document.getElementById("canvas");
      // QRCode.toCanvas(canvas, this.QueryDetail, function(error) {
      //   if (error) console.error(error);
      //   console.log("success!");
      // });
      var opts = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        width: 300,
        height: 300,
        rendererOpts: {
          quality: 0.3
        }
      };
      // if (this.isWX || this.isIphone) {
      //   QRCode.toDataURL(this.QueryDetail, opts)
      //     .then(url => {
      //       this.$refs.code_a.src = url;
      //     })
      //     .catch(err => {
      //       console.error(err);
      //     });
      //   this.box_WX = true;
      //   return;
      // }
      this.codeShow = !this.codeShow;
      // if (!this.codeShow) {
      //   return;
      // }
      // document.body.addEventListener("click", e => {
      //   var key = e.target.getAttribute("index") || false;
      //   if (key != "is") {
      //     this.codeShow = false;
      //   }
      // });
      QRCode.toDataURL(this.QueryDetail, {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        width: 134,
        height: 134,
        rendererOpts: {
          quality: 0.3
        }
      })
        .then(url => {
          console.log(url);
          this.$refs.code_a.src = url;
        })
        .catch(err => {
          console.error(err);
        });
    },
   }
}
</script>

<style>
.mobile{
  background: #f2f2f2;
  padding-bottom: .16rem;
}
.mobile_home{
  height: 5.92rem;
  padding-top: .91rem;
  background: url('../assets/img/mobile/bg-1.png') no-repeat ;
  background-size: 100%; 
}
 .mobile_home_header{
   margin-bottom: .63rem;
   color: #FFF;
   text-align: center;
 }
 .mobile_home_header h2{
   font-size: .22rem;
   margin: .15rem 0 .17rem;
 }
  .mobile_home_header p{
   font-size: .11rem;
 }
  .mobile_home_header p span{
    padding: 0 .1rem; 
  }
 .mobile_home_header p span:nth-child(1){
   border-right: 1px solid #fff;
 }
 .mobile_home_logo{
   margin: 0 auto;
   width: 1.18rem;
   height: 1.18rem;
   background: lightblue;
   border-radius:  25%;
   
 }
 .mobile_home_btns {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .mobile_home_btns .ivu-btn-default{
  margin: .1rem;
  width: 2.5rem;
  height: .4rem;
  background: #FFFFFF;
  border: none;
  font-size: .16rem;
  color: #2587F4;
  /* box-shadow: 1px 3px 8px 0 #B8C4FF; */
  border-radius: .4rem;
 }
.mobile_home_btns .ivu-btn-default:hover{
  color: #fff;
  background: #2D8CF0;
}
.mobile_home_btns p{
  font-size: .13rem;
  color: #67F4FF;
}
.mobile_body{
  padding: .12rem 0 .3rem;
}
.mobile_body_header{
  display: flex ;
  justify-content: space-between;
  padding: 0 .2rem;
}
.mobile_body_header .ivu-select-selection{
  border: none;
  background: #f5f5f5;
}
.mobile_body_header .ivu-select-selection{
  box-shadow: none;
}
.mobile_body_header .title{
  font-size: .2rem;
  color: #363F80;
}
.mobile_body_cont{
  min-height: 2.22rem;
  background: #fff;
}
.mobile .footer {
  width: 100%;
  height: .85rem;
  padding: 0.25rem;
  background: #fff;
  text-align: center;
  font-size: 0.12rem;
  color: #555;
}
.mobile .content_box{
  position: absolute;
  top: .05rem;
  right: .1rem;
  padding: .18rem;
  width: 1.41rem;
  height: 1.09rem;
  background: #FFFFFF;
  border-radius: .08rem;
}
.mobile .content_box::before{
  content: "";
  position: absolute;
  top: -5px;
  right: 10px;
  width: 0;
  height: 0;
  border-width: 0 6px 6px;
  border-style: solid;
  border-color: transparent transparent #fff;

}
.mobile .content_box p{
  font-size: .12rem;
  color: #666666;
  line-height: .24rem;
}
.mobile .content_box .img{
  position: absolute;
  top: 100%;
  right: 50%;
  width: 1.04rem;
}
.code_box{
  position: absolute;
  top: 1.7rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2.95rem;
  height: 3.42rem;
  padding-top: .4rem;
  background: #fff;
  border-radius: .2rem;
  text-align: center;
}
.code_box .img{
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
  background: #f2f2f2;
}
.code_box p{
  font-size: .16rem; 
}
.code_box i{
  font-size: .3rem;
  padding: .2rem; 
}

/* 安装中 */
.mobile .installing{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../assets/img/mobile/installing.png') no-repeat;
  background-size: 100% 100%;
}
.installing_header{
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  background: #2E3679;
  color: #fff;
  font-size: .18rem;
  text-align: center;
}
.installing_header .close{
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 .15rem;
  font-size:.14rem;
}
.installing_footer{
  position: absolute;
  bottom: 1rem;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 1;
}
</style>
