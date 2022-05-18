<template>
    <el-dialog
            :before-close="handleClose"
            :title="'修改地址'"
            :visible.sync="dialogVisible"
            width="40%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="联系电话">
                <el-input v-model="form.telephoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
                <el-input v-model="form.receivingAddress"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
                <el-button type="primary" @click="onSubmit(form)">修改</el-button>
                <el-button @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {updateAddress} from "@/api/address";

    export default {
        name: "AddressEdit",
        props: {
            isEditShow: Boolean,
            editDialogRow: Object
        },
        data() {
            return {
                form: {
                    id: '',
                    userId: '',
                    userName: '',
                    telephoneNumber: '',
                    receivingAddress: '',
                },
                dialogVisible: this.isEditShow,
            }
        },
        methods: {
            // 提交表单
            onSubmit: function () {
                this.$confirm('确认修改？', '提示', {
                    type: 'warning'
                }).then(() => {
                    updateAddress(this.form).then(res => {
                        if (res.code === 10000) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$parent.getList();
                        }
                    });
                    this.$emit('closeEditDialog');
                }).catch(() => {
                });
            },

            // 关闭弹窗提示
            handleClose() {
                this.$confirm('确认关闭？', '提示')
                    .then(() => {
                        this.$emit('closeEditDialog');
                    })
                    .catch(() => {
                    });
            },
        },
        mounted() {
            this.form.id = this.editDialogRow.id;
            this.form.userId = this.editDialogRow.userId;
            this.form.userName = this.editDialogRow.userName;
            this.form.telephoneNumber = this.editDialogRow.telephoneNumber;
            this.form.receivingAddress = this.editDialogRow.receivingAddress;
        }
    }
</script>

<style scoped>

</style>