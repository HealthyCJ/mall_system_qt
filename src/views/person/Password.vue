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

        <el-card class="Password" shadow="always">
            <el-form :model="form" :rules="rules" label-width="80px" ref="form">
                <el-form-item prop="userPassword">
                    <el-input autocomplete="off" placeholder="请输入旧密码" prefix-icon="el-icon-lock" show-password
                              type="password"
                              v-model="form.userPassword"></el-input>
                </el-form-item>
                <el-form-item prop="newPwd">
                    <el-input autocomplete="off" placeholder="请输入新密码" prefix-icon="el-icon-lock" show-password
                              type="password"
                              v-model="form.newPwd"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input autocomplete="off" placeholder="请确认密码" prefix-icon="el-icon-circle-check"
                              show-password
                              type="password"
                              v-model="form.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm" style="width: 135px;" type="primary">
                        提交
                    </el-button>

                    <el-button @click="$router.push('/goods')" style="width: 135px;" type="warning">
                        返回首页
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Password",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    userPassword: '',
                    newPwd: '',
                    checkPass: '',
                },
                rules: {
                    userPassword: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
                    newPwd: [{validator: validatePass, trigger: 'blur'},
                        {required: true, message: '请输入新密码', trigger: 'blur'}],
                    checkPass: [{validator: validatePass2, trigger: 'blur'}]
                },
            }
        },
        methods: {
            // 修改密码 - 待完善
            updatePwd() {
                this.$router.push('/login');
                this.$message({
                    message: '密码修改成功',
                    type: 'success'
                });
            },

            submitForm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.updatePwd();
                    } else {
                        return false;
                    }
                });
            },
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

    .Password {
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
</style>