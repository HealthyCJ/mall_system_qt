<template>
    <div class="Login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <div class="login">
                <div>
                    <div style="margin: 20px 0; text-align: center; font-size: 24px">
                        <b>挖掘机配件商城</b>
                    </div>
                    <el-form-item prop="userAccount">
                        <!--ref被用来给元素或子组件注册引用信息,引用信息将会注册在父组件的$refs对象上-->
                        <el-input placeholder="客户账号" prefix-icon="el-icon-user" ref="userAccount"
                                  type="text"
                                  v-model="loginForm.userAccount"></el-input>
                        <!--去除自动填充和历史记录-->
                        <label>
                            <input type="password" style="display:none"/>
                        </label>
                    </el-form-item>

                    <el-form-item prop="userPassword">
                        <el-input placeholder="密码" prefix-icon="el-icon-lock" ref="userPassword"
                                  type="password"
                                  show-password
                                  v-model="loginForm.userPassword"></el-input>
                        <label>
                            <input style="display:none" type="password"/>
                        </label>
                    </el-form-item>

                    <!--验证码不用注意大小写 - 待完善-->
                    <el-form-item prop="verification" style="position: relative">
                        <el-input placeholder="验证码" prefix-icon="el-icon-circle-check"
                                  v-model="loginForm.verification"></el-input>
                        <span @click="createCode" class="checkCode">{{ checkCode }}</span>
                    </el-form-item>

                    <el-button
                            @click.native.prevent="handleLogin"
                            style="width: 175px;"
                            type="primary">登录
                    </el-button>

                    <el-button
                            @click.native.prevent="handleRegister"
                            style="width: 175px;"
                            type="warning">注册
                    </el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>

    import {userLogin} from "@/api/user";

    export default {
        name: 'Login',
        data() {
            return {
                // 表单校验
                rules: {
                    userAccount: [{required: true, message: '请输入客户账号', trigger: 'blur'}],
                    userPassword: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                loginForm: {
                    userAccount: '',
                    userPassword: '',
                    // 验证码
                    verification: ''
                },
                checkCode: '',
            }
        },
        methods: {
            // 创建随机验证码
            createCode() {
                let code = '';
                const codeLength = 4; //验证码的长度
                const random = [0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F',
                    'G',
                    'H',
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'O',
                    'P',
                    'Q',
                    'R',
                    'S',
                    'T',
                    'U',
                    'V',
                    'W',
                    'X',
                    'Y',
                    'Z']; //随机数
                for (let i = 0; i < codeLength; i++) {
                    //循环操作
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    code += random[index]; //根据索引取得随机数加到code上
                }
                this.checkCode = code; //把code值赋给验证码
            },

            // 验证码判断
            handleLogin() {
                this.login();
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        if (this.loginForm.verification === this.checkCode) {
                            this.login();
                        } else {
                            this.$message({
                                message: '验证码错误，注意大写字母',
                                type: 'warning'
                            });
                            this.createCode();
                            this.loginForm.verification = '';
                        }
                    } else {
                        this.$message({
                            message: '登录失败',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },

            // 调用后台登录判断方法
            login() {
                userLogin(this.loginForm).then(res => {
                    if (res.code === 10000) {
                        // 存储用户信息到浏览器
                        localStorage.setItem("user", JSON.stringify(res.data));
                        // 登陆成功跳转到主页
                        this.$router.push('/home');
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                    } else {
                        this.createCode();
                        this.$message({
                            message: res.data,
                            type: 'warning'
                        });
                    }
                })
            },

            // 注册
            handleRegister() {
                this.$router.push('/register');
            }
        },

        mounted() {
            this.createCode();
        }
    }

</script>

<style lang="scss" scoped>
    .Login {
        height: 100vh;
        background-image: linear-gradient(to bottom right, #373d41, #3F5EFB);
        /*定义溢出元素内容区的内容内容会被修剪，并且其余内容是不可见的*/
        overflow: hidden;
        /*在web浏览器中，如果您在文本上双击，文本会被选取或高亮显示此属性用于阻止这种行为*/
        user-select: none;
    }

    /*.left_login {
        width: 50%;
        !*border: 1px red solid;*!
        background: url(../assets/bg.png) no-repeat 25% center;
    }*/

    .login {
        margin: 200px auto;
        background-color: #fff;
        width: 400px;
        height: 370px;
        padding: 20px;
        border-radius: 10px;
    }

    .el-form-item {
        border-radius: 5px;
        color: #454545;
        width: 360px;
        height: 50px;
        text-align: left;
    }

    .checkCode {
        /*定义了鼠标指针放在一个元素边界范围内时所用的光标形状*/
        cursor: pointer;
        color: #333;
        font-size: 18px;
        position: absolute;
        right: 20px;
        top: 2px;
    }
</style>