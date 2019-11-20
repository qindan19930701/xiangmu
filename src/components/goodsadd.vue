<template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
   <el-alert class="alert" title="添加商品信息" type="info" center show-icon> </el-alert>
     <!-- 步骤条 -->
     <el-steps :active="active*1" align-center>
       <el-step title="基本信息" description=""></el-step>
       <el-step title="商品参数" description=""></el-step>
       <el-step title="商品属性" description=""></el-step>
       <el-step title="商品图片" description=""></el-step>
       <el-step title="商品内容" description=""></el-step>
     </el-steps>
     <!-- 标签页 -->
    <el-form class="box1" label-position="top" label-width="80px" :model="form" >
     <el-tabs v-model="active" tab-position="left" @tab-click="changeTab()">
          <el-tab-pane name="1" label="基本信息">
            <el-form-item label="商品名称">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <!-- 级联选择器
              options 数据来源 -->
              <el-cascader
              clearable
              expand-trigger="hover"
                 v-model="selectedOptions"
                 :options="options"
                 :props="defaultProp"
                 @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品参数">
            <!-- 复选数组 -->
             <el-form-item :label="v1.attr_name"
             v-for="(v1,i) in arrDy" :key="v1.attr_id"
             >
              <el-checkbox-group v-model="v1.attr_vals">
                    <el-checkbox border :label="v2" v-for="(v2,i) in v1.attr_vals" :key="i"></el-checkbox>

             </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品属性">
            <el-form-item :label="v.attr_name" v-for="(v,i) in arrSty" :key="v.attr_id">
              <el-input v-model="v.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="4" label="商品图片">
            <!-- action 服务器目录路径（全路径网址）
            headers{} 请求头 -->
            <el-form-item >
              <el-upload
                action="http://localhost:8888/api/private/v1/upload"
                :headers="headers"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane name="5" label="商品内容"></el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
export default {
data(){
  return{
   active:"1",
   form:{
      goods_name:'',
      goods_cat:'',
      goods_price	:'',
      goods_number:'',
      goods_weight	:'',
      goods_introduce	:'',
      pics	:'',
      attrs:''
    },
    // 级联使用数据
    options:[],
    selectedOptions:[],
    defaultProp:{
      label:'cat_name',
      value:'cat_id',
      children:'children'
    },
    arrDy:[],
    arrSty:[],
    headers:{
      Authorization:localStorage.getItem("token")
    }

  }
},
created(){
this.getGoodsCate()
},
methods:{
  // 获取三级分类
 async getGoodsCate(){
   const res = await this.$http.get(`categories?type=3`)

   const {data,meta:{msg,status}} = res.data
   if (status===200){
     this.options=data
   }
 },
handleChange(){},
async changeTab(){
  if(this.active==="2" || this.active==="3"){
    if(this.selectedOptions.length!==3){
      this.$message.error("请选择三级分类")
      return
    }
    if(this.active==="2"){
      // 获取动态参数数据
    const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
    const {data,meta:{msg,status}} = res.data
    if (status===200){
      this.arrDy=data

      // 此时this.arrDy中的attr_vals是字符串
      this.arrDy.forEach(v =>{

      if(v.attr_vals.length===0){
        v.attr_vals= []
      }else{
      v.attr_vals=  v.attr_vals.trim().split(",")
      }
      })
    }
    }
   if(this.active==="3"){
 // 获取静态数组
    const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
    const {data,meta:{msg,status}} = res.data
    if (status===200){
      this.arrSty=data
      console.log(this.arrSty)
    }
   }

  }
},
// 图片上传相关方法
 handleRemove(file, fileList) {
        console.log(file);
      },
  handleSuccess (response, file, fileList){
console.log(response);
  },
},
}
</script>
<style>
.box{
  height: 100%;
}
.alert{
  margin-top: 20px;
  margin-bottom: 20px;
}
.box1{
  height: 350px;
  overflow: auto;
}
</style>