<template>
  <div class="app-container">
    <div class="singer">
      <header @click.stop="sideIsshow = false">
        <el-input placeholder="歌曲集" v-model="searchForm.name"></el-input>
        <el-button type="primary" size="mini" @click="queryList"
          >搜索</el-button
        >
        <el-button type="primary" size="mini" @click="openModel"
          >添加</el-button
        >
      </header>
      <div class="contanter">
        <!-- 歌曲集列表 -->
        <div
          class="item"
          v-for="(item, index) in tableData"
          :key="index"
          @click="sideOpen(item)"
        >
          <div class="delete" @click="deleteItem(item)">
            删除
          </div>
          <div class="update">编辑</div>
          <img class="coverUrl" :src="item.coverUrl" />
          <div class="name" @click.stop>
            {{ item.name }}
          </div>
        </div>
      </div>

      <el-dialog title="添加歌曲集" :visible.sync="dialogVisible" width="60%">
        <el-form ref="form" :model="songForm" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="songForm.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <img
              v-if="songForm.coverUrl"
              style="width:32px;height:32px;display:inline-block;"
              :src="songForm.coverUrl"
            />
            <el-upload
              class="avatar-uploader"
              :action="'http://localhost:3333/api/imgs/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <el-button type="text">上传封面图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <Children
      @hidden="hidden"
      :songbookId="songbookId"
      :songbookName="songbookName"
      v-if="sideIsshow"
    ></Children>
  </div>
</template>

<script>
import { create, update, list, del } from "@/api/songBook";
import Children from "./childen";
export default {
  components: { Children },
  data() {
    return {
      sideIsshow: false,
      songbookId: 0,
      songbookName: "",
      dialogVisible: false,
      searchForm: {
        name: "",
        pageSize: 100
      },
      tableData: [],
      songForm: {
        coverUrl: "",
        name: "",
      },
    };
  },
  methods: {
    hidden: function() {
      this.sideIsshow = false;
    },
    deleteItem: function(item) {
      debugger;
      del({
        id: item.id,
      }).then((res) => {
        if (res.code == 1) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.dialogVisible = false;
          this.queryList();
        }
      });
    },
    sideOpen: function(item) {
      this.songbookId = item.id;
      this.songbookName = item.name;
      this.sideIsshow = true;
    },
    reset: function() {
      this.songForm = {
        coverUrl: "",
        name: "",
      };
    },
    handleClick: function(row) {
      this.songForm.coverUrl = row.coverUrl;
      this.songForm.name = row.name;
      this.songForm.id = row.id;
      this.openModel();
    },
    handleDelete: function(row) {
      this.songForm.id = row.id;
      this.queryList();
    },
    openModel: function() {
      this.dialogVisible = true;
    },

    // 添加歌曲集
    add: function() {
      create(this.songForm).then((res) => {
        if (res.code == 1) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.dialogVisible = false;
          this.reset();
          this.queryList();
        }
      });
    },
    afterUpload(res) {
      this.$message({
        type: "success",
        message: res.msg,
      });
      this.songForm.coverUrl = res.url;
      if (res.code == 1) {
        this.songForm.coverUrl = res.data.url;
      }
    },
    // 获取歌曲集列表
    queryList: function() {
      list(this.searchForm).then((res) => {
        if (res.code == 1) {
          this.tableData = res.data.list;
        }
      });
    },
  },
  created() {
    this.queryList();
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style scoped lang="scss">
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
  .item {
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
    .delete {
      position: absolute;
      top: 0;
      display: none;
    }
    .update {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
    }
    &:hover {
      .delete {
        display: block;
      }
      .update {
        display: block;
      }
    }

    img {
      display: block;
      width: 100%;
      height: 180px;
    }
    .name {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      overflow: hidden;
      text-align: center;
    }
  }
}
.avatar-uploader {
  float: right;
}
</style>
