/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: PC 后台管理 添加应用页
******************************************/
<template>
  <div class="add_app">
    <p class="add_app_title">添加新应用</p>
    <Card class="add_app_body">
      <div class="add_app_center">
        <p class="nextStep_title">名称：</p>
        <Input v-model="newVersionParmer.number" placeholder style="width: 330px;height:40px"/>
        <p class="nextStep_title">应用地址：</p>
        <Input v-model="newVersionParmer.build" placeholder style="width: 330px;height:40px"/>
        <p class="nextStep_title">应用图片：</p>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          multiple
          type="drag"
          action="/api/upload"
          :data="{'jsonString': JSON.stringify([{
            fileName: '11',
            fileSuffix: 'png',
            subdirectory: '/icon'
          }])}"
          style="display: inline-block;width:130px;"
        >
        <div class="upload_box">
          <div class="upload_btn" v-show="!iconUrl">
            <Icon type="ios-add" size="70"/>
            <p>点击上传</p>
          </div>
          <img :src="iconUrl" alt="" v-show="iconUrl">
        </div>

        </Upload>
        <p class="nextStep_title">应用简介（选填）：</p>
        <Input
          v-model="newVersionParmer.remark"
          large
          type="textarea"
          placeholder="请简单介绍该应用"
          style="width: 330px;height:100px"
        />
        <p class="nextStep_title">ios 安装包名：</p>
        <Input v-model="newVersionParmer.number" placeholder style="width: 330px;height:40px"/>
        <p class="nextStep_title">android 安装包名：</p>
        <Input v-model="newVersionParmer.number" placeholder style="width: 330px;height:40px"/>
        <div class="btns" style="text-align:center">
          <Button type="primary" @click="modal_publish=true">完成</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newVersionParmer: {
        appId: "",
        appTypeId: "ios",
        number: "1.0",
        build: "11",
        remark: "123",
        resourceId: ""
      },
      iconUrl: '',
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  components: {},
  methods: {
    handleSuccess(res,file) {
      if (res.result=='success') {
        this.iconUrl = "http://172.16.2.25:8888/saas-version-app/Spring/MVC/entrance/unifier/download?resource=" + res.content[0].id;
      }
      // console.log(res,file,this.iconUrl,'11111');
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:"文件" + file.name + "的格式不正确，请选择后缀名 jpg、jpeg 或 png 的文件。"
      });
    },
  }
};
</script>

<style>
.add_app {
  height: 100%;
  width: 100%;
  padding: 45px 68px 0 20px;
}
.add_app_title {
  position: relative;
  padding: 15px;
  font-size: 20px;
  color: #363f80;
}
.add_app_title::before {
  position: absolute;
  top: 19px;
  left: 0;
  content: "";
  width: 4px;
  height: 20px;
  background: #363f80;
  border-radius: 2px;
}
.add_app_body {
  height: calc(100% - 85px);
  text-align: center;
}
.add_app_body .upload_box{
  width: 130px;
  height: 130px;
}
.add_app_body .upload_box img{
  width: 100%;
}
.add_app_body .upload_btn {
  padding-top: 10px;
  width: 130px;
  height: 130px;
  line-height: 30px;
  color: #c6c6c6;
  background: #f0f0f0;
}
.add_app_body .upload_btn p {
  font-size: 16px;
  color: #717171;
}
.add_app_center {
  /* position: absolute;
  top: 38px;
  left: 50%;
  transform: translateX(-50%); */
  margin: 0 auto;
  text-align: left;
  width: 330px;
}
.add_app_center .ivu-input-default{
  height: 40px;
}
.add_app_center textarea.ivu-input{
  height: 100px;
}
.nextStep_title{
  margin: 30px 0 15px;
  font-size: 16px;
  color: #363F80;
}
.add_app_center .btns .ivu-btn {
  width: 170px;
  height: 32px;
  margin: 39px 0 53px;
}
</style>
