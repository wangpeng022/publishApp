<template>
  <div class="cms">
    <div class="left">
        <div class="logo"></div>
        <div class="add">
            <Icon type="ios-add-circle-outline" />
            <span> 添加新应用</span>
        </div>
        <Menu width="auto">
            <Submenu name="1">
                <template slot="title">
                    MEOS 设备设施
                </template>
                <MenuItem name="1-1">
                设备设施-新城
                </MenuItem>
                <MenuItem name="1-2">设备设施-新城</MenuItem>
                <MenuItem name="1-3">设备设施-新城</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    租户管理系统
                </template>
                <MenuItem name="2-1">租户管理系统-11</MenuItem>
                <MenuItem name="2-2">租户管理系统-22</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    配电管理系统
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">配电管理系统-11</MenuItem>
                    <MenuItem name="3-2">配电管理系统-22</MenuItem>
                    <MenuItem name="3-3">配电管理系统-33</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
    </div>
    <div class="right">
        <!-- <Steps :current="1">
            <Step title="已完成" content="上传安装包"></Step>
            <Step title="进行中" content="填写应用信息"></Step>
            <Step title="待进行" content="完成"></Step>
        </Steps> -->
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
export default {
   data () {
     return {
        showDrawer: false
     }
   },
   components: {

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
        height: 100%;
        padding-left: 3.2rem;
        /* margin: .35rem .35rem 0; */
    } 
 
</style>
