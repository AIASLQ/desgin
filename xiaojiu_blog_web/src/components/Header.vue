<template>
  <!-- :class=" isShow || $route.path.indexOf('article-detail') > -1 ? 'slideDown' : 'slideUp' " -->

  <div
    class="container"
    :class="isShow || $route.path.indexOf('article-detail') > -1  ? 'slideDown' : 'slideUp'"
    :style="{ position: isFixed ? 'fixed' : '' }"
  >
    <div class="container_body">
      <!-- <div class="container_body_info"> <img src="../assets/logo.jpg" @click="$router.push('/')"></div> -->
      <div class="container_body_info">
        <strong>jLongYan's blog </strong>
      </div>
      <div class="container_body_router">
        <router-link
          tag="span"
          :to="item.path"
          class="nav-item"
          :class="active == item.path ? 'is-active' : ''"
          v-for="(item, index) in menuList"
          :key="index"
          ><i :class="`icon iconfont ${item.icon}`"></i>
          {{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    isFixed: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  data() {
    return {
      menuList: [
        { name: "首页", path: "/home", icon: "icon-shouye1" },
        { name: "文章", path: "/article", icon: "icon-xiangguanwenzhang" },
        { name: "归档", path: "/archives", icon: "icon-guidang1" },
        { name: "作品", path: "/project", icon: "icon-zuopin" },
        // { name: "收录", path: "/record", icon:''  },
        // { name: "链接", path: "/link", icon:''  },
        { name: "关于", path: "/about", icon: "icon-guanyuwomen" },
      ],
      isShow: true,
    };
  },
  methods: {
    handlerScrollNav() {
      // 页面滚动距顶部距离 监听是向上滚动还是向下滚动 上面是监听固定高度
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scroll < 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }

      // console.log(window.addEventListener)
    },
  },
  computed: {
    active: function () {
      return this.$route.path;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handlerScrollNav);
  },
};
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 64px;
  font-size: 16px;
  top: 0;
  z-index: 1024;
  line-height: 64px;
  color: #2c3e50;
  background: #fff;
  box-shadow: 0 0 5px 2px #e5e5e5;
  &_body {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    &_info {
      display: inline-block;
      font-size: 1.25rem;
      line-height: inherit;
      white-space: nowrap;
      img {
        height: 35px;
        cursor: pointer;
      }
    }
    &_router {
      display: flex;
      .nav-item {
        width: 90px;
        text-align: center;
        color: #fff;
        color: #2c3e50;
        position: relative;
        &:hover {
          cursor: pointer;
          &::before {
            width: 100%;
            height: 1px;
            transition: all 0.5s;
          }
        }
        &::before {
          content: "";
          width: 0%;
          height: 1px;
          position: absolute;
          bottom: 0px;
          left: 0;
          margin: 0 auto;
          background: #000;
        }
      }
      .router-link-active {
        color: rgb(166, 189, 189);
        border-bottom: 1px solid #000;
        &:hover {
          cursor: pointer;
          &::before {
            width: 100%;
            height: 0px;
            transition: all 0s;
          }
        }
      }
    }
  }

}
  .slideDown{
    transform: translateY(0);;
    transition: transform .5s ease-out;
}
.slideUp{
    // transform: translateY(-60px);
    transition: transform .5s ease-out;
    transform: translateY(-100px);
}
.slideDown {
  transform: translateY(0);
  transition: transform 0.5s ease-out;
}
.slideUp {
  // transform: translateY(-60px);
  transition: transform 0.5s ease-out;
  transform: translateY(-100px);
}
</style>