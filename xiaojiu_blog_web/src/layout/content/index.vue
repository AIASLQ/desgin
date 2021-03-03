<template>
    <div class="content" v-loading="loading">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            loading:false
        };
    },
    methods: {},
    created() {},
    mounted() { this.loading = false},
    watch: {},
    computed: {},
    }
</script>
<style lang='scss' scoped>
.content{
    min-width: 1200px;
}
</style>