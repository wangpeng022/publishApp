<template>
  <Card class="item_card">
    <div class="item_card_haeder" @click="toHome">
      <div class="item_card_haeder_logo"></div>
      <div class="item_card_haeder_body">
        <div class="item_card_haeder_title">{{dataObj.name}}</div>
        <p>iphone 版本：v{{ios.number}}    Android 版本：v{{android.number}}</p>
      </div>
    </div>
    <div class="item_card_btns">
      <Button @click="downApk(ios.resource)">iphone 版下载</Button>
      <Button @click="downApk(android.resource)">Android 版下载</Button>
      <div class="download">
          <button
            type="button"
            class="ivu-btn ivu-btn-default"
            @click="useqrcode"
            index="is">
            <span index="is">二维码下载</span>
          </button>
          <div class="code" index="is" v-show="codeShow">
            <!-- <canvas id="canvas"></canvas> -->
            <div class="img" index="is">
              <img ref="code" id="code_img" index="is" src>
              <!-- <div class="icon"></div> -->
            </div>
            <!-- <i-button style="width:1.5rem" @click="saveCode('code')">保存二维码</i-button> -->
            <p>手机扫描二维码下载</p>
            <p>
              <span>或</span>
              <span class="click" @click="saveCode('code')">保存二维码图片</span>
            </p>
          </div>
        </div>
    </div>
  </Card>
</template>

<script>
import QRCode from "qrcode";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isShow: false,
      codeShow: false,//二维码显示隐藏
      ios: {
        id: '',
        number: ''
      },
      android: {
        id: '',
        number: ''
      },
    };
  },
  props: ['dataObj'],
  methods: {
    toHome(){
      console.log('跳转');
      this.$router.push({ path: '/home', query: { id: this.dataObj.id }});

    },
    show() {
      this.isShow = !this.isShow;
    },
    //下载apk
    downApk(resource) {
      if (!this.android.id) {
        return;
      }
      axios({
        responseType: "arraybuffer",
        method: "get",
        url: "/api/download",
        params: {'resource': resource},
        responseType: "blob"
      })
        .then(res => {
          const filename = decodeURI(
            res.headers["content-disposition"]
              .split(";")
              .filter(item => item.indexOf("filename") >= 0)[0]
              .split("=")[1]
              .replace(/\"/g, "")
          );
          const blob = new Blob([res.data], {
            type: "application/vnd.android",
            // data: "text/xml",
            charset: "utf-8"
          });
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = filename;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, filename);
          }
        })
        .catch(ex => {
          console.log(ex);
        });
    },
    // 查询最新版本下载地址
    VersionCurrentService(){
      var params = {
        appId: this.dataObj.id,
      }
      axios.post("/api/VersionCurrentService",qs.stringify({
            jsonString: JSON.stringify(params)
          })).then(res => {
          if (res.data.result == "success") {
            console.log(res.data.content[0]);
            this.ios = res.data.content[0].versions[0];
            this.android = res.data.content[0].versions[1];
          }
        }).catch(err => console.log(err))
    },
        //动态生成二维码
    useqrcode() {
      //生成的二维码内容，可以添加变量
      //this.QueryDetail='http://www.kspxzx.com/#/guard'+"?unique_code="+this.QueryDetail;
      this.QueryDetail = window.location.href;
      var opts = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        width: 300,
        height: 300,
        rendererOpts: {
          quality: 0.3
        }
      };
      this.codeShow = !this.codeShow;
      if (!this.codeShow) {
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
    // 保存二维码
      saveCode(name) {
      //pc下载
      var img = document.getElementById("code_img");
      const blob = new Blob([img.src], {
        type: "image/jpeg",
        // data: "image/png",
        // charset: "utf-8"
      });
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = "二维码.jpg";
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, '二维码.png');
      }
    },
  },
  mounted() {
    // console.log(this.dataObj);
    // this.ios.id=this.dataObj.versions[0].id;
    // this.ios.number=this.dataObj.versions[0].number;
    // this.android.id=this.dataObj.versions[1].id;
    // this.android.number=this.dataObj.versions[1].number;
    this.VersionCurrentService();
  },
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
  cursor: pointer;
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
.item_card_btns .download {
  position: relative;
  display: inline-block;
}
.item_card_btns .code {
  position: absolute;
  /* display: none; */
  right: -20px;
  top: 46px;
  width: 177px;
  height: 200px;
  padding: 18px 20px 0;
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0 6px 10px 0 #e9e9e9;
  border-radius: 8px;
  z-index: 10;
}
.item_card_btns .code::before {
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
.item_card_btns .code .img {
  position: relative;
  /* width: 1.2rem;
  height: 1.26rem; */
  /* border: 1px solid #000; */
}
.item_card_btns .code p {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
  letter-spacing: 0;
  line-height: 17px;
}
.item_card_btns .code p .click {
  font-size: 14px;
  color: #2887f5;
  cursor: pointer;
}
.item_card_btns .code .img img {
  /* padding-top: 0.05rem; */
}
.item_card_btns .code .img .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.4rem;
  height: 0.4rem;
  background: lightblue;
}
</style>
