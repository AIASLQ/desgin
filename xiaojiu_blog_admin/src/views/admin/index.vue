<template>
  <div class="app-container">
    <el-alert :closable="false" title="新增管理员" />
    <br />
    <template>
      <el-table :data="adminData"  border style="width: 100%">
        <el-table-column label="头像" align='center' width="120" >
          <template slot-scope="scope">
            <div class="avatar">
              <img :src="scope.row.avatar">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align='center' ></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作"  width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editAdmin(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delAdmin(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {getAllAdmin} from '@/api/user'
export default {
  components: {},
  data() {
    return {
      adminData: [],
    };
  },
  methods:{
    async getAllAdmin(){
      let result = await getAllAdmin()
      this.adminData = result.data
      console.log(result)
    },
    editAdmin(){
      this.$message({
          message: '您无权编辑',
          type: 'warning'
        });
    },
    delAdmin(){
      this.$message({
          message: '您无权删除',
          type: 'warning'
        });
    }
  },
  created() {
    this.getAllAdmin()
  }
};
</script>
<style lang='scss' scoped>
.avatar{
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px dashed #ccc;
  img{
    width: 100%;
  }
}
</style>