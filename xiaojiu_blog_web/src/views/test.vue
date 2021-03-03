<template>
    <div class="test">
        <Header/>
        <div class="box">
        <iframe src="http://localhost:9000/#/detail" class="iframe" scrolling=no; frameborder="0"></iframe>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
    components: {
        Header,Footer
    },
    data() {
        return {

        };
    },
    methods: {},
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    }
</script>
<style lang='scss' scoped>

    .box{
        overflow: hidden;
        .iframe{
            background: #fff;
            height: calc(100vh - 123px);
            width: 100%;
        }
    }
</style>