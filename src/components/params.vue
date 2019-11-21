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
     <el-tabs type="border-card" v-model="active">
          <el-tab-pane name="1" label="动态参数">
            <el-button disabled="">设置动态参数</el-button>
             <el-table
      height="450px"
      border
      stripe

      :data="arrDy"
      style="width: 100%">
    <!-- 展开 -->
    <el-table-column type="expand" width="100">
      <template slot-scope="scope">
         <!-- 动态tag编辑 -->
         <el-tag
                  :key="i"
                  v-for="(v,i) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row,v)">
                  {{v}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
      type="index" label="#" width="100">
      </el-table-column>

      <el-table-column
        prop="attr_name"
        label="属性名称"
        width="300"
        >
      </el-table-column>

      <el-table-column
        label="操作" width="100">
        <template slot-scope="scope">
        <el-button  plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button  plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
  </el-table>
          </el-tab-pane>
          <el-tab-pane name="2" label="静态参数">静态参数</el-tab-pane>

    </el-tabs>
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
    active:"1",
    arrDy:[],
     inputVisible: false,
      inputValue: ''
  }
},
created(){
  this.getGoodsCate()
},
methods:{
 async handleChange(){
    if(this.selectedOptions.length!==3){
      this.$message.warning("请选择三级分类")
      return
    }
    //获取动态数据
const res= await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
 const {data,meta:{msg,status}}=res.data
 if(status===200){
   this.arrDy=data
   this.arrDy.forEach(v=>{
     v.attr_vals=v.attr_vals.trim().length===0 ? [] : v.attr_vals.trim().split(",")
   })

 }

 },
  //获取三级分类
  async getGoodsCate(){
    const res=await this.$http.get(`categories?type=3`)
    const {data,meta:{msg,status}}=res.data
    if(status===200){
      this.options=data
    }
  },
  //  动态tag的相关方法
 async handleClose(obj,v) {
        obj.attr_vals.splice(obj.attr_vals.indexOf(v), 1);
        const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,{
          attr_name:obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals:obj.attr_vals.join(",")
        })
},

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm(obj) {
        let inputValue = this.inputValue;
        if (inputValue) {
          obj.attr_vals.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>