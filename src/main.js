// main.js是整个项目的入口文件
import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import App from './App.vue';

import '@assets/css/global.css'

// 关闭vue的生产提示
Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.prototype.$url = 'http://localhost:8081/api';

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
