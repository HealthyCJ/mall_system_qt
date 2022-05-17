<template>
    <el-dialog
            :before-close="handleClose"
            :title="'确认订单信息'"
            :visible.sync="dialogVisible"
            width="50%">
        <!-- rules无效 - 待完善-->
        <el-form :model="form" :rules="rules" label-width="80px" ref="form">
            <el-form-item label="商品名称">
                <el-input :disabled="true" v-model="form.commodityIntroduction"></el-input>
            </el-form-item>
            <el-form-item label="商品介绍">
                <el-input :disabled="true" type="textarea" v-model="form.commodityIntroduction"></el-input>
            </el-form-item>
            <el-form-item label="商品售价">
                <el-input :disabled="true" v-model="form.commodityPrice"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephoneNumber">
                <el-input v-model="form.telephoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="收获地址" prop="receivingAddress">
                <el-select clearable placeholder="请选择收货地址" size="medium" style="width: 100%"
                           v-model="form.receivingAddress">
                    <el-option
                            :key="item.code"
                            :label="item.name"
                            :value="item.name"
                            v-for="item in typeOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="购买数量">
                <el-input-number v-model="form.nums" :min="1" :max="100" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="总计金额">
                <span>￥ {{form.commodityPrice*form.nums}}元</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
                <el-button type="primary" @click="onSubmit(form)">购买</el-button>
                <el-button @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>

    import {insertCoupon} from "@/api/coupon";

    export default {
        name: "CouponInsert",
        props: {
            isEditShow: Boolean,
            editDialogRow: Object
        },
        data() {
            return {
                form: {
                    commodityId: '',
                    commodityName: '',
                    commodityType: '',
                    commodityIntroduction: '',
                    commodityPrice: '',
                    purchasePrice: '',
                    nums: 1,
                    inventoryQuantity: '',
                    pictureAddress: '',
                    userId: '',
                    userName: '',
                    telephoneNumber: '18855320482',
                    receivingAddress: '北京市 北京市 海淀区 xxx街道xxx小区xxx',
                },
                typeOptions: [
                    {
                        code: 1,
                        name: '安徽省 芜湖市 镜湖区 xxx街道xxx小区xxx'
                    },
                    {
                        code: 2,
                        name: '上海市 上海市 虹口区 xxx街道xxx小区xxx'
                    },
                    {
                        code: 3,
                        name: '北京市 北京市 海淀区 xxx街道xxx小区xxx'
                    }
                ],
                rules: {
                    receivingAddress: [{required: true, message: '请选择收货地址', trigger: 'blur'}],
                    telephoneNumber: [{required: true, message: '请输入联系电话', trigger: 'blur'}]
                },
                dialogVisible: this.isEditShow,
                loading: true,
            }
        },
        methods: {
            // 提交表单
            onSubmit() {
                this.form.userId = JSON.parse(localStorage.getItem("user")).id;
                this.form.userName = JSON.parse(localStorage.getItem("user")).userName;
                insertCoupon(this.form).then(res =>{
                    if (res.code === 10000) {
                        this.$message({
                            message: '购买成功',
                            type: 'success'
                        });
                    }
                    this.$emit('closeEditDialog');
                })
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
            this.form.commodityId = this.editDialogRow.id;
            this.form.commodityName = this.editDialogRow.commodityName;
            this.form.commodityType = this.editDialogRow.commodityType;
            this.form.commodityIntroduction = this.editDialogRow.commodityIntroduction;
            this.form.commodityPrice = this.editDialogRow.commodityPrice;
            this.form.purchasePrice = this.editDialogRow.purchasePrice;
            this.form.inventoryQuantity = this.editDialogRow.inventoryQuantity;
            this.form.pictureAddress = this.editDialogRow.pictureAddress;
        }
    }
</script>

<style scoped>

</style>