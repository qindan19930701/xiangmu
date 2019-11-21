<template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="分类参数"></cus-bread>
     <el-alert class="alert" title="注意：只允许为第三级分类设置参数" type="warning"  show-icon> </el-alert>
    <!-- 级联 -->
     <el-form class="box1" label-position="left" label-width="150px" :model="form" >
     <el-form-item label="请选择商品分类">
       <el-cascader
          clearable
          :show-all-levels="false"
          expand-trigger="hover"
          v-model="selectedOptions"
          :options="options"
          :props="defaultProp"
          @change="handleChange">
       </el-cascader>
     </el-form-item>
     </el-form >
  </el-card>
</template>
<script>
export default {
data(){
  return{
    form:{

    },
    options:[],
    selectedOptions:[],
    defaultProp:{
      label:'cat_name',
      value:'cat_id',
      children:'children'
    },
  }
},
created(){
  this.getGoodsCate()
},
methods:{
  handleChange(){
    console.log("级联被触发了")
  },
  //获取三级分类
  async getGoodsCate(){
    const res=await this.$http.get(`categories?type=3`)
    const {data,meta:{msg,status}}=res.data
    if(status===200){
      this.options=data
    }
  }
},
}
</script>
<style>
.box{
  height: 100%;
}
.alert{
  margin-top: 20px;
}
</style>