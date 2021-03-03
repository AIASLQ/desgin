<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-container-left">Copyright 2020-2020 小九博客 陕ICP备2020013749号</div>
      <div class="footer-container-right">
        本站已经被访问1200次了 累计访问人数300人
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang='scss' scoped>
.footer {
  width: 100%;

  background: #fff;
  &-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 50px;
    &-left{
      width: 50%;
      display: flex;
      justify-content: center;
    }
    &-right{
      width: 50%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>