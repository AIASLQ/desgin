<template>
  <div class="app-container">
    <header>
      <el-input placeholder="歌曲" v-model="searchForm.keyword"></el-input>
      <el-button type="primary" size="mini" @click="getMusicList"
        >搜索</el-button
      >
      <el-button type="primary" size="mini" @click="addEdit(1)">添加</el-button>
    </header>
    <div class="table">
      <!-- 歌曲列表 -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="歌曲"></el-table-column>
        <el-table-column prop="singerName" label="歌手"></el-table-column>
        <el-table-column prop="typeName" label="类别"></el-table-column>
        <el-table-column prop="count" label="热度"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="addEdit(2, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="removed(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增编辑分类 dialog -->
    <el-dialog
      :title="type === 1 ? '新增歌曲' : '编辑歌曲'"
      :visible.sync="visible"
      :before-close="handleClose"
      width="80%"
    >
      <el-form :model="form">
        <el-form-item label="歌曲名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别">
              <el-select v-model="form.typeId" placeholder="歌曲类别">
                <el-option
                  v-for="(item, index) in classData"
                  :key="index"
                  :label="item.className"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="歌手">
              <el-select v-model="form.singerId" placeholder="歌手姓名">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in singers"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="音乐" class="up">
          <audio
            :src="form.url"
            autoplay="autoplay"
            controls
            v-if="form.url"
            controlsList="nodownload"
          ></audio>
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3333/api/music/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <el-button type="text">上传音乐</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面图">
          <img
            v-if="form.coverImg"
            style="width:32px;height:32px;display:inline-block;"
            :src="form.coverImg"
          />
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3333/api/imgs/upload'"
            :show-file-list="false"
            :on-success="afterUploadImg"
          >
            <el-button type="text">上传封面图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.desc"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addEdit, getAllClass } from "@/api/classIfy";
import { queryAll } from "@/api/singer";

import { queryList, musicAdd, del, musicEdit } from "@/api/music";

export default {
  data() {
    return {
      searchForm: {
        keyword: "",
        pageSize: 100,
      },
      visible: false,
      visibleTitle: "",
      formLabelWidth: "120px",
      classData: [],
      singers: [],
      list: [],
      type: null, //新增还是编辑
      id: null, //文章id
      form: {
        name: "",
        url: "",
        typeId: "",
        coverImg: "",
        singerId: "",
        desc: "",
        singerName: "",
        typeNName: "",
      },
    };
  },
  methods: {
    handleClose: function(done) {
      this.reset();
      done();
    },
    reset: function() {
      this.form = {
        name: "",
        url: "",
        typeId: "",
        coverImg: "",
        singerId: "",
        desc: "",
        singerName: "",
        typeNName: "",
      };
    },
    afterUploadImg: function(res) {
      this.$message({
        type: "success",
        message: res.msg,
      });
      if (res.code == 1) {
        this.form.coverImg = res.data.url;
      }
    },

    afterUpload: function(res) {
      this.$message({
        type: "success",
        message: res.msg,
      });
      this.form.url = res.url;
      if (res.code == 1) {
        this.form.url = res.data.url;
      }
    },

  // 新增、编辑歌曲
    async confirm() {
      var type = this.classData.find((item) => {
        return item.id === this.form.typeId;
      });
      this.form.typeName = type.className;
      var singer = this.singers.find((item) => {
        return item.id === this.form.singerId;
      });
      this.form.singerName = singer.name;
      let result;
      if (this.type === 2) {
        result = await musicEdit(this.form);
      } else {
        result = await musicAdd(this.form);
      }

      this.getMusicList();
      this.visible = false;
      this.reset();
      this.$message({
        message: result.msg,
        type: "success",
      });
    },

    async getAllClass() {
      let result = await getAllClass();
      this.classData = result.data;
    },

    async getAllSingers() {
      let result = await queryAll();
      this.singers = result.data;
    },
    // 获取歌曲列表
    getMusicList: async function() {
      let result = await queryList(this.searchForm);
      this.list = result.data.list;
    },

    removed(row) {
      this.$confirm(`是否删除分类  "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await del({ id: row.id });
          this.$message({
            type: "success",
            message: `${row.name} 歌曲删除成功`,
          });
          this.getMusicList();
        })
        .catch(() => console.log("取消"));
    },
    addEdit(type, row) {
      if (type === 1) {
        this.reset();
        this.type = 1;
      } else {
        this.type = type;
        this.form = {
          name: row.name,
          url: row.url,
          typeId: row.typeId,
          coverImg: row.coverImg,
          singerId: row.singerId,
          desc: row.desc,
          singerName: row.singerName,
          typeNName: row.typeNName,
          id: row.id,
        };
      }
      this.visible = true;
    },
  },
  created() {
    this.getMusicList();
    this.getAllClass();
    this.getAllSingers();
  },
};
</script>

<style lang="scss" scoped>
.table {
  margin-top: 30px;
}
audio {
  display: inline-block;
  height: 24px;
  width: 230px;
}
.up {
  display: flex;
  align-items: center;
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
}
.avatar-uploader {
  display: inline-block;
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
