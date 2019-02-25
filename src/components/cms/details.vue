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
      <Card>
        <Tabs>
          <TabPane label="IOS">
            <Table stripe :columns="columns" :data="dataIOS"></Table>
          </TabPane>
          <TabPane label="Android">
            <Table stripe :columns="columns" :data="dataAndroid"></Table>
          </TabPane>
        </Tabs>
      </Card>
      <!-- <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
      </Tabs>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
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
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 20px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
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
                      this.show(params.index);
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
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 20px",
                    color: '#ED4015'
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "删除"
              ),
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
      dataAndroid: []
    };
  },
  components: {}
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
  padding-top: 0.25rem;
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
.version .ivu-table-wrapper {
  border: none;
}
.version .ivu-table:before,
.version .ivu-table:after {
  width: 0;
}
</style>
