<template>
  <div
    class="container"
    id="container"
    ref="scroll"
    style="height: 100vh; overflow: auto"
    v-loading="loading"
  >
    <div id="top"></div>
    <!-- <Header :isFixed="true" /> -->
    <Header :isFixed="false" />

    <div class="article-title">
      <div
        class="header"
        id="coverImg"
        :style="{
          backgroundImage: `url(${articleInfo.coverImg})`,
        }"
      >
        <h1 class="header_name">{{ articleInfo.title }}</h1>
        <span class="header_author"
          ><i class="iconfont icon-guanyuwomen"></i> 作者：{{
            articleInfo.User.nickname
          }}</span
        >
        <span class="header_release"
          ><i class="iconfont icon-biao"></i>发布时间：{{
            rTime(articleInfo.updatedAt, false)
          }}</span
        >
      </div>
    </div>
    <div class="article">
      <div class="article-body">
        <div class="markdown-body" >
          <div ref="content" v-html="article"></div>
        </div>
      </div>
      <div class="article-sidbar">
        <div class="detail-aside">
          <div class="detail-toc">
            <span class="toc-header"
              ><i class="iconfont icon-shu_1"></i> 目录</span
            >
            <ul>
              <li
                v-for="(item, index) in menuData"
                :key="index"
                :class="
                  menuState == item.text
                    ? `active ${item.className}`
                    : item.className
                "
                @click="scrollPage(item)"
              >
                <a>{{ item.text }} </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="to-top"
      @click="jump('container')"
      :class="isShowTopBtn ? 'showBtn' : ''"
    >
      <img src="https://jdqiong.cn/img/backToTop.f7364f79.png" alt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/Article/index";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
