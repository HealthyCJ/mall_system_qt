import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 配置导出路由
let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('../views/Login'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/register/Register'),
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../layout/components/404'),
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('../layout/components/Home'),
            redirect: '/home',
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
