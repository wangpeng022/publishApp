/******************************************
* @author: 王鹏(wangpeng022@sina.cn)
* @createDate:2019/3/5
* @Description: PC后台管理页
******************************************/
<template>
  <div class="cms">
    <div class="left">
        <div class="logo"></div>
        <div class="add" @click="addNew">
            <Icon type="ios-add-circle-outline" />
            <span> 添加新应用</span>
        </div>
        <Menu width="auto" style="background: #F0EDF7;" @on-select='menuChange'>
            <Submenu :name="item.id" v-for="item in dataList" :key="item.id">
                <template slot="title">
                    {{item.name}}
                </template>
                <MenuItem v-for="item in item.apps" :key="item.id" :name="item.id">{{item.name}}</MenuItem>
            </Submenu>
        </Menu>
    </div>
    <div class="right">
        <router-view/>
    </div>
    <Drawer title="Basic Drawer" :closable="true" v-model="showDrawer">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
   data () {
     return {
        showDrawer: false,
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
    .cms .left .logo{
        height: .75rem;
        background: url('../assets/img/logo.png') no-repeat;
        background-position: 50% 50%;
    }
    .cms .left .add{
        color: #fff;
        width: 100%;
        height: .76rem;
        line-height: .76rem;
        text-align: center;
        font-size: .18rem;
        background: #374395;
        cursor: pointer;
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
