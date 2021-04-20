<template>
<div class="app-container">
  <div class="singer">
    <header>
      <el-input placeholder="歌星姓名" v-model="searchForm.name"></el-input>
      <el-button type="primary" size="mini" @click="querySinger"
        >搜索</el-button
      >
      <el-button type="primary" size="mini" @click="openModel">添加</el-button>
    </header>
    <div class="contanter">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="name" label="名字"> </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ scope.row.sex ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column prop="hot" label="热度"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" width="40" height="40" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加歌星" :visible.sync="dialogVisible" width="80%">
      <el-form ref="form" :model="singerForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="singerForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="singerForm.sex" placeholder="性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="头像">
          <img
            v-if="singerForm.avatar"
            style="width:32px;height:32px;display:inline-block;"
            :src="singerForm.avatar"
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
import { addEditSinger, querySinger } from "@/api/singer";
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        name: "",
        pageSize:100
      },
      tableData: [],
      singerForm: {
        avatar: "",
        sex: "0",
        name: "",
      },
    };
  },
  methods: {
    reset: function() {
      this.singerForm = {
        avatar: "",
        sex: "0",
        name: "",
      };
    },
    handleClick: function(row) {
      this.singerForm.avatar = row.avatar;
        this.singerForm.sex = row.sex.toString();
      this.singerForm.name = row.name;
      this.singerForm.id = row.id;
      this.openModel();
    },
    openModel: function() {

      this.dialogVisible = true;
    },

    // 添加、编辑歌星用singerForm中是否有id区别
    add: function() {
      this.singerForm.sex = Number(this.singerForm.sex);
      addEditSinger(this.singerForm).then((res) => {
        if (res.code == 1) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.dialogVisible = false;
          this.reset()
          this.querySinger();
        }
      });
    },
    afterUpload(res) {
      this.$message({
        type: "success",
        message: res.msg,
      });
      this.singerForm.avatar = res.url;
      if (res.code == 1) {
        this.singerForm.avatar = res.data.url;
      }
    },
    // 获取歌星列表
    querySinger: function() {
      querySinger(this.searchForm).then((res) => {
        if (res.code == 1) {
          this.tableData = res.data.list;
        }
      });
    },
  },
  created() {
    this.querySinger();
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style scoped>
header {
  display: flex;
  height: 44px;
  align-items: center;
}

header .el-input {
  width: 200px;
  margin-right: 10px;
}
.contanter {
  margin-top: 20px;
}
.avatar-uploader {
  float: right;
}
</style>
