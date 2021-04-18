<template>
  <div class="app-container">
    <header>
      <el-input placeholder="用户名" v-model="searchForm.keyword"></el-input>
      <el-button type="primary" size="mini" @click="getUserList"
        >搜索</el-button
      >
    </header>
    <br />
    <template>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column label="头像" align="center" width="120">
          <template slot-scope="scope">
            <div class="avatar">
              <img :src="scope.row.avatar" v-if="scope.row.avatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
        ></el-table-column>
        <el-table-column prop="mobile" label="用户名"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delAdmin(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getUserList } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      userList: [],
      searchForm: {
        keyword: "",
        type: 0,
      },
    };
  },
  methods: {
    async getUserList() {
      let result = await getUserList(this.searchForm);
      this.userList = result.data.list;
    },

    delAdmin() {
      this.$message({
        message: "您无权删除",
        type: "warning",
      });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  width: 80px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
header {
  display: flex;
  height: 44px;
  align-items: center;
}

header .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>
