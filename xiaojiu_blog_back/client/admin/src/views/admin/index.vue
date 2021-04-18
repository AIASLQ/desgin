<template>
  <div class="app-container">
    <br />
    <template>
      <el-table :data="adminData" border style="width: 100%">
        <el-table-column label="头像" align="center" width="120">
          <template slot-scope="scope">
            <div class="avatar">
              <img :src="scope.row.avatar" v-if="scope.row.avatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="用户名"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editAdmin(scope.$index, scope.row)"
              >编辑</el-button
            >
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
    <el-dialog title="提示" :visible.sync="isShow" width="60%">
      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="updateForm.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <img
            v-if="updateForm.avatar"
            style="width:32px;height:32px;display:inline-block;"
            :src="updateForm.avatar"
          />
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3333/api/imgs/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <el-button type="text">上传头像</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllAdmin, update } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
      isShow: false,
      adminData: [],
      updateForm: {
        avatar: "",
        mobile: "",
        id: "",
        nickname: "",
        type: 1,
      },
    };
  },
  methods: {
    async getAllAdmin() {
      let result = await getAllAdmin();
      this.adminData = result.data.list;
      console.log(result);
    },
    afterUpload(res) {
      this.$message({
        type: "success",
        message: res.msg,
      });
      if (res.code == 1) {
        this.updateForm.avatar = res.data.url;
      }
    },
    editAdmin(index, row) {
      this.updateForm.avatar = row.avatar;
      this.updateForm.id = row.id;
      this.updateForm.nickname = row.nickname;
      this.updateForm.mobile = row.mobile;
      this.isShow = true;
    },

    async update() {
      await update(this.updateForm);
      this.isShow = false;
      this.getAllAdmin();
    },
    delAdmin() {
      this.$message({
        message: "您无权删除",
        type: "warning",
      });
    },
  },
  created() {
    this.getAllAdmin();
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
</style>
