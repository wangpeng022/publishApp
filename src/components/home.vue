<template>
  <div class="content">
    <div class="header">
      <div class="logo"></div>
      <h1>设备设施-新城控股</h1>
      <div class="message">
        <span>iPhone 版本：2.2.0 (build 37)</span>
        <span>Android 版本：2.2.0 (build 37)</span>
      </div>
      <div class="btns">
        <i-button @click="modal_iphone=true">iPhone版下载</i-button>
        <i-button>Android版下载</i-button>
        <div class="download">
          <button
            type="button"
            class="ivu-btn ivu-btn-default"
            @click="useqrcode"
            @mouseover="useqrcode"
            @mouseout="1"
            index="is"
          >
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
    </div>
    <div class="cont_body">
      <h2>版本说明</h2>
      <!-- <Dropdown trigger="click" class="change_version">
        <span>
            请选择版本
            <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
            <DropdownItem>iPhone 版本</DropdownItem>
            <DropdownItem>Android 版本</DropdownItem>
        </DropdownMenu>
      </Dropdown>-->
      <Select v-model="defaultVer" class="change_version" style="width:130px">
        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div class="cont_body_box">
        <drop></drop>
        <drop></drop>
      </div>
    </div>
    <div class="ivu-modal-mask" style="z-index: 1003" v-show="box_WX">
      <div class="content_box">
        <img ref="code_a" src>
        <div class="close">
          <Icon type="md-close" @click="box_WX=false"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>技术支持：北京博锐尚格-MEOS</p>
      <p>© 2016 Persagy. All rights reserved 京ICP备 09030380 号</p>
    </div>
    <Modal
      class="iphone"
      v-model="modal_iphone"
      @on-ok="modal_iphone=false"
      @on-cancel="modal_iphone=false"
      width="354"
      >
      <p>请在手机上打开</p>
      <p>请复制该链接，并在手机上使用浏览器打开，或者通过扫描二维码下载安装。</p>
      <div class="footer">
        <Button type="primary" style="width:100px"  v-clipboard:copy="copyValue" v-clipboard:success="onCopy">复制链接</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import drop from "../base/drop";
import QRCode from "qrcode";
export default {
  data() {
    return {
      isWX: false,
      isAndroid: false,
      isIOS: false,
      isIphone: false,
      codeShow: false,
      box_WX: false,
      modal_iphone: false,//iphone按钮提示弹窗
      copyValue: 'www.baidu.com',
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
    };
  },
  components: {
    drop
  },
  mounted() {
    var u = navigator.userAgent;
    this.isWX = u.indexOf("MicroMessenger") > -1; //微信终端
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.isIphone = u.indexOf("iPhone") > -1; //ios终端

    // console.log(this.$route.params.id);

  },
  methods: {
    //下载apk
    downFile(param) {
      this.$axios({
        responseType: "arraybuffer",
        method: "post",
        url: publicu + "unifier/FNCenterRecordPrePayGridService",
        data: qs.stringify({ jsonString: JSON.stringify(param) }),
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
            data: "text/csv",
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
      })
        .then(url => {
          console.log(url);
          this.$refs.code.src = url;
        })
        .catch(err => {
          console.error(err);
        });
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
@media screen and (max-width: 375px) {
  /* .drop_header{
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      justify-content: center;
    } */
}
.drop_header {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
}
.content {
  padding: 0.1px;
  width: 100%;
  min-width: 9rem;
  background: #f5f5f5;
}
.content .footer {
  width: 100%;
  height: 1.4rem;
  padding: 0.5rem;
  background: #fff;
  text-align: center;
  font-size: 0.14rem;
  color: #555;
}
.content .header {
  width: 100%;
  min-height: 4.5rem;
  padding: 0.7rem 0.1rem 0;
  background: url("../assets/img/banner-bg.jpg") no-repeat center center;
  text-align: center;
  color: #fff;
}
.content .header h1 {
  font-size: 0.4rem;
  margin-top: 0.1rem;
}
.content .header .message {
  font-size: 0.16rem;
  margin: 0.5rem 0 0.67rem;
}
.content .header .message span {
  padding: 0 0.6rem;
}
.content .message span:nth-child(1) {
  border-right: 1px solid #9593cb;
}
.content .header .logo {
  width: 1.32rem;
  height: 1.32rem;
  /* border: 1px solid black; */
  border-radius: 0.23rem;
  margin: 0 auto;
  background: #0b5011;
}
.cont_body {
  position: relative;
  /* max-width: 80%; */
  width: 11rem;
  margin: 0.6rem auto 0;
}
.cont_body .change_version {
  position: absolute;
  top: 0;
  right: 0;
}
.cont_body h2 {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #363f80;
  letter-spacing: 0;
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

/* iphone提示弹窗 */
.iphone {
  text-align: center;
}
.iphone .ivu-icon-ios-alert-outline {
  font-size: 90px;
  color: #ea3715;
}
.iphone .ivu-modal-body {
  padding: .26rem .45rem .23rem;
}
.iphone .ivu-modal-body p {
  font-size: .14rem;
}
.iphone .ivu-modal-footer {
  display: none;
}
.iphone .footer {
  padding-top: .23rem;
}
</style>
