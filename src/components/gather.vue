/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: PC app集合页
******************************************/
<template>
  <div class="gather_content">
    <div class="header">
      <!-- <img ref="logo" :src="'http://172.16.0.110:8888/saas-version-app/Spring/MVC/entrance/unifier/download?resource='+dataList.picture"> -->
      <img ref="logo">
    </div>
    <div class="gather_content_body">
      <h2>{{title}}</h2>
      <Select v-model="selProduct" class="change_version" style="width:130px" @on-change="changeTitle">
        <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <div class="gather_content_body_box">

        <itemcard v-for="item in dataList" :key="item.id" :dataObj="item"></itemcard>

      </div>
    </div>
    <div class="footer">
      <p>技术支持：北京博锐尚格-MEOS</p>
      <p>© 2016 Persagy. All rights reserved 京ICP备 09030380 号</p>
    </div>
  </div>
</template>

<script>
// import drop from "../base/drop";
import itemcard from "../base/itemcard";
import QRCode from "qrcode";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isWX: false,
      isAndroid: false,
      isIOS: false,
      isIphone: false,
      productList: [],
      selProduct: "",//选中产品线id
      title: '产品线',
      dataList: []
    };
  },
  components: {
    itemcard
  },
  mounted() {
    var u = navigator.userAgent;
    this.isWX = u.indexOf("MicroMessenger") > -1; //微信终端
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.isIphone = u.indexOf("iPhone") > -1; //ios终端

    // console.log(this.$route.params.id);
    this.ProductListService();

  },
  methods: {
     // 获取产品系列表
    ProductListService(){
      axios.post("/api/ProductListService",qs.stringify({
            jsonString: JSON.stringify({})
          })).then(res => {
          if (res.data.result == "success") {
            this.productList = res.data.content;
            this.selProduct = this.productList[0].id;
            this.title = this.productList[0].name;
          }
        }).then(()=>{
          this.AppDownloadListService()
        }).catch(err => console.log(err));


    },
    // 获取产品线下的最新apps
    AppDownloadListService(){
      axios.post("/api/AppDownloadListService",qs.stringify({
            jsonString: JSON.stringify({productId: this.selProduct})
          })).then(res => {
          if (res.data.result == "success") {
            this.dataList = res.data.content;
            // console.log(this.dataList);
          }
        }).catch(err => console.log(err))
    },
    // 切换产品线
    changeTitle(){
      this.title = this.productList.filter(key=>key.id==this.selProduct)[0].name;
      this.AppDownloadListService();
    },
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
      if (this.isWX || this.isIphone) {
        QRCode.toDataURL(this.QueryDetail, opts)
          .then(url => {
            this.$refs.code_a.src = url;
          })
          .catch(err => {
            console.error(err);
          });
        this.box_WX = true;
        return;
      }
      this.codeShow = !this.codeShow;
      if (!this.codeShow) {
        // document.body.removeEventListener('click');
        return;
      }
      document.body.addEventListener("click", e => {
        var key = e.target.getAttribute("index") || false;
        if (key != "is") {
          this.codeShow = false;
        }
      });
      QRCode.toDataURL(this.QueryDetail, {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        width: 134,
        height: 134,
        rendererOpts: {
          quality: 0.3
        }
      }).then(url => {
          console.log(url);
          this.$refs.code.src = url;
        }).catch(err => {console.error(err);});
    },
    //保存二维码
    saveCode(name) {
      //pc下载
      var img = document.getElementById("code_img");
      // var f = document.createElement("iframe");
      // f.style.display = "none";
      // f.src = img.src;
      // f.name = "aaa";
      // document.body.appendChild(f);
      // f.download = name || "项目二维码";
      // console.log(f);
      // setTimeout(() => {
      //   window.frames["aaa"].document.execCommand("SaveAs");
      // }, 100);

      // var f = document.createElement("a");
      // f.download = name || "项目二维码";
      // f.href = img.src;
      // f.click();

      const blob = new Blob([img.src], {
        type: "image/jpeg",
        data: "text/csv",
        charset: "utf-8"
      });
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = "123";
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, 111);
      }
    },
    // 复制链接成功后的回调
    onCopy(){
      this.$Message.info('复制到剪切板成功');
      this.modal_iphone = false;
    }
  }
};
</script>

<style>
.drop_header {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
}
.gather_content {
  padding: 0.1px;
  width: 100%;
  min-width: 9rem;
  background: #f5f5f5;
}
.gather_content .footer {
  width: 100%;
  height: 1.4rem;
  padding: 0.5rem;
  background: #fff;
  text-align: center;
  font-size: 0.14rem;
  color: #555;
}
.gather_content .header {
  width: 100%;
  min-height: 3.6rem;
  padding: 0.7rem 0.1rem 0;
  background: url("../assets/img/banner-2.png") no-repeat center center;
  text-align: center;
  color: #fff;
}
.gather_content_body {
  position: relative;
  /* max-width: 80%; */
  width: 11rem;
  margin: 0.6rem auto 0;
  padding-bottom: 100px;
}
.gather_content_body .change_version {
  position: absolute;
  top: 0;
  right: 0;
}
.gather_content_body .change_version .ivu-select-selection{
  border: none;
  background: #f5f5f5;
}
.gather_content_body .change_version .ivu-select-selection{
  box-shadow: none;
}
.gather_content_body h2 {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #363f80;
  letter-spacing: 0;
  height: 42px;
}
.gather_content_body_box{
  display: flex;
  flex-wrap: wrap;
  width: 1100px;
  min-height: 284px;
  background: #fff;
}
.btns .download {
  position: relative;
  display: inline-block;
}
.btns .ivu-btn.ivu-btn-default {
  width: 1.77rem;
  height: 0.46rem;
  margin: 0 0.19rem;
  background: -webkit-linear-gradient(
    left top,
    #20c8f9,
    #2587f4
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    left top,
    #20c8f9,
    #2587f4
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    left top,
    #20c8f9,
    #2587f4
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right bottom, #20c8f9, #2587f4); /* 标准的语法 */
  color: #fff;
  border: none;
}
.btns .ivu-btn.ivu-btn-default:hover {
  box-shadow: 1px 3px 8px 0 #b8c4ff;
}
.btns .ivu-btn.ivu-btn-default:active {
  /* background: #2887F5; */
}
.btns .code {
  position: absolute;
  /* display: none; */
  right: 0.18rem;
  top: 0.46rem;
  width: 1.77rem;
  height: 2rem;
  padding: 0.18rem 0.2rem 0;
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0 6px 10px 0 #e9e9e9;
  border-radius: 8px;
  z-index: 10;
}
.btns .code::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-width: 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent #fff;
}
.btns .code .img {
  position: relative;
  /* width: 1.2rem;
  height: 1.26rem; */
  /* border: 1px solid #000; */
}
.btns .code p {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
  letter-spacing: 0;
  line-height: 17px;
}
.btns .code p .click {
  font-size: 14px;
  color: #2887f5;
}
.btns .code .img img {
  /* padding-top: 0.05rem; */
}
.btns .code .img .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.4rem;
  height: 0.4rem;
  background: lightblue;
}
.content_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 300px;
  /* background: #fff; */
}
.content_box img {
  width: 100%;
}
.close {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.2rem;
  color: #fff;
}
</style>
