<template>
    <div class="container">
        <!-- 导航栏 -->
        <div class="top">
            <div class="left">
                <a @click="$router.push('/goods')">
                    <img style="cursor: pointer" src="../../assets/sany-logo.png" class="logo" alt="">
                </a>
            </div>

            <div class="middle">
                <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="/goods">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">主机</template>
                        <el-menu-item index="2-1">混凝土机械</el-menu-item>
                        <el-menu-item index="2-2">挖掘机械</el-menu-item>
                        <el-menu-item index="2-3">起重机械</el-menu-item>
                        <!--<el-submenu index="2-4">
                            <template slot="title">港口机械</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>-->
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">配件</template>
                        <el-menu-item index="3-1">混凝土配件</el-menu-item>
                        <el-menu-item index="3-2">挖掘机配件</el-menu-item>
                        <el-menu-item index="3-3">港口配件</el-menu-item>
                        <!--<el-submenu index="3-4">
                            <template slot="title">自卸车</template>
                            <el-menu-item index="3-4-1">选项1</el-menu-item>
                            <el-menu-item index="3-4-2">选项2</el-menu-item>
                            <el-menu-item index="3-4-3">选项3</el-menu-item>
                        </el-submenu>-->
                    </el-submenu>
                </el-menu>
            </div>

            <div class="right">
                <!-- 输入不了 -待完善 -->
                <el-input clearable placeholder="请输入关键字" style="width: 300px"
                          v-model="searchParameters.inputCondition"></el-input>
                <el-button @click="search" icon="el-icon-search" size="medium" style="margin-left: 10px" type="primary">
                    搜索
                </el-button>
            </div>
        </div>
        <!-- 分割线 -->
        <div style="border-bottom: 1px solid #45454520; margin-top: 3px"></div>

        <div style="background-color: #45454510;">
            <div class="body">
                <el-carousel height="450PX" style="width: 70%; margin: 0 auto;">
                    <el-carousel-item v-for="item in imgs" :key="item.url">
                        <img :src="item.url" alt="" style="width: 100%; height: 100%">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div style="margin: 10px auto 0; width: 70%;">
                <el-row :gutter="10">
                    <el-col :span="6" v-for="item in files" :key="item.id" style="margin-bottom: 10px">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <img :src="fileUrl+item.pictureAddress" @click="$router.push('/detail?id='+item.id)" alt=""
                                 style="width: 100%; cursor: pointer"/>
                            <div style="padding: 14px;">
                                <div @click="$router.push('/detail?id='+item.id)" class="commodity"
                                     style="color: #666; font-size: 18px;">
                                    <b>{{item.commodityName}}</b>
                                </div>
                                <div @click="$router.push('/detail?id='+item.id)" class="commodity">
                                    {{item.commodityIntroduction}}
                                </div>
                                <div @click="$router.push('/detail?id='+item.id)" class="commodity"
                                     style="color: orangered">
                                    ￥{{item.commodityPrice}}元
                                </div>
                                <!--<div style="display:flex; justify-content:center; align-items:center;">
                                    <el-button plain style="width: 95px; text-align: center; font-size: 12px"
                                               type="danger">购买
                                    </el-button>
                                    <el-button plain style="width: 95px; text-align: center; font-size: 12px"
                                               type="info">加入购物车
                                    </el-button>
                                </div>-->
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {listCommoditys} from "@/api/commodity";

    export default {
        name: "Goods",
        data() {
            return {
                pictureAddress: '',
                commodityName: '',
                commodityIntroduction: '',
                commodityPrice: '',
                fileUrl: '',
                searchParameters: {
                    inputCondition: '',
                },
                imgs: [
                    {url: require('../../assets/img1.jpg')},
                ],
                files: [],
            }
        },
        methods: {
            search() {
                this.getList()
            },
            getList() {
                listCommoditys(this.searchParameters).then(res => {
                    this.files = res.data.filter(v => v.pictureAddress !== null)
                })
            },
        },
        mounted() {
            this.fileUrl = this.$url;
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>
    .container {
    }

    .top {
        height: 10vh;
        width: 70%;
        margin: 0 auto;
    }

    .left {
        padding-right: 140px;
        height: 10vh;
        margin-top: 15px;
        float: left;
    }

    .logo {
        width: 174px;
        height: 50px
    }

    .middle {
        height: 10vh;
        text-align: left;
        float: left;
        margin-top: 15px;
    }

    .right {
        height: 10vh;
        text-align: right;
        margin-top: 15px;
        line-height: 8vh;
        float: right;
    }

    .body {
        width: 100%;
        margin: 10px auto 0;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .commodity{
        color: #666;
        padding: 10px;
        font-size: 14px;
        text-align: center;
        cursor: pointer
    }
</style>