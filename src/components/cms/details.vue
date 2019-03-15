/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: PC 后台管理 应用详情页
******************************************/
<template>
  <div class="details">
    <div class="header">
      <div class="logo">
        <!-- <img ref="logo" :src="'http://172.16.0.110:8888/saas-version-app/Spring/MVC/entrance/unifier/download?resource='+dataList.picture"> -->
        <img ref="logo">
      </div>
      <div class="header_body">
        <h1>{{dataList.name}}</h1>
        <p>简介：{{dataList.description}}</p>
        <br>
        <p>
          <span>iOS 包名 ：{{dataList.packageName?dataList.packageName.ios:''}}</span>
          <span>Android 包名 ：{{dataList.packageName?dataList.packageName.android:''}}</span>
        </p>
        <p>
          <!-- <span>iOS Key ：f3277aae34abd1e405b68858a4c5849e</span>
          <span>Android Key ：f3277aae34abd1e405b68858a4c5849e</span>-->
          <span>Key ：{{dataList.id}}</span>
        </p>
      </div>
    </div>
    <div class="version">
      <h3>版本管理</h3>
      <div class="upload" @click="newVersion=true">
        <span>上传新版本</span>
        <Icon type="md-cloud-upload"/>
      </div>
      <Card style="margin-bottom: 30px">
        <Tabs>
          <TabPane label="IOS">
            <Table stripe :columns="columnsIOS" :data="dataIOS"></Table>
          </TabPane>
          <TabPane label="Android">
            <Table stripe :columns="columnsAndroid" :data="dataAndroid"></Table>
          </TabPane>
        </Tabs>
      </Card>
      <h3>数据统计</h3>
      <Card class="charts">
        <div class="up">
          <div class="l" ref="chart1"></div>
          <div class="r">
            <Table style="margin:0 85px" stripe :columns="chart_table_columns" :data="chart_table"></Table>
          </div>
        </div>
        <div class="down">
          <div class="l" ref="chart2"></div>
          <div class="r" ref="chart3"></div>
        </div>
      </Card>
    </div>
    <Modal
      class="delete"
      v-model="modal_delete"
      width="580"
      :styles="{top: '2.7rem'}">
      <Icon class="ivu-icon-ios-alert-outline"/>
      <p  class="title">确定删除该版本？</p>
      <p>删除后，该版本信息将不存在，用户无法继续使用</p>
      <div class="delete_btns">
        <Button type='primary' @click="delVersion">删除</Button>
        <Button @click="modal_delete=false">取消</Button>
      </div>
    </Modal>
    <Modal
      class="delete"
      v-model="modal_publish"
      width="580"
      :styles="{top: '2.7rem'}"
    >
      <div class="publish_img"></div>
      <p class="title">确定发布新版本</p>
      <p>安装包名发布后将无法修改</p>
      <div class="delete_btns">
        <Button type='primary' @click="modal_publish=false">发布</Button>
        <Button  @click="modal_publish=false">取消</Button>
      </div>
    </Modal>
    <Drawer
      class="new_version_drawer"
      title="上传新版本"
      v-model="newVersion"
      width="390"
      :mask-closable="true">
      <div class="center" v-if="showUpload">
        <Upload
          multiple
          action="/api/upload"
          :show-upload-list="true"
          :before-upload="handleBefore"
          :data="{'jsonString': JSON.stringify([{
            fileName: '11',
            fileSuffix: 'apk',
            subdirectory: '/abc'
          }])}"
          :format="['ipa','apk']"
          :on-format-error="handleFormatError"
          :on-success="handleSuccess"
        >
          <Button type="primary" icon="md-cloud-upload" ghost>点击上传安装包</Button>
        </Upload>
        <p>* 必须上传，仅支持ipa或apk文件</p>
        <div class="btns">
          <Button type="primary" @click="nextStep" :disabled="!tempPackId">下一步</Button>
          <Button style="margin-right: 8px" @click="newVersion = false">取消</Button>
        </div>
      </div>
      <div class="nextStep" v-else>
        <p class="nextStep_title">版本类型：</p>
        <RadioGroup v-model="newVersionParmer.appTypeId">
          <Radio label="ios">
            <Icon type="logo-apple"></Icon>
            <span>ios</span>
          </Radio>
          <Radio label="android">
            <Icon type="logo-android"></Icon>
            <span>Android</span>
          </Radio>
        </RadioGroup>
        <p class="nextStep_title">版本号：</p>
        <Input v-model="newVersionParmer.number" placeholder="" style="width: 330px;height:40px" />
        <p class="nextStep_title">版本编码：</p>
        <Input v-model="newVersionParmer.build" placeholder="" style="width: 330px;height:40px" />
        <p class="nextStep_title">更新说明（选填）：</p>
        <Input v-model="newVersionParmer.remark" large type="textarea" placeholder="" style="width: 330px;height:100px" />
        <div class="btns">
          <Button type="primary" @click="saveAndPublish">保存并发布</Button>
          <Button style="margin-right: 8px"  @click="newVersion = false;showUpload=true">取消</Button>
        </div>
      </div>
    </Drawer>
    <Drawer
      class="new_version_drawer"
      title="编辑应用信息"
      v-model="editVersion"
      width="390"
      :mask-closable="true">
      <div class="nextStep">
        <p class="nextStep_title">版本类型：</p>
        <RadioGroup v-model="editVersionParmers.appTypeId">
          <Radio label="ios">
            <Icon type="logo-apple"></Icon>
            <span>ios</span>
          </Radio>
          <Radio label="android">
            <Icon type="logo-android"></Icon>
            <span>Android</span>
          </Radio>
        </RadioGroup>
        <p class="nextStep_title">版本号：</p>
        <Input v-model="editVersionParmers.number" placeholder="" style="width: 330px;height:40px" />
        <p class="nextStep_title">版本编码：</p>
        <Input v-model="editVersionParmers.build" placeholder="" style="width: 330px;height:40px" />
        <p class="nextStep_title">更新说明（选填）：</p>
        <Input v-model="editVersionParmers.remark" large type="textarea" placeholder="" style="width: 330px;height:100px" />
        <div class="btns">
          <Button type="primary" @click="saveEditVersion">保存并发布</Button>
          <Button style="margin-right: 8px"  @click="editVersion=false">取消</Button>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import echarts from "echarts";
