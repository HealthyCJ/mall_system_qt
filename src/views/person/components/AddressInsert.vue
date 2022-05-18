<template>
    <el-dialog
            :before-close="handleClose"
            :title="'新增收货地址信息'"
            :visible.sync="dialogVisible">
        <el-form :model="form" :rules="rules" label-width="80px" ref="form">
            <el-form-item label="联系电话">
                <el-input v-model="form.telephoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
                <el-input v-model="form.receivingAddress"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
                <el-button type="primary" @click="onSubmit(form)">新增</el-button>
                <el-button @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>

    import {insertAddress} from "@/api/address";

    export default {
        name: "AddressInsert",
        props: {
            isInsertShow: Boolean,
            insertDialogRow: Object
        },
        data() {
            return {
                form: {
                    userId: '',
                    userName: '',
                    telephoneNumber: '',
                    receivingAddress: '',
                },
                rules: {
                    telephoneNumber: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
                    receivingAddress: [{required: true, message: '请输入收货地址', trigger: 'blur'}],
                },
                dialogVisible: this.isInsertShow,
            }
        },
        methods: {
            // 提交表单
            onSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // 表单数据验证完成之后，提交数据
                        this.$confirm('确认增加？', '提示', {
                            type: 'warning'
                        }).then(() => {
                            this.form.userId = JSON.parse(localStorage.getItem("user")).id;
                            this.form.userName = JSON.parse(localStorage.getItem("user")).userName;
                            insertAddress(this.form).then(res => {
                                if (res.code === 10000) {
                                    this.$message({
                                        message: '增加成功',
                                        type: 'success'
                                    });
                                    this.$parent.getList();
                                }
                            });
                            this.$emit('closeInsertDialog');
                        }).catch(() => {
                        });
                    }
                })
            },

            // 关闭弹窗提示
            handleClose() {
                this.$confirm('确认关闭？', '提示')
                    .then(() => {
                        this.$emit('closeInsertDialog');
                    })
                    .catch(() => {
                    });
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>