<template>
  <el-card class="box">
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button type="primary" class="btn">添加角色</el-button>
      <!-- 表格 -->
    <el-table height="380px" :data="roles" style="width: 100%">
      <el-table-column type="expand"  width="80">
        <template slot-scope="scope">
          <!-- 行列布局 -->
          <el-row class="level1" v-for="(v1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag type="success" closable @close="deleRight(scope.row,v1)">{{v1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i></el-col>
            <el-col :span="20">
              <el-row class="level2" v-for="(v2,i) in v1.children" :key="i">
                <el-col :span="4">
                  <el-tag type="waring" closable @close="deleRight(scope.row,v2)">{{v2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i></el-col>
                <el-col :span="20">
                  <el-tag @close="deleRight(scope.row,v3)" closable type="info" class="level3" v-for="(v3,i) in v2.children" :key="i" >{{v3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <el-col><span>未分配权限</span></el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>

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
          <el-button @click.prevent="showRight(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- data 数据来源
      node-key 每个节点唯一标识
      :default-checked-keys []默认选中
      :default-expanded-keys[] 默认展开
      :props 配置选中{label/children} -->
          <el-tree
          :data="treelist"
          default-expand-all
          show-checkbox
          node-key="id"
          :default-expanded-keys="arrExpanded"
          :default-checked-keys="arrCheck"
          :props="defaultProps">
        </el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      roles: [],
      dialogFormVisible: false,
      treelist: [],
      arrCheck: [],
      arrExpanded: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    async getRoles () {
      const res = await this.$http.get(`roles`)
      console.log(res)
      const {data, meta: {msg, status}} = res.data
      console.log(msg)
      if (status === 200) {
        this.roles = data
      }
    },
    async showRight (role) {
      this.dialogFormVisible = true
      const res = await this.$http.get(`rights/tree`)
      console.log(res)
      const {data, meta: {msg, status}} = res.data
      console.log(msg)
      if (status === 200) {
        this.treelist = data
        // 嵌套遍历取id
        // const temp = []
        // this.treelist.forEach(item1 => {
        //   temp.push(item1.id)
        //   item1.children.forEach(item2 => {
        //     temp.push(item2.id)
        //     item2.children.forEach(item3 => {
        //       temp.push(item3.id)
        //     })
        //   })
        // })
        // this.arrExpanded = temp
        // 获取当前角色的权限id
        // console.log(role)
        const temp2 = []
        role.children.forEach(item1 => {
          // temp2.push(item1.id)
          item1.children.forEach(item2 => {
            // temp2.push(item2.id)
            item2.children.forEach(item3 => {
              temp2.push(item3.id)
            })
          })
        })
        this.arrCheck = temp2
        // console.log(temp2)
      }
    },
    async deleRight (role, rights) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rights.id}`)
      console.log(res)
      const {data, meta: {msg, status}} = res.data
      console.log(data)
      if (status === 200) {
        this.$message.success(msg)
        // this.getRoles()
        // 只更新当前的角色权限
        role.children = data
      }
    }
  }
}
</script>
<style>
.box{
  height: 100%;
}
.btn{
  margin-top: 20px;
}
.level1{
  margin-bottom: 10px;
}
.level2{
  margin-bottom: 10px;
}
.level3{
  margin-bottom: 10px;
}
</style>
