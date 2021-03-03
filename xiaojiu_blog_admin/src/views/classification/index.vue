<template>
  <div class="app-container">
    <el-button type="primary" @click="addEdit(1)">新增分类</el-button>

    <!-- table -->
    <div class="table">
      <el-table :data="classData" border style="width: 100%">
        <el-table-column prop="className" label="分类"></el-table-column>
        <el-table-column prop="classDesc" label="描述"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column prop="updatedAt" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="addEdit(2,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removed(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增编辑分类 dialog -->
    <el-dialog :title="type === 1 ? '新增分类' : '编辑分类'" :visible.sync="visible">
      <el-form :model="form" ref="createClass" :rules="rules">
        <el-form-item label="分类名称" prop="className" :label-width="formLabelWidth">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" prop="classDesc" :label-width="formLabelWidth">
          <el-input v-model="form.classDesc" autocomplete="off"></el-input>
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
import { addEdit, del, getAllClass } from "@/api/classIfy";
export default {
  data() {
    return {
      visible: false,
      visibleTitle: "",
      formLabelWidth: "120px",
      classData: [],
      type: null, //新增还是编辑
      id: null, //文章id
      form: {
        className: "",
        classDesc: "",
      },
      rules: {
        className: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符" },
        ],
        classDesc: [
          { required: true, message: "请输入详细描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async confirm() {
      this.$refs.createClass.validate(async (valid) => {
        if (valid) {
          if (this.type == 1) {
            let result = await addEdit(this.form);
            this.$message({
              message: result.msg,
              type: "success",
            });
          } else {
            const data = Object.assign(this.form, { id: this.id });
            console.log(data)
            let result = await addEdit(data);
            this.$message({
              message: result.msg,
              type: "success",
            });
          }
          this.getAllClass();
          this.id = null;
          this.type = null;
          this.form = {
            className: "",
            classDesc: "",
          };
          this.visible = false;
        }
      });
    },
    async getAllClass() {
      let result = await getAllClass();
      this.classData = result.data;
      console.log(result);
    },
    removed(row) {
      this.$confirm(`是否删除分类  "${row.className}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await del({ id: row.id });
          this.$message({
            type: "success",
            message: `${row.className} 分类删除成功`,
          });
          this.getAllClass();
        })
        .catch(() => console.log("取消"));
    },
    addEdit(type, row) {
      if (type === 1) {
        this.type = 1;
      } else {
        this.type = type;
        this.form = {
          className: row.className,
          classDesc: row.classDesc,
        };
        this.id = row.id;
      }
      this.visible = true;
    },
  },
  created() {
    this.getAllClass();
  },
};
</script>

<style lang='scss' scoped>
.table {
  margin-top: 30px;
}
</style>

