<template>
  <div class="children" @click.stop="hidden">
    <div class="inner" @click.stop>
      <header>
        <el-input
          placeholder="歌曲名称"
          v-model="searchForm.keyWord"
        ></el-input>
        <el-button type="primary" size="mini" @click="queryList"
          >搜索</el-button
        >
        <el-button type="primary" size="mini" @click="getMusicList"
          >添加</el-button
        >
      </header>
      <ul>
        <!-- 歌曲集下歌曲列表 -->
        <li v-for="(item, index) in tableData" :key="index">
          <div class="left">
            <img class="avatar" :src="item.coverImg" />
            <div class="music-name">{{ item.name }}({{ item.singerName }})</div>
          </div>
          <div class="opt">
            <el-button type="primary" @click="removeItem(item.id)" size="mini"
              >移除</el-button
            >
          </div>
        </li>
      </ul>
      <el-dialog title="添加歌曲" :visible.sync="dialogVisible" width="60%">
        <el-table :data="musicList" stripe style="width: 100%">
          <el-table-column
            prop="name"
            label="歌曲名称"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="singerName"
            label="歌手"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="count"
            label="播放量"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="typeName"
            label="类别"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { create, list, del } from "@/api/songBookChildren";
import { queryList } from "@/api/music";
export default {
  props: {
    songbookId: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    songbookName: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      multipleSelection: [],
      dialogVisible: false,
      searchForm: {
        keyWord: "",
      },
      tableData: [],
      musicList: [],
    };
  },
  methods: {
    removeItem: function(id) {
      del({
        id: id,
      }).then((res) => {
        if (res.code == 1) {
          this.queryList();
        }
      });
    },

    // 向歌曲集下添加歌曲
    handleClick: function(raw) {
      create({
        songBookId: this.songbookId,
        musicId: raw.id,
      }).then((res) => {
        if (res.code == 1) {
          this.getMusicList();
          this.queryList();
        }
      });
    },
    getMusicList: async function() {
      let result = await queryList({});
      this.musicList = result.data.list;
      this.dialogVisible = true;
    },
    hidden: function() {
      this.$emit("hidden");
    },

    add: function() {
      const musicId = this.multipleSelection.map((item) => {
        return item.id;
      });
    },

    // 获取歌曲集下歌曲
    queryList: function() {
      list({
        songBookId: this.songbookId,
        keyWord: this.searchForm.keyWord,
      }).then((res) => {
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
};
</script>
<style scoped lang="scss">
.children {
  position: absolute;
  right: 0;
  top: 54px;
  bottom: 0;
  left: 0;
  cursor: pointer;
  .inner {
    overflow-y: scroll;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    background: #e0dfdf;
    padding: 10px;
    header {
      display: flex;
      height: 44px;
      align-items: center;
    }

    header .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    flex-direction: row;
    height: 40px;
    border-bottom: 1px solid #ccc;
    .left {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      .avatar {
        width: 40px;
        height: 40px;
        padding: 3px;
      }
      .music-name {
        line-height: 40px;
        padding-left: 10px;
      }
    }
    .opt {
      text-align: center;
      line-height: 40px;
      width: 60px;
    }
  }
}
</style>
