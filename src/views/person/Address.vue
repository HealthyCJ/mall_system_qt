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

        <div class="Address">
            <div>
                <div style="padding-bottom: 10px;">
                    <el-button @click="insertAddress"
                               icon="el-icon-circle-plus-outline" size="medium"
                               type="warning">新增
                    </el-button>
                </div>
                <el-table
                        :data="tableData"
                        border
                        highlight-current-row
                        size="medium"
                        stripe
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            label="序号"
                            prop="id"
                            show-overflow-tooltip>
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
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="handleEdit(scope.row)"
                                    icon="el-icon-edit"
                                    size="mini" type="primary">修改
                            </el-button>
                            <el-button
                                    @click="handleDelete(scope.row)"
                                    icon="el-icon-delete"
                                    size="mini" type="danger">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--@closeDialog子传父调用函数-->
            <AddressInsert :insertDialogRow="insertDialog.insertDialogRow" :isInsertShow="insertDialog.insertShow"
                           @closeInsertDialog="hideInsertDialog"
                           v-if="insertDialog.insertShow"/>
            <AddressEdit :editDialogRow="editDialog.editDialogRow" :isEditShow="editDialog.editShow"
                         @closeEditDialog="hideEditDialog"
                         v-if="editDialog.editShow"/>
        </div>
    </div>
</template>

<script>
    import AddressInsert from "@/views/person/components/AddressInsert";
    import AddressEdit from "@/views/person/components/AddressEdit";
    import {deleteAddress, getAddress} from "@/api/address";

    export default {
        name: "Address",
        components: {
            AddressInsert,
            AddressEdit,
        },
        data() {
            return {
                tableData: [],
                pageTotal: 10,
                insertDialog: {
                    insertShow: false,
                    insertDialogRow: {}
                },
                editDialog: {
                    editShow: false,
                    editDialogRow: {}
                },
                loading: true,
            }
        },
        methods: {
            getList() {
                let id = JSON.parse(localStorage.getItem("user")).id;
                getAddress({id: id}).then(res => {
                    this.tableData = res.data;
                    this.loading = false;
                })
            },

            insertAddress() {
                this.insertDialog.insertShow = true;
            },

            // 子组件隐藏Dialog对话框回调函数
            hideInsertDialog() {
                this.insertDialog.insertShow = false;
            },

            handleEdit(row) {
                this.editDialog.editDialogRow = {...row};
                this.editDialog.editShow = true;
            },

            // 子组件隐藏Dialog对话框回调函数
            hideEditDialog() {
                this.editDialog.editShow = false;
            },

            handleDelete(row) {
                this.$confirm('确认删除该收货地址信息吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteAddress({id: row.id}).then(res => {
                        if (res.code === 10000) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
        },
        mounted() {
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

    .Person {
        margin: 0 auto;
        width: 500px;
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

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .Address {
        margin: 0 auto;
        width: 71%;
        padding: 10px;
    }
</style>