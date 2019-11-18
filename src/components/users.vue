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
        <el-input
          @clear="getAll()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="searchInput"
        >
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button type="success" @click.prevent="showAdd()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="140">
        <template slot-scope="scope">{{scope.row.create_time | time}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch @change=changeSta(scope.row) v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click.prevent="showEdit(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button
            @click.prevent="showDele(scope.row)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
          ></el-button>
          <el-button @click.prevent="showDia(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框 添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisibleAdd = false"
          @click.prevent="addUser()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input disabled v-model="formdata.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisibleEdit = false"
          @click.prevent="editUser()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色管理对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
  <el-form :model="formdata">
    <el-form-item label="用户名" >
    {{formdata.username}}
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="selectVal" placeholder="请选择角色名">
        <el-option label="请选择" :value="-1" disabled></el-option>
        <el-option v-for="(v,i) in roles" :key="i" :label="v.roleName" :value="v.id" ></el-option>

      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="set()">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      list: [],
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      formdata: {
        username: '',
        password: '',
        email: '',
        mobile: ''

      },
      selectVal: -1,
      currUserId: -1,
      roles: []
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
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      const {
        data,
        meta: { msg, status }
      } = res.data
      console.log(msg)
      if (status === 200) {
        this.list = data.users
        this.total = data.total
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = 1
      this.pagesize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getTableData()
    },
    searchUser () {
      this.pagenum = 1
      this.getTableData()
    },
    getAll () {
      this.getTableData()
    },
    showAdd () {
      this.dialogFormVisibleAdd = true
      this.formdata = {}
    },
    async addUser () {
      const res = await this.$http.post(`users`, this.formdata)

      const {
        meta: { msg, status }

      } = res.data
      console.log(msg)
      if (status === 201) {
        this.dialogFormVisibleAdd = false
        this.getTableData()
      }
    },
    showDele (user) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${user.id}`)
          const {
            meta: { msg, status }
          } = res.data
          if (status === 200) {
            this.$message.success(msg)
            this.getTableData()
            this.pagenum = 1
          }
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    showEdit (user) {
      this.formdata = user
      this.dialogFormVisibleEdit = true
    },
    async editUser () {
      const res = await this.$http.put(`users/${this.formdata.id}`, this.formdata)
      const {meta: {msg, data}} = res.data
      console.log(data)
      if (status === 200) {
        this.$message.success(msg)
        this.getTableData()
        this.dialogFormVisibleEdit = false
      }
    },
    async changeSta (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
    },
    async showDia (user) {
      this.formdata = user
      this.dialogFormVisibleRole = true
      const res = await this.$http.get(`roles`)
      this.currUserId = user.id
      this.roles = res.data.data
      const res2 = await this.$http.get(`users/${user.id}`)
      console.log(res2)
      this.selectVal = res2.data.data.rid
    },
    async set () {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.selectVal
      })
      console.log(res)
      const {meta: {msg, status}} = res.data
      console.log(msg)
      if (status === 200) {
        this.dialogFormVisibleRole = false
      }
    }
  }
}
</script>
<style>
.box {
  height: 100%;
}
.seartBox {
  margin-top: 20px;
}
.searchInput {
  width: 350px;
}
.page {
  margin-top: 20px;
}
</style>
