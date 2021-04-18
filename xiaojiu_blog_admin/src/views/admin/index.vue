<template>
  <div class="app-container">
    <el-alert :closable="false" title="新增管理员" />
    <br />
    <template>
      <el-table :data="adminData"  border style="width: 100%">
        <el-table-column label="头像" align='center' width="120" >
          <template slot-scope="scope">
            <div class="avatar">
              <img :src="scope.row.avatar" v-if="scope.row.avatar">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align='center' ></el-table-column>
        <el-table-column prop="mobile" label="用户名"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作"  width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editAdmin(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delAdmin(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
  title="提示"
  :visible.sync="isShow"
  width="60%"
  >
<div style="margin-bottom:30px">
   <el-input v-model="updateForm.nickname" placeholder="昵称"></el-input>
</div>
        <el-row>
           <el-col :span="18">
<el-input v-model="updateForm.avatar" placeholder="请上传一张图片作为头像"></el-input>
           </el-col>
            <el-col :span="6">
               <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3333/api/imgs/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <el-button type="text">上传头像</el-button>
          </el-upload>
            </el-col>
        </el-row>
     <el-row>
        <input type="file" placeholder="ddf" @change="inputChange($event)">
        <el-col  :style="{paddingLeft:'60px',marginBottom:'60px'}">
          <img v-if="updateForm.avatar" :src="updateForm.avatar" class="cover" />
        </el-col>
      </el-row>
        
  <span slot="footer" class="dialog-footer">
    <el-button @click="isShow = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {getAllAdmin, update} from '@/api/user'
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
        avatar: '',
        mobile: '',
        id: '',
        nickname:'',
      }
    };
  },
  methods:{
    async getAllAdmin(){
      let result = await getAllAdmin()
      this.adminData = result.data
      console.log(result)
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
    editAdmin(index, row){
      this.updateForm.avatar = row.avatar
        this.updateForm.id = row.id
           this.updateForm.nickname = row.nickname
           this.isShow = true
    },
    inputChange(event) {
      var file = event.target.files[0]
      debugger
      console.log(file)
    },
    async update() {
       await update(this.updateForm)
      this.isShow = false
      this.getAllAdmin()

    },
    delAdmin(){
      this.$message({
          message: '您无权删除',
          type: 'warning'
        });
    }
  },
  created() {
    this.getAllAdmin()
  }
};
</script>
<style lang='scss' scoped>
.avatar{
  width: 80px;
  overflow: hidden;
  img{
    width: 100%;
  }
}
</style>