<template>
    <div class="Register">
        <el-form :label-position="labelPosition" :model="registerForm" :rules="rules" ref="registerForm">
            <div class="register">
                <div>
                    <div style="margin: 20px 0; text-align: center; font-size: 24px">
                        <b>注册账号</b>
                    </div>
                    <!--注册只要员工姓名，工号后台默认生成 - 待完善-->
                    <el-form-item prop="userAccount">
                        <el-input autocomplete="off" placeholder="请输入员工工号" prefix-icon="el-icon-user-solid" type="text"
                                  v-model="registerForm.userAccount"></el-input>
                    </el-form-item>

                    <el-form-item prop="userName">
                        <el-input autocomplete="off" placeholder="请输入用户名" prefix-icon="el-icon-user" type="text"
                                  v-model="registerForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="userPassword">
                        <el-input autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password
                                  type="password"
                                  v-model="registerForm.userPassword"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input autocomplete="off" placeholder="请确认密码" prefix-icon="el-icon-circle-check"
                                  show-password
                                  type="password"
                                  v-model="registerForm.checkPass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submitForm"
                                   style="width: 175px;"
                                   type="primary">提交
                        </el-button>

                        <el-button
                                @click="$router.push('/goods')"
                                style="width: 175px;"
                                type="warning">返回首页
                        </el-button>
                    </el-form-item>

                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {insertUser} from "@/api/user";

    export default {
        name: "Register",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.userPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    userAccount: '',
                    userName: '',
                    userPassword: '',
                    checkPass: ''
                },
                rules: {
                    userAccount: [{required: true, message: '请输入用户账号', trigger: 'blur'}],
                    userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    userPassword: [{validator: validatePass, trigger: 'blur'},
                        {required: true, message: '请输入密码', trigger: 'blur'}],
                    checkPass: [{validator: validatePass2, trigger: 'blur'}]
                },
                labelPosition: 'right',
            };
        },
        methods: {
            // 注册员工
            register() {
                insertUser(this.registerForm).then(res => {
                    if (res.code === 10000) {
                        // 登陆成功跳转到主页
                        this.$router.push('/login');
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.data,
                            type: 'warning'
                        });
                    }
                })
            },

            // 提交表单
            submitForm() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.register();
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .Register {
        height: 100vh;
        background-image: linear-gradient(to bottom right, #373d41, #3F5EFB);
        /*定义溢出元素内容区的内容内容会被修剪，并且其余内容是不可见的*/
        overflow: hidden;
        /*在web浏览器中，如果您在文本上双击，文本会被选取或高亮显示此属性用于阻止这种行为*/
        user-select: none;
    }

    .register {
        margin: 130px auto;
        background-color: #fff;
        width: 400px;
        height: 450px;
        padding: 20px;
        border-radius: 10px;
    }

    .el-form-item {
        border-radius: 5px;
        color: #454545;
        width: 360px;
        height: 50px;
        /*text-align: left;*/
    }
</style>