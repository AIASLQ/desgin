<template>
  <div class="layout" id="top">
    <Header />
    <Content />
    <Footer />
    <div class="to-top" @click="jump('top')" :class="isShowTopBtn ? 'showBtn' : ''">
      <img src="https://jdqiong.cn/img/backToTop.f7364f79.png" alt />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Content from "./content/index";
export default {
  components: {
    Header,
    Footer,
    Content,
  },
  data() {
    return {
        isShowTopBtn: false
    };
  },
  methods: {
    jump(id) {
      document.querySelector(`#${id}`).scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
    handlerScrool(){
        if(document.documentElement.scrollTop > 150){
            this.isShowTopBtn = true
        }else{
            this.isShowTopBtn = false
        }
        
    }
  },
  mounted(){
      window.addEventListener('scroll', this.handlerScrool)
  },
  destroyed(){
      window.removeEventListener('scroll', this.handlerScrool)
  }
};
</script>
<style lang='scss' scoped>
.layout {
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  .to-top {
    position: fixed;
    bottom: -80px;
    right: 6%;
    z-index: 10;
    transition: all 0.5s;
    img {
      width: 50px;
      cursor: pointer;
      opacity: .5;
    }
    &:hover {
      transform: translateY(-15px);
    }
  }
  .showBtn{
      bottom: 40px;
  }
}

body,
html {
  font-size: 24px;
}
</style>