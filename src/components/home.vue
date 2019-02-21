<template>
  <div class="content">
    <div class="header">
      <div class="logo"></div>
      <h2>设备设施-新城控股</h2>
      <div class="message">
        <span>版本：1.1.1</span>
        <span>更新时间：2018-1-1</span>
      </div>
      <div class="btns">
        <i-button>IOS客户端下载</i-button>
        <i-button>Android客户端下载</i-button>
        <div class="download">
          <button type="button" class="ivu-btn ivu-btn-default" @click="useqrcode" index="is"><span index="is">二维码下载</span></button>
          <div class="code" index='is' v-show="codeShow">
            <!-- <canvas id="canvas"></canvas> -->
            <div class="img"  index='is'>
              <img ref="code" id="code_img"  index='is' src alt>
              <!-- <div class="icon"></div> -->
            </div>
            <i-button style="width:1.5rem" @click="saveCode('code')">保存二维码</i-button>
          </div>
        </div>
      </div>
    </div>
    <div class="cont_body">
      <h2>版本说明</h2>
      <div class="cont_body_box">
        <drop></drop>
        <drop></drop>
      </div>
    </div>
  </div>
</template>

<script>
import drop from "../base/drop";
import QRCode from "qrcode";
export default {
  data() {
    return {
      codeShow: false
    };
  },
  components: {
    drop
  },
  mounted() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    console.log(u);
    // alert(u);
    document.body.addEventListener('click',(e)=>{
      console.log(e.target.getAttribute('index'));
      var key = e.target.getAttribute('index')||false;
        if(key!='is'){
          this.codeShow = false;
        }
    })
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
      this.codeShow = !this.codeShow;
      if (!this.codeShow) {
        return;
      }
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
        rendererOpts: {
          quality: 0.3
        }
      };
      QRCode.toDataURL(this.QueryDetail, opts)
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
        elink.download = '123';
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

  }
};
</script>

<style>
@media screen and (max-width: 375px) {
    body {
        /* background-color:lightblue; */
    }
}
.content {
  padding: 0.1px;
  width: 100%;
}
.header {
  width: 100%;
  min-height: 3.6rem;
  padding: 0.5rem 0.1rem 0;
  background: #e4e4e4;
  text-align: center;
}
.logo {
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid black;
  margin: 0 auto;
}
.cont_body {
  max-width: 80%;
  margin: 0 auto;
}
.btns {
}
.btns .download {
  position: relative;
  display: inline-block;
}
.btns .ivu-btn.ivu-btn-default {
  width: 1.9rem;
  background: #8b8989;
  color: #fff;
}
.btns .code {
  position: absolute;
  /* display: none; */
  right: 0;
  top: 0.35rem;
  width: 2rem;
  height: 2.3rem;
  background: #8b8989;
  padding: 0.2rem 0.2rem 0;
}
.btns .code .img {
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid #000;
}
.btns .code .img img {
  padding-top: 0.05rem;
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
</style>
