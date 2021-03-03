<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="home-header">
      <div class="hotContent">
        <el-carousel indicator-position="outside">
          <el-carousel-item class="hotContent-item" v-for="(item,index) in hotList" :key="index">
            <img class="hotContent-item-cover" :src="item.path" alt />
            <div class="hotContent-item-tips">
              <a>{{item.desc}}</a>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hotClass">
        <div class="hotClass-item">
          <img
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3649388259,1540630197&fm=26&gp=0.jpg"
            alt
          />
          <span class="hotClass-item-tag">前端开发</span>
          <span class="hotClass-item-desc">vue的双向绑定源码剖析</span>
        </div>
        <div class="hotClass-item">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598444397980&di=ef74d949544e135a0c22c7fd7e01b1b1&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2829942742%2C1822803091%26fm%3D214%26gp%3D0.jpg"
            alt
          />
          <span class="hotClass-item-tag">后端开发</span>
          <span class="hotClass-item-desc">使用node开发大前端全栈项目</span>
        </div>
      </div>
    </div>
    <!-- center -->
    <div class="home-body">
      <div class="blogsbox">
        <blog-list :articleList='articleList' />
      </div>
      <div class="tagsbox">
        <div class="tag">
          <tag-cloud />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotArticle } from "../../api/Article";
import blogList from "../../components/blogList";
import tagCloud from '../../components/tagCloud'
export default {
  components: { blogList , tagCloud},
  data() {
    return {
      hotList: [
        {
          path:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=248857495,2288325489&fm=26&gp=0.jpg",
          desc: "前端知识体系梳理",
        },
        {
          path:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598502140693&di=a46054d2e81c30e55ece86f232048b50&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170710%2F4e2a961cd1d54a2cbbe88d152bdc9179_th.jpg",
          desc: "react详解",
        },
        {
          path:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598445856300&di=d6172694f7e8efa10a6abd08e3dda194&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1138603849%2C4069782538%26fm%3D214%26gp%3D0.jpg",
          desc: "走进html的世界",
        },
      ],
      articleList: [],
    };
  },
  methods: {
    getHotArticle() {
      getHotArticle().then((res) => {
        this.articleList = res.data;
        console.log(this.articleList)
      });
    },
  },
  created() {
    this.getHotArticle()
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang='scss' scoped>
.home {
  width: 80%;
  margin: 0 auto;
  &-header {
    margin-top: 20px;
    height: 450px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .hotContent {
      width: 66%;
      height: 450px !important;
      &-item {
        width: 100%;
        height: 100%;
        &-cover {
          width: 100%;
          height: 450px;
          border-radius: 5px;
          filter: brightness(0.95);
        }
        &-tips {
          position: absolute;
          bottom: 40px;
          line-height: 50px;
          color: #fff;
          font-size: 28px;
          background: rgba(0, 0, 0, 0.3);
          width: 100%;
          user-select: none;
          text-align: center;
        }
      }
    }
    .hotClass {
      width: 32%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-item {
        height: 216px;
        background: #fff;
        filter: brightness(0.9);
        position: relative;
        &-tag {
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          position: absolute;
          top: 20px;
          left: 30px;
          padding: 6px 10px;
          font-size: 14px;
          border-radius: 3px;
        }
        &-desc {
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          position: absolute;
          bottom: 0px;
          left: 0;
          line-height: 50px;
          font-size: 20px;
          width: 100%;
          font-weight: 600;
          padding-left: 20px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          filter: brightness(1.3);
          cursor: pointer;
          transition: all 0.8s;
        }
      }
    }
  }
  &-body {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .blogsbox {
      width: 66%;
    }
    .tagsbox {
      width: 32%;
      .tag{
        background: #fff;
        padding: 10px 15px;
      }
    }
  }
}
</style>