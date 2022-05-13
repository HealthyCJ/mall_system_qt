<template>
    <div class="container">
        <div style="width: 15%;"/>
        <div class="left">您好！欢迎来到购物商城</div>
        <div style="flex: 1">
            <!--<ul style="list-style: none; background-color: #98FB98">
                <li class="item"><a href="/">菜单1</a></li>
                <li class="item"><a href="/">菜单2</a></li>
                <li class="item"><a href="/">菜单3</a></li>
                <li class="item"><a href="/">菜单4</a></li>
            </ul>-->
        </div>
        <div class="right" v-if="!user.userAccount">
            <el-button @click="$router.push('/login')">登陆</el-button>
            <el-button @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else class="sign-out">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :src="this.$url+user.pictureAddress"
                               style="position: relative; top: 10px; right: 5px"/>
                    <span>{{user.userName}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="$router.push('/person')">个人中心</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div style="width: 15%;"/>
    </div>
</template>

<script>
    import {getUser} from "@/api/user";

    export default {
        name: "TheHeading",
        data() {
            return {
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            }
        },
        methods: {
            getData() {
                let userAccount = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).userAccount : "";
                if (userAccount) {
                    getUser({userAccount}).then(res => {
                        if (res.code === 10000) {
                            this.user = res.data;
                        }
                    })
                }

            },
            exit() {
                this.$confirm('确认退出吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    //确认
                    this.$store.commit("logout");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        height: 8vh;
        line-height: 8vh;
        user-select: none;
        background-color: #45454510;
    }

    .left{
        width: 20%;
        text-align: left;
    }

    .right{
        text-align: right;
        width: 20%;
        padding-right: 10px;
    }

    .sign-out {
        text-align: right;
        width: 20%;
    }

    .el-dropdown-link {
        padding-right: 10px;
        cursor: pointer;
    }
</style>