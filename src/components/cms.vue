<template>
  <div class="cms">
    <div class="logo">MEOS</div>
    <i-Button>添加项目</i-Button>
    <div class="cms_box">
      <Menu>
          <Submenu name="1">
              <template slot="title">
                  <Icon type="ios-paper" />
                  内容管理
              </template>
              <MenuItem name="1-1">文章管理</MenuItem>
              <MenuItem name="1-2">评论管理</MenuItem>
              <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
              <template slot="title">
                  <Icon type="ios-people" />
                  用户管理
              </template>
              <MenuItem name="2-1">新增用户</MenuItem>
              <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
              <template slot="title">
                  <Icon type="ios-stats" />
                  统计分析
              </template>
              <MenuGroup title="使用">
                  <MenuItem name="3-1">新增和启动</MenuItem>
                  <MenuItem name="3-2">活跃分析</MenuItem>
                  <MenuItem name="3-3">时段分析</MenuItem>
              </MenuGroup>
              <MenuGroup title="留存">
                  <MenuItem name="3-4">用户留存</MenuItem>
                  <MenuItem name="3-5">流失用户</MenuItem>
              </MenuGroup>
          </Submenu>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
   data () {
     return {

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
  .cms .logo{
    width: 2.4rem;
    height: 0.8rem;
    background: #a3a3a3;
    font-size: .5rem;
  }
  .cms .cms_box{
    width: 2.4rem;
    height: calc(100% - .8rem);
    background: #a3a3a3
  }
 
</style>
