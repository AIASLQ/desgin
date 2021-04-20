<template>
  <div class="app-container">
    <el-alert :closable="false" title="文章爬取" />

    <div class="contnet">
      <el-row :style="{marginBottom:'20px'}">
        <el-col :span="13">
          <el-input
            placeholder="请输入或者粘贴您需要获取的博客url地址"
            v-model="url"
            clearable
            @keyup.enter.native="getArticle"
          ></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="type" placeholder="请选择您的博客类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="getArticle">点击获取</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="editArticle">编辑文章</el-button>
        </el-col>
      </el-row>

     <el-alert title="目前仅支持选项中的类型博客下的文章，其他类型后续更新-----------不勾选则为hexo类型" type="warning" />
      
      <el-input
        type="textarea"
        :rows="30"
        placeholder="请输入内容"
        :style="{marginTop:'30px'}"
        v-model="content"
      ></el-input>
    </div>
  </el-alert>
  </div>
</template>

<script>
import { getArticle } from "@/api/reptiles";
export default {
  components: {},
  data() {
    return {
      url: "",
      content: "",
      options: [
        {
          value: '1',
          label: 'hexo'
        },
        {
          value: '2',
          label: '掘金'
        },
        {
          value: '3',
          label: 'CSDN'
        },
        {
          value: '4',
          label: '简书'
        },
        {
          value: '5',
          label: '图雀'
        },
        {
          value: '6',
          label: '公众号'
        }
      ],
      type: ''
    };
  },
  methods: {
    async getArticle() {
      if(this.url == ''){
        this.$message({
          message: '请先填写url',
          type: 'warning'
        });
        return;
      }
      let result = await getArticle({ url: this.url, type: this.type || 1 });
      console.log(result)
      this.content = result.data;
    },
    editArticle(){
      if(this.url == '' || this.content == ''){
        this.$message({
          message: '请先获取文章',
          type: 'warning'
        });
      }else{
        this.$router.push({name:'addFile',params:{url:this.url,type:this.type || 1}})
      }
    }
  },
};
</script>
<style lang='scss' scoped>
.contnet {
  margin-top: 30px;
}
</style>