<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>

</el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="seartBox">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="searchInput">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <!-- 添加按钮 -->
  <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
     <el-table
      :data="list"
      style="width: 100%">

      <el-table-column
        prop="id"
        label="#"
        width="80">
      </el-table-column>
       <el-table-column
        prop="username"
        label="姓名"
        width="120">
      </el-table-column>
       <el-table-column
        prop="email"
        label="邮箱"
        width="140">
      </el-table-column>
       <el-table-column
        prop="mobile"
        label="电话"
        width="140">
      </el-table-column>
       <el-table-column
        prop="create_time"
        label="创建日期"
        width="140">
        <template slot-scope="scope">
          {{scope.row.create_time | time}}
        </template>
      </el-table-column>
       <el-table-column
        prop="mg_state"
        label="用户状态"
        width="140">
        <template slot-scope="scope">
          <el-switch
  v-model="scope.row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
        </template>
      </el-table-column>
       <el-table-column
        prop="name"
        label="操作"
        width="200">
      </el-table-column>

    </el-table>
    <!-- 分页 -->
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      list: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取数据
    async getTableData () {
      const token = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data, meta: {msg, status}} = res.data
      if (status === 200) {
        this.list = data.users
        console.log(this.list)
        console.log(msg)
      }
    }

  }
}
</script>
<style>
.box{
  height: 100%;
}
.seartBox{
  margin-top: 20px;
}
.searchInput{
  width: 350px;
}
</style>
