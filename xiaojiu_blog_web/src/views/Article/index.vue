<template>
  <div class="container">
    <div class="main-container">
      <div class="main-container-aside">
        <ul>
          <span class="title">分类管理</span>
          <li @click="getClassArticle('')">
            <span>全部</span>
            <span>【{{allArticleNum}}】篇</span>
          </li>
          <li
            v-for="(item,index) in classList"
            :key="index"
            @click="getClassArticle(item.id,item.Articles.length)"
          >
            <span>{{item.className}}</span>
            <span>【{{item.Articles.length}}】篇</span>
          </li>
        </ul>

        <ul :style="{marginTop:'80px'}">
          <span class="title">热门文章推荐</span>
          <li v-for="(item,index) in hotList" :key="index">{{item.title}}</li>
        </ul>
      </div>
      <div class="main-container-articlelist">
        <blog-list :articleList='articleList' />
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticle } from "@/api/Article/index";
import { getAllClass } from "@/api/Class";
import blogList from "../../components/blogList";
export default {
  components: {blogList},
  data() {
    return {
      classList: [],
      articleList: [],
      total: null,
      currentPage: 1, //当前是第几页
      pageSize: 5, //一页显示几条数据
      allArticleNum: null,
      typeId: "", //分类id  查看不同分类的文章
      isloading: false,
      noMore: false, //没有更多数据了
      articleLength: null, //当前分类的数量 通过这个比对文章列表的长度判断数据是否加载完毕了
      hotList: [], //热门文章
    };
  },
  methods: {
    // 滚动事件监听
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      console.log(scrollTop + clientHeight,scrollHeight)
      // // 如果滚动到接近底部，自动加载下一页
      // console.log(scrollTop+clientHeight,scrollHeight)
      if (scrollTop + clientHeight >= scrollHeight) {
        // 数据请求
        if (!this.isMore) {
          console.log('加载更多')
          this.getAllArticle();
        } else {
          this.noMore = true;
          return;
        }
      }
    },
    /** 获取分类列表 */
    getClassArticle(typeId, length) {
      this.articleLength = length;
      this.currentPage = 1;
      this.pageSize = 5;
      this.typeId = typeId;
      this.getAllArticle();
    },
    /** 获取文章列表 */
    async getAllArticle() {
      this.isloading = true;
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        typeId: this.typeId,
        status: 1,
      };
      let res = await getAllArticle(data);
      console.log(res,'滑动新增的')
      this.isloading = false;
      if (res.data.pagination.currentPage == 1) {
        this.articleList = res.data.articles;
        this.hotList = res.data.articles;
      } else {
        this.articleList = [...this.articleList, ...res.data.articles];
        console.log(this.articleList, "加起来的数据");
      }
      ++this.currentPage;
    },
    //获取分类列表
    async getAllClass() {
      let res = await getAllClass();
      this.classList = res.data;
      console.log(this.classList)
    },
    async getAllArticleNum() {
      const data = {
        status: 1,
      };
      let res = await getAllArticle(data);
      console.log(res)
      this.allArticleNum = res.data.pagination.total;
      this.articleLength = res.data.pagination.total;
    },
    getInfo() {
      this.getAllArticle();
      this.getAllClass();
      this.getAllArticleNum();
    },
    readDetail(id) {
      this.$router.push(`article-detail/${id}`);
    },
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
    this.getInfo();
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.clearInterval(this.handleScroll);
  },
  computed: {
    isMore: function () {
      if (this.articleLength == this.articleList.length) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.main-container {
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
  &-aside {
    width: 25%;
    height: 500px;
    position: sticky;
    top: 30px;
    li {
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;

      &:hover {
        background: cornsilk;
        cursor: pointer;
      }
    }
  }
  &-articlelist {
    width: 70%;
    display: flex;
    flex-direction: column;
    // ul {
    //   min-height: 90vh;
    //   li {
    //     cursor: pointer;
    //     display: flex;
    //     height: 200px;
    //     margin: 0px 0px 15px 10px;
    //     padding: 10px;
    //     border-radius: 8px;
    //     transition: all 1s ease 0s;
    //     border: 1px solid #d2d2d2;
    //     overflow: hidden;
    //     .article-cover {
    //       width: 40%;
    //       overflow: hidden;
    //       display: flex;
    //       align-items: center;
    //       img {
    //         width: 90%;
    //         height: 90%;
    //         opacity: 0.7;
    //         transition: all 0.6s ease 0s;
    //         border-radius: 8px;
    //         filter: brightness(0.8);
    //       }
    //     }
    //     .article-list {
    //       flex: 1;
    //       margin: 15px;
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: space-between;
    //       h3 {
    //         color: #2c3e50;
    //       }
    //       p {
    //         font-size: 16px;
    //         color: #a09c9c;
    //         overflow: hidden;
    //         text-overflow: ellipsis;
    //         display: -webkit-box;
    //         -webkit-line-clamp: 3;
    //         -webkit-box-orient: vertical;
    //       }
    //       &-info {
    //         font-size: 16px;
    //         color: #718096;
    //         display: flex;
    //         span {
    //           flex: 1;
    //           white-space: nowrap;
    //         }
    //         i {
    //           margin-right: 4px;
    //         }
    //       }
    //     }
    //     &:hover {
    //       box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    //       img {
    //         transform: scale(0.9);
    //         filter: brightness(1);
    //       }
    //     }
    //   }
    //   .ismore {
    //     margin-top: 20px;
    //     text-align: center;
    //     line-height: 30px;
    //   }
    // }
  }
  .title {
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }
}
</style>