// import "../../../assets/css/_highlight.scss";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default {
  components: { Header, Footer },
  data() {
    return {
      loading: false,
      article: null,
      menuData: [],
      menuState: [],
      scroll: null,
      rolling: false,
      articleInfo: "",
      isShowTopBtn: true,
    };
  },
  methods: {
    async getDrtail() {
      this.loading = true;
      let res = await getArticleDetail({ id: this.$route.params.id });
      this.article = marked(res.data.content);
      this.articleInfo = res.data;
      this.loading = false;
    },
    getAPs(nodeArr) {
      let nodeInfo = []; // 存储目录信息
      // 对文档根节点的每一个子节点进行遍历，选出所有需要解析的目录标题
      this.$refs.content.childNodes.forEach((item) => {
        let offsetLeft = "";
        let className = "";

        switch (item.nodeName) {
          case "H1":
            offsetLeft = "16px";
            className = item.nodeName + "_title";
            break;
          case "H2":
            offsetLeft = "28px";
            className = item.nodeName + "_title";
            break;
          case "H3":
            offsetLeft = "40px";
            className = item.nodeName + "_title";
            break;
          case "H4":
            offsetLeft = "40px";
            className = item.nodeName + "_title";
            break;
          case "H5":
            offsetLeft = "40px";
            className = item.nodeName + "_title";
            break;
          case "H6":
            offsetLeft = "40px";
            className = item.nodeName + "_title";
            break;
        }
        if (nodeArr.includes(item.nodeName)) {
          nodeInfo.push({
            type: item.nodeName, // 存储该标题的类型
            text: item.getAttribute("id"), // 存储该标题的文本 [ps：marked解析出来的h1-h6标题会在id里填上对应的标题文本]
            offsetTop: item.offsetTop, // 存储该标题离页面顶部的距离
            className,
          });
        }
      });
      this.menuData = nodeInfo;
      this.menuState = nodeInfo[0].text;
      this.checkMenuScroll();
    },
    scrollPage(item) {
      document.getElementById(`${item.text}`).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });

      setTimeout(() => {
        this.menuState = item.text;
      }, 800);
    },
    monitorScrool() {
      this.scroll = this.$refs.scroll;
      // this.scroll 为整个页面的根节点，用来监听滚动
      let scrollTop = this.$refs.scroll.scrollTop; // 获取当前页面的滚动距离
      let menuState = this.menuData[0].text; // 设置menuState对象默认值为第一个标题的文字
      // 对menuData循环检测，
      // 如果当前页面滚动距离 大于 一个标题离页面顶部 的距离，则将该标题的文字赋值给menuState，循环继续
      // 如果当前页面滚动距离 小于 一个标题离页面顶部 的距离，说明页面还没滚动到该标题的位置，当前标题尚未命中，之后的标题也不可能命中。 循环结束
      for (let item of this.menuData) {
        if (scrollTop + 50 >= item.offsetTop) {
          menuState = item.text;
        } else {
          break;
        }
      }
      // 如果滑动到了页面的底部，则命中最后一个标题
      if (this.scroll.clientHeight + scrollTop === this.scroll.scrollHeight) {
        menuState = this.menuData[this.menuData.length - 1].text;
      }
      // 如果当前命中标题和前一个命中标题的文本不一样，说明当前页面处于其他标题下的内容，切换menuState
      if (menuState !== this.menuState) {
        this.menuState = menuState;
      }
      /** 小火箭的监听 合并写到一起 */
      if (document.getElementById("container").scrollTop > 150) {
        this.isShowTopBtn = true;
      } else {
        this.isShowTopBtn = false;
      }
    },
    // 检测页面滚动函数
    checkMenuScroll() {
      document
        .getElementById("container")
        .addEventListener("scroll", this.monitorScrool);
    },
    jump(id) {
      document.getElementById(`top`).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
  },
  created() {
    this.getDrtail();
  },
  mounted() {
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    setTimeout(() => {
      this.getAPs(["H1", "H2", "H3", "H4", "H5", "H6"]);
    }, 500);
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/_highlight.scss";
.article-title {
  .header {
    color: #fff;
    height: calc(70vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    filter: brightness(.9);
    &_name {
      // font-size: 20px;
      font-weight: 500;
      padding: 10px 0;
    }
    &_author {
      font-size: 18px;
      padding: 10px 0;
    }
    &_release {
      font-size: 18px;
      padding: 10px 0;
    }
    i {
      margin-right: 8px;
    }
  }
}
.article {
  width: 1200px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .markdown-body{
    position: relative;
    margin-top: -4rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  &-body {
    width: 800px;
    width: 75%;
    padding: 20px;
  }
  &-sidbar {
    width: 350px;
    width: 20%;
    margin-left: 30px;
    display: flex;
    .detail-aside {
      width: 100%;
      .detail-toc {
        width: 100%;
        .toc-header {
          display: flex;
          align-items: center;
          margin: 20px 10px;
          font-weight: 500;
          line-height: 1.2;
          i {
            margin-right: 5px;
            font-size: 28px;
            font-weight: 100;
          }
        }
        display: flex;
        flex-direction: column;
        position: sticky;
        top: 10px;
        ul {
          list-style: none;
          li {
            max-width: 300px;
            border-left: 3px solid #ccc;
            display: flex;

            a {
              width: 80%;
              text-decoration: none;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                color: #5ccbcd;
              }
            }
          }
          .active {
            border-left: 3px solid #5ccbcd;
            transition: all 0.5s;
            a {
              background: rgba(204, 204, 204, 0.5);
              color: #5ccbcd !important;
              // margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
.to-top {
  position: fixed;
  bottom: -80px;
  right: 6%;
  z-index: 10;
  transition: all 0.5s;
  img {
    width: 50px;
    cursor: pointer;
    opacity: 0.5;
  }
  &:hover {
    transform: translateY(-15px);
  }
}
.showBtn {
  bottom: 40px;
}
.anchor-fix {
  display: block;
  height: 60px;
  margin-top: -60px;
  visibility: hidden;
}
#coverImg {
  // background-size: 100% 155%;
  background-size: cover;
}
.slideDown {
  transform: translateY(0) !important;
}
</style>