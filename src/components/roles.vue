<template>
  <el-card class="box">
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button type="primary" class="btn">添加角色</el-button>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      roles: []
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
</style>
