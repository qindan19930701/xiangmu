<template>
  <el-card>
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
    <el-alert class="alert" title="添加商品信息" type="info" center show-icon> </el-alert>
        <!-- 步骤条 -->
     <el-steps :active="active" align-center>
       <el-step title="基本信息" description=""></el-step>
       <el-step title="商品参数" description=""></el-step>
       <el-step title="商品属性" description=""></el-step>
       <el-step title="商品图片" description=""></el-step>
       <el-step title="商品内容" description=""></el-step>
     </el-steps>

  </el-card>
</template>
<script>
export default {
data(){
  return{
    active:2
  }
},
}
</script>
<style>
.alert{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>