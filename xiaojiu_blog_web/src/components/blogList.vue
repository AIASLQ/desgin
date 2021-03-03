<template>
  <div class="main-container-article">
    <ul v-loading="isloading">
      <li v-for="(item,index) in articleList" :key="index" @click="readDetail(item.id)">
        <div class="article-cover">
          <img :src="item.coverImg" />
        </div>
        <div class="article-list">
          <h3>{{item.title}}</h3>
          <p>{{item.desc}}</p>
          <div class="article-list-info">
            <span>
              <i class="icon iconfont icon-leimupinleifenleileibie"></i>
              {{item.Type.className}}
            </span>
            <span>
              <i class="icon iconfont icon-biaoqian"></i> 前端 vue 框架
            </span>
            <span>
              <i class="icon iconfont icon-biao"></i>
              {{changeDate(item.updatedAt)}}
            </span>
          </div>
        </div>
      </li>
      <p class="ismore" v-if="noMore">没有更多啦、去别处看看吧......</p>
    </ul>
  </div>
</template>

<script>
export default {
  name: "blogList",
  props: {
    articleList: {
      type: Array,
    },
  },
  data() {
    return {
      isloading: false,
      noMore: false,
    };
  },
  methods: {
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
};
</script>
<style lang='scss' scoped>
.main-container-article {
//   width: 70%;
  display: flex;
  flex-direction: column;
  ul {
    min-height: 90vh;
    li {
      cursor: pointer;
      display: flex;
      height: 235px;
      margin: 0px 0px 15px 0px;
      padding: 10px;
      border-radius: 8px;
      transition: all 1s ease 0s;
      border: 1px solid #d2d2d2;
      overflow: hidden;
      .article-cover {
        width: 33%;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 90%;
          height: 90%;
          opacity: 0.7;
          transition: all 0.6s ease 0s;
          border-radius: 8px;
          filter: brightness(0.8);
        }
      }
      .article-list {
        flex: 1;
        margin: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3 {
          color: #2c3e50;
        }
        p {
          font-size: 16px;
          color: #a09c9c;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          &:hover{
            color: #1abc9c;
          }
        }
        &-info {
          font-size: 16px;
          color: #718096;
          display: flex;
          span {
            flex: 1;
            white-space: nowrap;
          }
          i {
            margin-right: 4px;
          }
        }
      }
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        img {
          // transform: scale(0.9);
          filter: brightness(1);
        }
      }
    }
    .ismore {
      margin-top: 20px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>