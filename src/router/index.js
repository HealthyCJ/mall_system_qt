import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 配置导出路由
let router = new Router({
    // 地址、订单、退货、个人中心、修改密码）
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../layout/components/Home'),
            redirect: '/goods',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/register/Register'),
        },
        {
            path: '*',
            name: '404',
            component: () => import('../layout/components/404'),
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('../layout/components/Home'),
            redirect: '/goods',
            children: [
                {
                    path: '/goods',
                    name: 'goods',
                    component: () => import('../views/goods/Goods'),
                },
                {
                    path: '/detail',
                    name: 'Detail',
                    component: () => import('../views/goods/components/Detail'),
                },
            ]
        },
    ]
});

export default router
