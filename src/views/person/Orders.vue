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
                <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" router>
                    <el-menu-item index="/goods">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">主机</template>
                        <el-menu-item index="/goods">混凝土机械</el-menu-item>
                        <el-menu-item index="/goods">挖掘机械</el-menu-item>
                        <el-menu-item index="/goods">起重机械</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">配件</template>
                        <el-menu-item index="/goods">混凝土配件</el-menu-item>
                        <el-menu-item index="/goods">挖掘机配件</el-menu-item>
                        <el-menu-item index="/goods">港口配件</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>

            <div class="right">
                <!-- 输入不了 -待完善 -->
                <el-input clearable placeholder="请输入关键字" style="width: 300px"></el-input>
                <el-button icon="el-icon-search" size="medium" style="margin-left: 10px" type="primary">
                    搜索
                </el-button>
            </div>
        </div>
        <!-- 分割线 -->
        <div style="border-bottom: 1px solid #45454520; margin-top: 3px"></div>

        <div class="Orders">
            <div class="body">
                <!--利润统计，做报表待完善 - 待完善-->
                <el-table
                        :data="tableData"
                        border
                        highlight-current-row
                        size="medium"
                        stripe
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            label="商品名称"
                            prop="commodityName"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            label="购买数量"
                            prop="nums"
                            show-overflow-tooltip
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="总计价格"
                            prop="total"
                            show-overflow-tooltip
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="联系电话"
                            prop="telephoneNumber"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            label="收货地址"
                            prop="receivingAddress"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            label="下单日期"
                            prop="createTime"
                            show-overflow-tooltip
                            sortable>
                    </el-table-column>
                    <el-table-column
                            :formatter="refundFormatter"
                            label="是否退款"
                            prop="isRefund"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="pictureAddress" label="商品图片" align="center">
                        <template slot-scope="scope">
                            <el-image
                                    :fit="fit"
                                    :src="fileUrl+scope.row.pictureAddress"
                                    style="width: 100px; height: 100px"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="handleEdit(scope.row)"
                                    icon="el-icon-circle-check"
                                    size="mini" type="primary">退货
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <Pagination :pageTotal="pageTotal"
                            @handleCurrentChange="handleCurrentChange"
                            @handleSizeChange="handleSizeChange"/>
            </div>
            <Refund :editDialogRow="editDialog.editDialogRow" :isEditShow="editDialog.editShow"
                           @closeEditDialog="hideEditDialog"
                           v-if="editDialog.editShow"/>
        </div>
    </div>
</template>

<script>

    import Pagination from "../../components/pagination";
    import {listCoupons} from "@/api/coupon";
    import Refund from "@/views/person/components/Refund";

    export default {
        name: "Orders",
        components: {
            Pagination,
            Refund
        },
        data() {
            return {
                tableData: [],
                searchParameters: {
                    userId: '',
                    pageNum: 0,
                    pageSize: 5
                },
                editDialog: {
                    editShow: false,
                    editDialogRow: {}
                },
                pageTotal: 0,
                fit: "contain",
                fileUrl: '',
                loading: true,
                refundOptions: [
                    {
                        code: 0,
                        name: '不退款'
                    },
                    {
                        code: 1,
                        name: '退款'
                    }
                ],
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            }
        },
        methods: {
            // 获取页面数据
            getList() {
                this.searchParameters.userId = JSON.parse(localStorage.getItem("user")).userId;
                listCoupons(this.searchParameters).then(res => {
                    this.pageTotal = res.data.total;
                    this.tableData = res.data.rows;
                    this.loading = false;
                })
            },

            handleEdit(row) {
                this.editDialog.editDialogRow = {...row};
                this.editDialog.editShow = true;
            },

            // 子组件隐藏Dialog对话框回调函数
            hideEditDialog() {
                this.editDialog.editShow = false;
            },

            // 上下分页
            handleCurrentChange(val) {
                this.searchParameters.pageNum = val;
                this.getList();
            },

            // 每页显示多少条
            handleSizeChange(val) {
                this.searchParameters.pageSize = val;
                this.getList();
            },

            refundFormatter(row) {
                let data = '';
                this.refundOptions.forEach((item) => {
                    if (row.isRefund === item.code) {
                        data = item.name;
                    }
                })
                return data;
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

    .Orders {
        margin: 0 auto;
        width: 71%;
        padding: 10px;
    }

    .el-form-item {
        border-radius: 5px;
        color: #454545;
        width: 360px;
        height: 50px;
        text-align: left;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
</style>