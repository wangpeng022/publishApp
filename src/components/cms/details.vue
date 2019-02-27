<template>
  <div class="details">
    <div class="header">
      <div class="logo">
        <img src alt>
      </div>
      <div class="header_body">
        <h1>设备设施-新城控股</h1>
        <p>简介：这里是产品的简介，内容平铺，一行显示</p>
        <br>
        <p>
          <span>iOS 包名 ：com.persagy.meos</span>
          <span>Android 包名 ：com.persagy.app</span>
        </p>
        <p>
          <span>iOS Key ：f3277aae34abd1e405b68858a4c5849e</span>
          <span>Android Key ：f3277aae34abd1e405b68858a4c5849e</span>
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
            <Table stripe :columns="columnsAndroid" :data="dataIOS"></Table>
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
      @on-ok="modal_delete=false"
      @on-cancel="modal_delete=false"
      width="580"
      :styles="{top: '2.7rem'}">
      <Icon class="ivu-icon-ios-alert-outline"/>
      <p>确定删除该版本？</p>
      <p>删除后，该版本信息将不存在，用户无法继续使用</p>
    </Modal>
    <Drawer
      class="new_version_drawer"
      title="上传新版本"
      v-model="newVersion"
      width="390"
      :mask-closable="true"
    >
      <div class="center">
        <Upload action="//jsonplaceholder.typicode.com/posts/" :show-upload-list="true">
          <Button type="primary" icon="md-cloud-upload" ghost>点击上传安装包</Button>
        </Upload>
        <p>* 必须上传，仅支持ipa或apk文件</p>
        <div class="btns">
          <Button type="primary" @click="newVersion = false">保存并发布</Button>
          <Button style="margin-right: 8px" @click="newVersion = false">取消</Button>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      name: false,
      newVersion: false,
      columnsIOS: [
        {
          title: "版本",
          key: "version"
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
          key: "count"
        },
        {
          title: "更新时间",
          key: "time"
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
                      // this.show(params.index);
                      // this.modal_delete = true;
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
                      // this.show(params.index);
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
          key: "version"
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
          key: "count"
        },
        {
          title: "更新时间",
          key: "time"
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
                      // this.show(params.index);
                      // this.modal_delete = true;
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
                      // this.show(params.index);
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
      dataIOS: [
        {
          version: "1.0",
          build: "333",
          size: "15.2k",
          count: "22",
          time: "2019-1-2"
        },
        {
          version: "1.0",
          build: "333",
          size: "15.2k",
          count: "22",
          time: "2019-1-2"
        },
        {
          version: "1.0",
          build: "333",
          size: "15.2k",
          count: "22",
          time: "2019-1-2"
        }
      ],
      dataAndroid: [],
      modal_delete: false,
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
            color: ["#619FF5", "#6B6BE5", "#E6C248", "#3FB9E3", "#E67C48"],
          }
        ]
      }
    };
  },
  components: {},
  mounted() {
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
  font-size: 0.14rem;
}
.delete .ivu-modal-footer {
  padding-top: 0.2rem;
  padding-bottom: 0.6rem;
  border-top: none;
  text-align: center;
}
.delete .ivu-modal-footer button {
  width: 1.2rem;
  margin: 0 0.15rem;
}
.delete .ivu-modal-footer .ivu-btn-text {
  border: 1px solid #c0c0c0;
}
/* 上传新版本抽屉 */
.new_version_drawer .center {
  text-align: center;
  position: absolute;
  top: 50%;
  width: calc(100% - 0.32rem);
  transform: translateY(-50%);
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
.new_version_drawer .center .ivu-icon {
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
  border-right: 1px solid #E7E7E7;
}
.charts .up .r,
.charts .down .r {
  width: 9rem;
}
</style>
