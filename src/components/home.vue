<template>
<el-container class="container">
  <el-header><el-row>
  <el-col :span="4"><img src="../assets/logo.png" alt="图片加载失败"></el-col>
  <el-col :span="19" class="maidle"><h2>电商后台管理系统</h2></el-col>
  <el-col :span="1" ><a href="#" class="logout" @click.prevent="handleLoginout()">退出</a></el-col>
</el-row>
</el-header>
  <el-container>
    <el-aside class="aside" width="200px">
       <el-menu
       :unique-opened="true"
       :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      >
      <!-- 1 -->
      <el-submenu :index="v1.order+''" v-for="(v1,i) in menus" :key="i">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{v1.authName}}</span>
        </template>
          <el-menu-item :index="v2.path+''" v-for="(v2,i) in v1.children" :key="i">
            <i class="el-icon-menu"></i>
            {{v2.authName}}
            </el-menu-item>
        </el-submenu>
        <!-- 2 -->
          <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="roles">
            <i class="el-icon-menu"></i>
            角色列表
            </el-menu-item>
            <el-menu-item index="rights">
            <i class="el-icon-menu"></i>
            权限列表
            </el-menu-item>
        </el-submenu> -->
        <!-- 3 -->
          <!-- <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            商品列表
            </el-menu-item>
            <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            分类参数
            </el-menu-item>
            <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            商品分类
            </el-menu-item>
        </el-submenu> -->
        <!-- 4 -->
          <!-- <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
           订单列表
            </el-menu-item>
        </el-submenu> -->
        <!-- 5 -->
          <!-- <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            数据报表
            </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-main class="main"><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data(){
    return{
      menus:[]
    }
  },
  // beforeMount () {
  //   if (!localStorage.getItem('token')) {
  //     this.$router.push({
  //       name: 'login'
  //     })
  //     this.$message.warning('请先登录---')
  //   }
  // },
  methods: {
    handleLoginout () {
      // 1.清除token
      localStorage.clear()
      // 2.跳转到登录界面
      this.$router.push({
        name: 'login'
      })
      // 3.提示
      this.$message.warning('退出成功')
    },
    async getMenus () {
      const res = await this.$http.get(`menus`)

      const {data,meta:{msg,status}} = res.data
      if(status===200){
        this.menus=data
      }
    }
  },
  created () {
    this.getMenus()
  },
}
</script>
<style >
.container{
background: #b3c0d1;
height: 100%;
}

.maidle{
  line-height: 60px;
  text-align: center;
  color: #ffffff;
}
.logout{
  line-height: 60px;
  text-decoration: none;
}
</style>
