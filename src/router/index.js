import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from "vue-router";

Vue.use(Router);

// 配置导出路由
const routes=[
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
                {
                    path: '/person',
                    name: 'Person',
                    component: () => import('../views/person/Person'),
                },
                {
                    path: '/password',
                    name: 'Password',
                    component: () => import('../views/person/Password'),
                },
                {
                    path: '/orders',
                    name: 'Orders',
                    component: () => import('../views/person/Orders'),
                },
                {
                    path: '/address',
                    name: 'Address',
                    component: () => import('../views/person/Address'),
                },
            ]
        },
    ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