export default {
  data() {
    return {
      appKey: "",
      dataList: {},
      name: "",
      description: "",

      tempPackId: "", //上传新版本的临时id
      newVersion: false, //右侧抽屉 新版本
      editVersion: false, //右侧抽屉 编辑版本
      editVersionParmers: {}, //编辑版本数据
      selVersionId: '',//删除时选中的版本id
      appTypeId: "ios",
      showUpload: true, //显示抽屉中 上传框 或者 编辑框
      newVersionParmer: {
        appId: '',
        appTypeId: 'ios',
        number: '',
        build: '',
        remark: '',
        resourceId: ''
      },
      columnsIOS: [
        {
          title: "版本",
          key: "number"
        },
        {
          title: "Build",
          key: "build"
        },
        {
          title: "大小",
          key: "size"
        },
        {
          title: "下载次数",
          key: "downloadTimes"
        },
        {
          title: "更新时间",
          key: "updateTime",
          width: 150
        },
        {
          title: "操作",
          key: "action",
          width: 400,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "btn",
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                      console.log(params);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  class: "btn",
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                       this.editVersionBtn(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "IOS客户端下载"
              ),
              h(
                "span",
                {
                  class: "btn",
                  style: {
                    margin: "0 20px",
                    color: "#ED4015"
                  },
                  on: {
                    click: () => {
                      this.selVersionId = params.row.id;
                      this.modal_delete = true;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columnsAndroid: [
        {
          title: "版本",
          key: "number"
        },
        {
          title: "Build",
          key: "build"
        },
        {
          title: "大小",
          key: "size"
        },
        {
          title: "下载次数",
          key: "downloadTimes"
        },
        {
          title: "更新时间",
          key: "updateTime",
          width: 150
        },
        {
          title: "操作",
          key: "action",
          width: 400,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "btn",
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                      console.log(params);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  class: "btn",
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                      this.editVersionBtn(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index);
                    }
                  }
                },
                "Android客户端下载"
              ),
              h(
                "span",
                {
                  class: "btn",
                  style: {
                    margin: "0 20px",
                    color: "#ED4015"
                  },
                  on: {
                    click: () => {
                      this.selVersionId = params.row.id;
                      this.modal_delete = true;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataIOS: [],
      dataAndroid: [],
      modal_delete: false,
      modal_publish: false,
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "20",
          y: "middle",
          orient: "vertical",
          align: "left",
          // itemGap: '15',
          // itemWidth: '18',
          // itemHeight: '18',
          padding: [20, 0],
          data: [
            {
              name: "IOS",
              icon: "circle"
            },
            {
              name: "Android",
              icon: "circle"
            }
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            center: [186, 186],
            color: ["#619FF5", "#6B6BE5", "#E6C248", "#3FB9E3", "#E67C48"],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 335, name: "IOS" }, { value: 310, name: "Android" }]
          }
        ]
      },
      chart_table_columns: [
        {
          title: "机型",
          key: "type"
        },
        {
          title: "用户数",
          key: "num"
        },
        {
          title: "用户占比",
          key: "per"
        }
      ],
      chart_table: [
        {
          type: "iphone",
          num: "70",
          per: "55%"
        },
        {
          type: "Android",
          num: "60",
          per: "55%"
        }
      ],
      option2: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            color: ["#619FF5", "#6B6BE5", "#E6C248", "#3FB9E3", "#E67C48"]
          }
        ]
      },
      uploadData: {}
    };
  },
  components: {},
  watch: {
    $route: "getParameter"
  },
  methods: {
    getParameter() {
      this.appKey = this.$route.query.id;
      if (this.appKey) {
        axios.post("/api/AppGetService",qs.stringify({ jsonString: JSON.stringify({ id: this.appKey }) })).then(res => {
            this.dataList = res.data.content[0];
          })
          .catch(err => console.log(err));
        this.getVersion();
      }
    },
    getVersion() {
      // 版本列表
      axios.post(
          "/api/VersionListService",
          qs.stringify({
            jsonString: JSON.stringify({ appId: this.appKey, appTypeId: "ios" })
          })
        ).then(res => {
          if (res.data.result == "success") {
            this.dataIOS = res.data.content;
          }
          // console.log(res.data.content);
        }).catch(err => console.log(err));
      axios.post(
          "/api/VersionListService",
          qs.stringify({
            jsonString: JSON.stringify({
              appId: this.appKey,
              appTypeId: "android"
            })
          })
        ).then(res => {
          if (res.data.result == "success") {
            this.dataAndroid = res.data.content;
          }
          // console.log(res.data.content);
        })
        .catch(err => console.log(err));
    },
    //上传前的参数
    handleBefore() {
      this.uploadData = qs.stringify({
        jsonString: JSON.stringify({
          fileName: "11",
          fileSuffix: "apk",
          subdirectory: "/abc"
        })
      });
    },
    //上传安装包成功回调
    handleSuccess(res) {
      if (res.result == "success") {
        this.tempPackId = res.content[0].id;
        this.$Message.info("上传成功");
      }
    },
    //上传安装包 格式不对 回调
    handleFormatError() {
      this.$Message.info("格式不正确");
    },
    //下载地址 9fbf20ec-bb25-4f50-a0b1-4720a89150f1
    //http://172.16.2.25:8888/saas-version-app/Spring/MVC/entrance/unifier/download?resource=e250c54b-a299-4c45-84bd-4feb8ca76fbf
//http://172.16.2.25:8888/saas-version-app/Spring/MVC/entrance/unifier/download?resource=9fbf20ec-bb25-4f50-a0b1-4720a89150f1

    //下一步
    nextStep() {
      this.showUpload = false;
    },
    //新版本保存
    saveAndPublish(){
      var parmers = this.newVersionParmer;
      parmers.appId = this.appKey;
      parmers.resourceId = this.tempPackId;
      var hasNull = false;
      this.$Message.config({
            top: 233,
            duration: 3
        });
      Object.keys(parmers).forEach(key=>{
        var item = parmers[key];
        if (!parmers[key]) {
          // console.log(key);
            hasNull = true;
          }
      });
      if (hasNull) {
        this.$Message.info("请填全信息")
          return;
      }
      axios.post("/api/VersionAddService",qs.stringify({
            jsonString: JSON.stringify(parmers)
          })).then(res => {
          if (res.data.result == "success") {
            this.$Message.success("添加版本成功");
            this.newVersion = false;
            this.getParameter();
          }
        })
    },
    //编辑版本信息
    editVersionBtn(params){
      this.editVersionParmers = params
      // console.log(params);
      this.editVersion = true;
    },
    //编辑版本信息 保存
    saveEditVersion(){
      // console.log(this.editVersionParmers);
      this.editVersionParmers.resourceId = this.editVersionParmers.resource;
      axios.post("/api/VersionUpdateService",qs.stringify({
            jsonString: JSON.stringify(this.editVersionParmers)
          })).then(res => {
          if (res.data.result == "success") {
            this.$Message.success("编辑版本成功");
            this.editVersion = false;
            this.getParameter();
          }
        })
    },
    //删除版本
    delVersion(){
      // console.log(this.selVersionId);
      if (!this.selVersionId) {
        return;
      }
      this.editVersionParmers.resourceId = this.editVersionParmers.resource;
      axios.post("/api/VersionRemoveService",qs.stringify({
            jsonString: JSON.stringify({id: this.selVersionId})
          })).then(res => {
          if (res.data.result == "success") {
            this.$Message.success("删除版本成功");
            this.modal_delete = false;
            this.getParameter();
          }
        })
    }


  },
  mounted() {
    this.getParameter();

    var chart1 = echarts.init(this.$refs.chart1);
    chart1.setOption(this.option);

    var chart2 = echarts.init(this.$refs.chart2);
    chart2.setOption(this.option);

    var chart3 = echarts.init(this.$refs.chart3);
    chart3.setOption(this.option2);
  }
};
</script>

<style>
.details {
  /* margin: .35rem .5rem 0 0; */
  padding-top: 0.35rem;
  padding-right: 0.35rem;
}
.details .header {
  padding-bottom: 0.2rem;
  width: 100%;
  min-width: 9.1rem;
  height: 1.8rem;
  border-bottom: 1px solid #d4d6eb;
}
.details .logo {
  width: 1.6rem;
  height: 100%;
  background: lightblue;
  border-radius: 0.15rem;
}
.details .header .logo,
.details .header .header_body {
  display: inline-block;
  vertical-align: top;
}
.details .header .header_body {
  padding-left: 0.29rem;
  padding-top: 0.07rem;
  font-family: PingFangSC-Regular;
}
.details .header .header_body h1 {
  font-size: 0.3rem;
  color: #363f80;
}
.details .header .header_body p {
  font-size: 0.14rem;
  color: #717171;
  line-height: 20px;
}

.details .version {
  position: relative;
  padding-top: 0.25rem;
}
.details .version .upload {
  position: absolute;
  top: 0.25rem;
  right: 0.05rem;
  color: #3651bf;
  cursor: pointer;
}
.details .version .btn:hover {
  color: #2781ee;
  cursor: pointer;
}
.details .upload span {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  letter-spacing: 0;
}
.details .upload i {
  font-size: 0.24rem;
}
.details .version h3 {
  position: relative;
  padding-left: 0.15rem;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #363f80;
}
.details .version h3::before {
  position: absolute;
  top: 0.05rem;
  left: 0;
  content: "";
  width: 0.04rem;
  height: 0.2rem;
  background: #363f80;
  border-radius: 0.02rem;
}
/* 去掉表格边框 */
.version .ivu-table-wrapper,
.version .ivu-table td,
.version .ivu-table th {
  border: none;
}
.version .ivu-table:before,
.version .ivu-table:after {
  width: 0;
}

/* 删除弹窗 */
.delete {
  text-align: center;
}
.delete .ivu-icon-ios-alert-outline {
  font-size: 90px;
  color: #ea3715;
}
.delete .ivu-modal-body {
  padding-top: 0.6rem;
}
.delete .ivu-modal-body p {
  font-size: 0.13rem;
  color: #6D6D6D;
}
.delete .ivu-modal-body p.title{
  font-size: 0.14rem;
  color: #3E3E3E;
}
.delete .ivu-modal-footer{
  display: none;
}
.delete .delete_btns {
  padding-top: 0.4rem;
  padding-bottom: 0.6rem;
  border-top: none;
  text-align: center;
}
.delete .delete_btns button {
  width: 1.2rem;
  margin: 0 0.15rem;
}
.delete .delete_btns .ivu-btn-text {
  border: 1px solid #c0c0c0;
}
.delete .publish_img{
  display: inline-block;
  margin-bottom: 16px;
  width: 70px;
  height: 82px;
  background: url("../../assets/img/publish.png") no-repeat;
  background-size: 100%;
}
/* 上传新版本抽屉 */
.new_version_drawer .center {
  text-align: center;
  position: absolute;
  top: 50%;
  width: calc(100% - 0.32rem);
  transform: translateY(-50%);
}
.new_version_drawer .ivu-drawer-body{
  padding: 30px;
}
.new_version_drawer .nextStep {
}
.nextStep_title{
  font-size: 16px;
  color: #363F80;
  padding: 14px 0;
}
.new_version_drawer .center .btns {
  margin-top: 0.6rem;
}
.new_version_drawer .btns button {
  width: 1.2rem;
  margin: 0 0.15rem;
  font-size: 0.14rem;
}
.new_version_drawer .center p {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #eb944f;
  text-align: center;
  margin-top: 0.2rem;
}
.new_version_drawer .center .ivu-icon-md-cloud-upload {
  font-size: 22px;
  line-height: 1;
}
/* 图表 */
.charts {
  width: 100%;
  height: 9.82rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.charts .up {
  border-bottom: 1px solid #e7e7e7;
}
.charts .up,
.charts .down {
  height: 3.75rem;
  /* flex: 1; */
  display: flex;
  flex-direction: row;
  /* background: #2781ee; */
}
.charts .up .l,
.charts .down .l {
  width: 5.3rem;
  border-right: 1px solid #e7e7e7;
}
.charts .up .r,
.charts .down .r {
  width: 9rem;
}
</style>
