<template>
    <el-dialog
            :before-close="handleClose"
            :title="'申请退货'"
            :visible.sync="dialogVisible"
            top="8vh">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
                {{form.commodityName}}
            </el-form-item>
            <el-form-item label="购买数量">
                {{form.nums}}件
            </el-form-item>
            <el-form-item label="总计价格">
                ￥ {{form.total}}元
            </el-form-item>
            <el-form-item label="联系电话" prop="telephoneNumber">
                {{form.telephoneNumber}}
            </el-form-item>
            <el-form-item label="收获地址" prop="receivingAddress">
                {{form.receivingAddress}}
            </el-form-item>
            <el-form-item label="退货理由" prop="createTime">
                <el-input type="textarea" v-model="form.reason"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
                <el-button type="primary" @click="onSubmit(form)">退货</el-button>
                <el-button @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {applyForRefund} from "@/api/coupon";

    export default {
        name: "Refund",
        props: {
            isEditShow: Boolean,
            editDialogRow: Object
        },
        data() {
            return {
                form: {
                    id:'',
                    commodityId: '',
                    commodityName: '',
                    commodityType: '',
                    commodityIntroduction: '',
                    commodityPrice: '',
                    purchasePrice: '',
                    inventoryQuantity:'',
                    nums: '',
                    total: '',
                    profit: '',
                    pictureAddress: '',
                    userId: '',
                    userName: '',
                    telephoneNumber: '',
                    receivingAddress: '',
                    reason: '',
                },
                dialogVisible: this.isEditShow,
            }
        },
        methods: {
            // 提交表单
            onSubmit() {
                this.$confirm('确认退货？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.form.userId = JSON.parse(localStorage.getItem("user")).id;
                    applyForRefund(this.form).then(res => {
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
            this.form.commodityId = this.editDialogRow.commodityId;
            this.form.commodityName = this.editDialogRow.commodityName;
            this.form.commodityType = this.editDialogRow.commodityType;
            this.form.commodityIntroduction = this.editDialogRow.commodityIntroduction;
            this.form.commodityPrice = this.editDialogRow.commodityPrice;
            this.form.purchasePrice = this.editDialogRow.purchasePrice;
            this.form.nums = this.editDialogRow.nums;
            this.form.total = this.editDialogRow.total;
            this.form.profit = this.editDialogRow.profit;
            this.form.pictureAddress = this.editDialogRow.pictureAddress;
            this.form.userName = this.editDialogRow.userName;
            this.form.telephoneNumber = this.editDialogRow.telephoneNumber;
            this.form.receivingAddress = this.editDialogRow.receivingAddress;
        }
    }
</script>

<style lang="scss" scoped>

</style>