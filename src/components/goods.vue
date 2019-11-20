<template>
  <el-card class="box">
<cus-bread level1="商品管理" level2="商品列表"></cus-bread>
<el-row>
  <el-col>
    <el-input

          clearable
          placeholder="请输入内容"
          v-model="query"
          class="searchInput"
        >
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button type="success" >添加商品</el-button>
 </el-col>
</el-row>
<el-table height="350px" :data="list" style="width: 100%">
  <el-table-column prop="index" label="#" width="80"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column label="创建日期" width="100">
        <template slot-scope="scope">{{scope.row.add_time | time}}</template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button

            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
          ></el-button>
          <el-button  type="success" icon="el-icon-check" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
</el-table>
  </el-card>
</template>
<script>
export default {
data(){
  return{
    query:'',
    list:[]
  }
},
created(){
this.getData()
},
methods:{
  async getData() {
    const res = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
    console.log(res)
    const {data,meta:{msg,status}}= res.data
    if(status===200){
      this.list=data.goods
    }
  }
}
}
</script>
<style>
.box{
  height: 100%;
}
.searchInput{
  margin-top: 20px
}
.searchInput{
  width: 350px;
}
</style>