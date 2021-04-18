<template>
    <div class="singer">
        <header>
            <input type="text" placeholder="name">
            <button>搜索</button>
            <button>添加</button>
        </header>
        <div class="contanter">
            <table class="table">
                <thead>
                     <th>序号</th>
                    <th>名字</th>
                    <th>性别</th>
                     <th>头像</th>
                       <th>操作</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>孙立全</td>
                           <td>男</td>
                              <td>头像</td>
                                <td><button>编辑</button><button>禁用</button><button>启用</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="addSinger">
            <div>
                <input type="text" v-model="singerForm.name" placeholder="姓名">
            </div>
              <div>
                <input type="number" placeholder="性别" v-model="singerForm.sex">
            </div>
            <div>
                <img v-if="singerForm.avatar" style="width:20px;height:20px" :src="singerForm.avatar" alt="">
                 <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3333/api/imgs/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <el-button type="text">上传封面图片</el-button>
          </el-upload>
             <el-button @click="add">添加</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { addEditSinger } from "@/api/singer";
export default {
    components: {},
    data() {
        return {
            singerForm: {
                avatar:'',
                sex:0,
                name: ''
            }
        };
    },
    methods: {
        add() {
  addEditSinger(this.singerForm).then((res) => {
              if (res.code == 1) {
                this.$message({
                  type: "success",
                  message: res.msg,
                });
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
    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    }
</script>
<style lang='less' scoped>

</style>
