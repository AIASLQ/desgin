<template>
  <div class="app-container">
    <el-alert :closable="false" title="文章列表" />
    <!-- table -->
    <div class="table">
      <el-table :data="articleData" border style="width: 100%" show-overflow-tooltip>
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" alt />
          </template>
        </el-table-column>

        <el-table-column label="作者">
          <template slot-scope="scope">
            <span>{{scope.row.User.nickname || '暂无'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>

        <el-table-column label="分类">
          <template slot-scope="scope">
            <span>{{scope.row.Type.className}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{changeStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column prop="updatedAt" label="最后更新时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editArticle(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delArticle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllArticle, delArticle } from "@/api/article";
import { getAllClass } from "@/api/classIfy";
import { getAllAdmin } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      articleData: [], //文章列表
      adminData: [], //所有管理员信息
      classData: [], //所有分类信息
      statusData: [
        {
          name: "草稿",
          id: 0,
        },
        {
          name: "已发布",
          id: 1,
        },
      ],
    };
  },
  methods: {
    async getAllArticle() {
      let result = await getAllArticle();
      console.log(result, "新数据");
      this.articleData = result.data.articles.map((t) => {
        t.desc = t.desc.substr(0, 30);
        t.createdAt = this.changeDate(t.createdAt)
        t.updatedAt = this.changeDate(t.updatedAt)
        return t;
      });
    },
    /** 编辑文章 */
    editArticle(row) {
      this.$router.push({ path: "/file/addFile", query: { id: row.id } });
    },
    /** 删除文章 */
    delArticle(row) {
      this.$confirm(`是否删除文章  "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await delArticle({ id: row.id });
          this.$message({
            type: "success",
            message: `${row.title} 文章删除成功`,
          });
          this.getAllArticle();
        })
        .catch(() => console.log("取消"));
    },
    /** 获取所有管理员 */
    async getAllAdmin() {
      let result = await getAllAdmin();
      this.adminData = result.data;
    },
    /** 获取所有分类 */
    async getAllClass() {
      let result = await getAllClass();
      this.classData = result.data;
    },
    /** 状态id转换 */
    changeStatus(id) {
      let result = this.statusData.filter((t) => t.id == id);
      return result[0].name;
    },
    /** 日期格式化 */
    changeDate(date) {
      var d = new Date(date);
      return (
        d.getFullYear() +
        "年" +
        "-" +
        (d.getMonth() + 1) +
        "月" +
        "-" +
        d.getDate() +
        "日"
      );
      // + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
  },
  created() {
    this.getAllAdmin();
    // this.getAllClass();
    this.getAllArticle();
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang='scss' scoped>
.table {
  margin-top: 30px;
}
img {
  width: 100%;
}
</style>