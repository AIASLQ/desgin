<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ mobile }}</div>
    <br />
    <div class="img">

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      lineOption: {
        title: {
          text: "文章分类统计图",
          subtext: "",
          left: "center",
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "分类1",
              "分类2",
              "分类3",
              "分类4",
              "分类5",
              "分类6",
              "分类7",
              "分类8",
              "分类9",
              "分类10",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "20",
            data: [10, 52, 23, 34, 30, 20, 10, 52, 23, 34],
          },
        ],
      },
      pieOption: {
        title: {
          text: "文章总数占比图",
          subtext: "",
          right: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          // orient: "vertical",
          right: "bottom",
          data: ["分类1", "分类2", "分类3", "分类4", "分类5"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "分类1" },
              { value: 310, name: "分类2" },
              { value: 234, name: "分类3" },
              { value: 135, name: "分类4" },
              { value: 1548, name: "分类5" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart.setOption(this.lineOption);
      myChart2.setOption(this.pieOption);
    },
  },
  mounted() {
    // this.drawLine();
  },
  computed: {
    ...mapGetters(["mobile"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    &-charts {
      display: flex;
      width: 100%;
      &-left {
        flex: 1;
        width: 100%;
      }
      &-right {
        flex: 1;
        width: 100%;
      }
      &-title {
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart {
  max-width: 600px;
  height: 400px;
  border: 2px solid red;
}
.img{
  width: 100%;
  height: calc( 100vh - 180px);
  // background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598167737925&di=bf1796cfcbe64b79b127adc6aea5505f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F72%2F08%2F1557b88ef37a19b.jpg);
  // background-size: cover;
}
</style>
