<template>
    <div class="container">
        <div style="width: 15%; border-bottom: 1px solid #45454520;"/>

        <div class="left">
            <a @click="$router.push('/front')">
                <img src="../assets/sany-logo.png" class="logo" alt="">
            </a>
        </div>

        <div class="middle">
            <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">首页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">主机</template>
                    <el-menu-item index="2-1">混凝土机械</el-menu-item>
                    <el-menu-item index="2-2">挖掘机械</el-menu-item>
                    <el-menu-item index="2-3">起重机械</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">港口机械</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">配件</template>
                    <el-menu-item index="3-1">混凝土配件</el-menu-item>
                    <el-menu-item index="3-2">挖掘机配件</el-menu-item>
                    <el-menu-item index="3-3">港口配件</el-menu-item>
                    <el-submenu index="3-4">
                        <template slot="title">自卸车</template>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                        <el-menu-item index="3-4-2">选项2</el-menu-item>
                        <el-menu-item index="3-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </div>

        <div class="right">
            <el-input clearable placeholder="请输入关键字" style="width: 300px"
                      v-model="searchParameters.inputCondition"></el-input>
            <el-button icon="el-icon-search" size="medium" style="margin-left: 10px" type="primary">搜索
            </el-button>
        </div>

        <div style="width: 15%; border-bottom: 1px solid #45454520;"/>
    </div>
</template>

<script>
    export default {
        name: "FrontHome",
        data() {
            return {
                searchParameters: {
                    inputCondition: '',
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
    }

    .left {
        /*width: 300px;*/
        padding-right: 140px;
        height: 10vh;
        display: flex;
        margin-top: 15px;
        border-bottom: 1px solid #45454520;
    }

    .logo {
        width: 174px;
        height: 64px
    }

    .middle {
        /*width: 300px;*/
        height: 10vh;
        display: flex;
        text-align: left;
        margin-top: 15px;
        /*border: 1px solid red;*/
    }

    .right {
        /*width: 150px;*/
        height: 10vh;
        flex: 1;
        text-align: right;
        margin-top: 15px;
        line-height: 8vh;
        /*border: 1px solid red;*/
        border-bottom: 1px solid #45454520;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>