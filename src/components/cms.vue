/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: PC后台管理页
******************************************/
<template>
  <div class="cms">
    <div class="left">
        <div class="logo"></div>
        <div class="add_button">
            <div class="add" @click="addNew">
                <i>+</i>
                <span> 产品线</span>
            </div>
            <div class="add" @click="addNew">
                <Icon type="ios-add-circle-outline" />
                <span> 应用</span>
            </div>
        </div>
        <Menu width="auto" style="background: #F0EDF7;" active-name="0" @on-select='menuChange'>
            <Submenu :name="item.id" v-for="item in dataList" :key="item.id">
                <template slot="title">
                    {{item.name}}
                </template>
                <MenuItem v-for="item in item.apps" :key="item.id" :name="item.id">
                <span class="icon_logo"></span>
                {{item.name}}
                </MenuItem>
            </Submenu>
        </Menu>
    </div>
    <div class="right">
        <router-view/>
    </div>
    <!-- <Drawer title="Basic Drawer" :closable="true" v-model="showDrawer">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer> -->
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
   data () {
     return {
        // showDrawer: false,
        dataList: []
     }
   },
   components: {

   },
   methods: {
       addNew(){
           this.$router.push('/cms/addNew')
       },
       menuChange(id){
        console.log(id);
        this.$router.push({ path: '/cms/details', query: { id }});

       }
   },
   mounted(){
    axios.post('/api/AppListService',qs.stringify({"jsonString": JSON.stringify({})})).then(res=>{
      var result = res.data.content;
    //   console.log(result);
      this.dataList = result
    }).catch(err=>console.log(err));
   }
}
</script>

<style>
    .cms{
        height: 100%;

    }
    .cms .left{
        position: fixed;
        width: 2.7rem;
        height: 100%;
        background: #F0EDF7;
        border-right: 1px solid #D4D6EB;
    }
    .cms .left .ivu-menu-item{
        position: relative;
        padding-left: 77px!important;
    }
    .cms .left .ivu-menu-item .icon_logo{
        position: absolute;
        top: 50%;
        left: 41px;
        transform: translateY(-50%);
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #374395;

    }
    .cms .left .logo{
        height: .75rem;
        background: url('../assets/img/logo.png') no-repeat;
        background-position: 50% 50%;
    }
    .cms .left .add_button{
        color: #fff;
        width: 100%;
        height: .76rem;
        line-height: .76rem;
        text-align: center;
        font-size: .18rem;
        background: #374395;
        cursor: pointer;
    }
    .cms .left .add{
        display: inline-block;
        width: 132px;
    }
    .cms .left .add:hover{
        background: #434e97
    }
    .cms .right{
        min-height: 100%;
        padding-left: 3.2rem;
        background: #f7f7fd;
    }

</style>
