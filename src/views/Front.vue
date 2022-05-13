<template>
    <div class="container">
        <div style="width: 15%;"/>
        <div class="top">
            <a @click="$router.push('/front')">
                <img src="../assets/sany-logo.png" class="logo">
            </a>
        </div>

        front
        <div style="width: 15%;"/>
    </div>
</template>

<script>
    export default {
        name: "FrontHome",
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
    }

    .top {
        height: 8vh;
    }

    .logo {
        width: 174px;
        height: 64px
    }

    .item {
        display: inline-block;
        width: 100px;
        text-align: center;
        cursor: pointer;
    }

    .item a {
        color: #1E90EF;
    }

    .item:hover {
        background-color: lightblue;
    }
</style>