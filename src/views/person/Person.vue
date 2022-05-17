<template>
    <div>
        <el-card class="Person" shadow="always">
            <el-form ref="form" :model="form" label-width="80px">
                <div style="text-align: center; margin-bottom: 10px">
                    <el-upload
                            :auto-upload="false"
                            :on-change="uploadFile"
                            :show-file-list="false"
                            action="#"
                            class="avatar-uploader">
                        <el-image
                                v-if="form.pictureAddress"
                                :fit="fit"
                                :src="fileUrl+form.pictureAddress"
                                style="width: 100px; height: 100px"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <el-form-item label="员工工号">
                    <el-input :disabled="true" v-model="form.employeeAccount"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名">
                    <el-input v-model="form.employeeName"></el-input>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input type="textarea" v-model="form.employeeIntroduction"></el-input>
                </el-form-item>
                <!--修改密码 - 待完善-->
                <el-form-item label="性别">
                    <el-radio-group v-model="form.employeeGender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="3">未知</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-bottom: 10px">
                    <el-button type="primary" @click="onSubmit(form)">修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {getEmployee, updateEmployee} from "../../api/employee";
    import {deleteFile, uploadFile} from "../../api/file";

    export default {
        name: "Person",
        data() {
            return {
                form: {
                    employeeName: '',
                    employeeAccount: '',
                    employeeGender: '',
                    employeeIntroduction: '',
                    pictureAddress: '',
                },
                fit: "contain",
                fileUrl: '',
                employee: localStorage.getItem("employee") ? JSON.parse(localStorage.getItem("employee")) : {},
            }
        },
        methods: {
            // 做个假的修改密码 - 待完善

            // 获取页面数据
            getData() {
                getEmployee({employeeAccount: this.employee.employeeAccount}).then(res => {
                    if (res.code === 10000) {
                        this.form = res.data;
                    }
                })
            },

            // 提交表单
            onSubmit() {
                this.$confirm('确认修改？', '提示', {
                    type: 'warning'
                }).then(() => {
                    updateEmployee(this.form).then(res => {
                        if (res.code === 10000) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                        this.getData();
                        // 自动更新 - 待完善
                        location.reload();
                    });
                }).catch(() => {
                });
            },

            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            uploadFile(file) {
                if (file.raw) {
                    this.file = file.raw;
                    let formdata = new FormData();
                    formdata.append("file", this.file);
                    uploadFile(formdata).then(res => {
                        this.form.pictureAddress = res.data;
                        if (res.code === 10000) {
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                        }
                    })
                }
            },

            // 文件列表移除文件时的钩子
            deleteFile(fileUrl) {
                fileUrl = this.form.pictureAddress;
                deleteFile(fileUrl).then(res => {
                    if (res.code === 10000) {
                        this.$message({
                            message: '移除成功',
                            type: 'success'
                        });
                    }
                })
            },
        },
        mounted() {
            this.getData();
            this.fileUrl = this.$url;
        }
    }
</script>

<style lang="scss" scoped>
    .Person {
        margin-top: 10px;
        margin-left: 10px;
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
</style>