import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 配置导出路由
let router = new Router({
    // 个人中心、修改密码、主页、商品详细、下单、购物车、地址、订单、退货
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../layout/components/Home'),
            redirect: '/front',
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
            redirect: '/front',
            children: [
                {
                    path: '/front',
                    name: 'Front',
                    component: () => import('../views/Front'),
                },
            ]
        },
    ]
});

export default router
