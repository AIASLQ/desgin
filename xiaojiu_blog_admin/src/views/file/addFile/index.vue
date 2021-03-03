<template>
  <div class="app-container">
    <el-alert :closable="false" :title="title" />
    <el-form
      :model="articleForm"
      :rules="rules"
      ref="articleForm"
      label-width="60px"
      label-position="left"
      class="demo-ruleForm"
      style="margin-top: 20px;"
      :validate-on-rule-change="false"
    >
      <!-- 分类 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title" required>
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="articleForm.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select v-model="articleForm.status" placeholder="请选择文章状态">
              <el-option
                v-for="(item,index) in statusData"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="用户" prop="userId">
            <el-select v-model="articleForm.userId" placeholder="请选择操作人">
              <el-option
                v-for="(item,index) in adminData"
                :key="index"
                :label="item.nickname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="分类" prop="typeId">
            <el-select v-model="articleForm.typeId" placeholder="请选择文章分类">
              <el-option
                v-for="(item,index) in classList"
                :key="index"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20">
          <el-form-item label="封面" prop="coverImg" required>
            <el-input v-model="articleForm.coverImg" placeholder="请填写封面图片链接或者上传一张图片作为封面"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="2" > 或</el-col> -->
        <el-col :span="3" :offset="1">
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3333/api/imgs/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <el-button type="text">上传封面图片</el-button>
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" :style="{paddingLeft:'60px',marginBottom:'20px'}">
          <img v-if="articleForm.coverImg" :src="articleForm.coverImg" class="cover" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" v-loading="loading">
          <el-form-item label="内容" prop="content">
            <mavonEditor
              v-model="articleForm.content"
              :style="{'min-height': '700px'}"
              @change="mdChange"
            ></mavonEditor>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="updateArticle('articleForm')">立即发布</el-button>
            <!-- <el-button style="margin-left: 50px;" @click="resetForm('articleForm')">重置</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getAllAdmin } from "@/api/user";
import { getAllClass } from "@/api/classIfy";
import { addEditArticle, getDetail } from "@/api/article";
import { getArticle } from "@/api/reptiles";
export default {
  components: { mavonEditor },
  data() {
    return {
      classList: [],
      adminData: [],
      loading: false,
      articleForm: {
        title: "",
        typeId: "",
        desc: "",
        status: "", // 状态 0 草稿， 1 发表
        userId: "",
        content: "",
        coverImg: "",
        html: "",
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        desc: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
        coverImg: [
          {
            required: true,
            message: "请使用一张图片作为封面",
            trigger: "blur",
          },
        ],
        typeId: [
          { required: true, message: "请选择文章分类", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        userId: [
          { required: true, message: "请选择用户", trigger: "change" },
        ],
        content: [
          { required: true, message: "请填写文章内容", trigger: "blur" },
        ],
      },
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
    mdChange(value, render) {
      this.articleForm.html = render;
    },
    // 上传文章
    updateArticle(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$confirm(`是否上传文章 "${this.articleForm.title}"`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
          }).then(async () => {
            const data = Object.assign(this.articleForm,{id:this.$route.query.id})
            addEditArticle(data).then((res) => {
              if (res.code == 1) {
                this.$message({
                  type: "success",
                  message: res.msg,
                });
                this.$router.push("/file/manageFile");
              }
            });
          });
        } else {
          return false;
        }
      });
    },
    async getAllClass() {
      let result = await getAllClass();
      this.classList = result.data;
    },
    afterUpload(res) {
      this.$message({
        type: "success",
        message: res.msg,
      });
      this.articleForm.coverImg = res.url;
      if (res.code == 1) {
        this.articleForm.coverImg = res.data.url;
      }
    },
    async isEdit() {
      if (this.$route.query.id) {
        let result = await getDetail({ id: this.$route.query.id });
        this.articleForm = { ...result.data };
      } else {
        return;
      }
    },
    async getAllAdmin() {
      let result = await getAllAdmin();
      this.adminData = result.data;
    },
    async addArticle() {
      if (this.$route.params.url) {
        this.loading = true;
        let result = await getArticle({url:this.$route.params.url,type:this.$route.params.type || 1})
        this.loading = false
        this.articleForm.content = result.data
      }
    },
  },

  created() {
    this.getAllClass();
    this.isEdit();
    this.getAllAdmin();
    this.addArticle()
  },
  computed:{
    title: function (){
      if(this.$route.params.url || this.$route.query.id){
        return '编辑文章'
      }else{
        return '新增文章'
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.cover {
  width: 50%;
  border: 1px dashed #ccc;
  border-radius: 5px;
}
</style>