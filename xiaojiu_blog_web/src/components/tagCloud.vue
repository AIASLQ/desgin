<template>
  <div class="tagCloud">
    <h3>标签云</h3>
    <div class="tagCloud-container">
      <span :style="{background:randomColor(.5)}">vue</span>
      <span :style="{background:randomColor(.5)}">node</span>
      <span :style="{background:randomColor(.5)}">api设计</span>
      <span :style="{background:randomColor(.5)}">前端埋点</span>
      <span :style="{background:randomColor(.5)}">css</span>
      <span :style="{background:randomColor(.5)}">工程化</span>
      <span :style="{background:randomColor(.5)}">javascript</span>
      <span :style="{background:randomColor(.5)}">react</span>
      <span :style="{background:randomColor(.5)}">Docker</span>
      <span :style="{background:randomColor(.5)}">k8s</span>
      <span :style="{background:randomColor(.5)}">mysql</span>
      <span :style="{background:randomColor(.5)}">自动化部署</span>
      <span :style="{background:randomColor(.5)}">npm</span>
      <span :style="{background:randomColor(.5)}">组建</span>
      <span :style="{background:randomColor(.5)}">express</span>
      <span :style="{background:randomColor(.5)}">koa</span>
      <span :style="{background:randomColor(.5)}">mongodb</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
      randomColor(alpha) {
      //判断有没有传入透明值，没有传入的话，随机生成0-1之间的小数
      //Math.random()只能生成0-1之间的小数，不包含0跟1，Math.random()*10，是1-10之间的整数，除以10再四舍五入，就有可能得到0或者1.
      alpha =
        alpha == undefined ? ((Math.random() * 10) / 10).toFixed(1) : alpha;
      //将参数转化成数值
      alpha = Number(alpha);
      //如果传入的参数是非数值，则让透明度为1
      if (isNaN(alpha)) alpha = 1;
      //颜色拼接
      var color = "rgba(";
      for (var i = 0; i < 3; i++) {
        color += parseInt(Math.random() * 256) + ",";
      }
      color += alpha + ")";
      return color;
    },
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang='scss' scoped>
.tagCloud{
    h3{
        padding: 15px;
        font-weight: 500;
        border-bottom: 2px solid #e8e8e8;
    }
    &-container{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        span{
            padding: 4px 8px;
            border: 1px solid #f3f6f3;
            border-radius: 12px;
            margin: 10px;
            background: #f3f6f3;
            cursor: pointer;
            user-select: none;
                transition: all .5s;

            &:hover{
                transition: all .5s;
                text-shadow: #000 1px 1px 1px;
                border-radius: 0;
                transform: scale(1.2);
            }
        }
    }
}
</style>