<template>
    <div>
        <!-- 导航栏 -->
        <div class="top">
            <div class="left">
                <a @click="$router.push('/goods')">
                    <img style="cursor: pointer" src="../../../assets/sany-logo.png" class="logo" alt="">
                </a>
            </div>

            <div class="middle">
                <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" router>
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
                <el-input clearable placeholder="请输入关键字" style="width: 300px"/>
                <el-button icon="el-icon-search" size="medium" style="margin-left: 10px" type="primary">
                    搜索
                </el-button>
            </div>
        </div>
        <!-- 分割线 -->
        <div style="border-bottom: 1px solid #45454520; margin-top: 3px"></div>

        <div style="background-color: #45454510; width: 100%; height: 100%; padding: 10px 0">
            <el-card shadow="always" style="width: 70%; margin: 0 auto" v-loading="loading">
                <div style="display: flex">
                    <div style="width: 300px;">
                        <img :src="fileUrl+commodity.pictureAddress" alt=""
                             style="width: 100%; height: 100%"/>
                    </div>
                    <div style="flex: 1; padding-left: 50px">
                        <div class="commodity"><h3>{{commodity.commodityName}}</h3></div>
                        <div class="commodity">介绍：{{commodity.commodityIntroduction}}</div>
                        <div class="commodity" style="color: orangered">价格：￥ {{commodity.commodityPrice}}元</div>
                        <div v-if="commodity.inventoryQuantity<100" class="commodity">
                            库存：{{commodity.inventoryQuantity}}
                        </div>
                        <div v-else class="commodity">库存：100+</div>
                        <div class="commodity">
                            <el-input-number v-model="form.nums" :min="1" :max="100" label="描述文字"></el-input-number>
                            <span style="margin-left: 10px">件</span>
                        </div>
                        <div class="commodity">
                            <el-button plain style="width: 150px;" type="danger">立即购买</el-button>
                            <!--<el-button icon="el-icon-shopping-cart-2" plain style="width: 150px;" type="info">加入购物车</el-button>-->
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {getCommodity} from "@/api/commodity";

    export default {
        name: "Detail",
        data() {
            return {
                id: this.$route.query.id,
                fileUrl: '',
                commodity: {
                    commodityName: '',
                    commodityType: '',
                    commodityIntroduction: '',
                    commodityPrice: '',
                    inventoryQuantity: '',
                    pictureAddress: '',
                },
                loading: true,
                form: {
                    nums: 1,
                }
            }
        },
        methods: {
            getData() {
                getCommodity({id: this.id}).then(res => {
                    this.commodity = res.data;
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.fileUrl = this.$url;
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
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

    .commodity {
        padding: 10px;
        font-size: 14px
    }
</style>