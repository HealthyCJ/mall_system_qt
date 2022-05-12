<template>
    <div>
        <div style="display: flex; height: 60px; line-height: 60px; border-bottom: 1px solid #ccc">
            <div style="width: 200px; text-align: center">欢迎来到购物商城</div>
            <div style="flex: 1">
                <ul style="list-style: none; background-color: #98FB98">
                    <li class="item"><a href="/">菜单1</a></li>
                    <li class="item"><a href="/">菜单2</a></li>
                    <li class="item"><a href="/">菜单3</a></li>
                    <li class="item"><a href="/">菜单4</a></li>
                </ul>
            </div>
            <div style="width: 200px">
                昵称
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "Home",
        /*data() {
        },
        methods: {},
        mounted: {}*/
    }
</script>

<style lang="scss" scoped>
    .item {
        display: inline-block;
        width: 100px;
        text-align: center;
        cursor: pointer;
    }
    .item a{
        color: #1E90EF;
    }
    .item:hover{
        background-color: lightblue;
    }
</style>