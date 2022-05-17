<template>
    <div class="container">
        <div class="end">
            <div class="left">
                <div class="footer-copyright-text" data-flex="cross:center">
                    <span>©2022 白夜 版权所有</span>
                </div>
                <div class="right">
                    <a href="/#">网站地图</a><a href="/#">联系我们</a><a href="/#">隐私保护</a><a
                        href="/#">法律声明</a><a href="/#">广告法声明</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "End",
        data() {
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin: 0;
        height: 8vh;
        line-height: 8vh;
        user-select: none;
        background-color: #45454510;
    }

    .end {
        width: 70%;
        margin: 0 auto;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }
</style>