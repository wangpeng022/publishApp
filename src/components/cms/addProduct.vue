/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: PC 后台管理 产品线页
******************************************/
<template>
  <div class="add_app">
    <p class="add_app_title">产品线管理</p>
    <Card class="add_app_body">
      <div class="add_product">
        <Button  type="primary" style="width: 400px;height:40px">新建产品线</Button>
        <div class="item" v-for="item in dataList" :key="item.id">
          <div class="show" v-show="!item.show">
            <span style="display:inline-block;width:370px">{{item.name}}</span>
            <button @click="changeShow(item)">点击</button>
          </div>
          <div class="input" v-show="item.show">
            <input type="text" v-model="item.name" style="width:370px">
            <Icon type="md-checkmark" size="20" style="color:#2D8CF0;cursor:pointer"  @click="changeHide(item)"/>
          </div>
        </div>

      </div>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      itemShow: true,
      dataList:[
        {
          name: '租户管理',
          id: '1',
          show: false
        },
        {
          name: '配电管理',
          id: '2',
           show: false
        },
        {
          name: '冷站管理',
          id: '3',
           show: false
        }
      ]
    };
  },
  components: {},
  methods: {
    changeShow(item){
      // console.log(item.name);
      item.show=true;
      // item.name='啥是啥';
      // console.log(item.name);
    },
    changeHide(item){
      console.log(item);

      item.show=false;
      // item.name='改回来';
            console.log(item);
    }
  },
  mounted () {
  }
};
</script>

<style>
.ivu-message-notice-content{
  padding: 25px 70px;
  min-height: 780px;
}
.add_app {
  height: 100%;
  width: 100%;
  padding: 45px 68px 10px 20px;
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
.add_product{
  width: 400px;
  margin: 0 auto;
}
.add_product .item{
  margin: 30px 0;
  text-align: left;

}
.add_product .item .show{
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #C5C6C5;
}
.add_product .item .input{
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #2D8CF0;
}
.add_product .item .input input{
  outline: none;
  border: none;
}
</style>
