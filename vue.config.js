// let 声明的变量只在 let 命令所在的代码块内有效。
// const 声明一个只读的常量，一旦声明，常量的值就不能改变。
const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  chainWebpack:(config)=>{
    //set:第一个参数设置的别名，第二个参数设置的路径
    config.resolve.alias
        .set('@', resolve('src'))
        .set('@api', resolve('src/api'))
        .set('@assets', resolve('src/assets'))
        .set('@components', resolve('src/components'))
        .set('@views', resolve('src/views'));
  },

  devServer: {
    port: 8081, //选填
    proxy: { //设置代理，必须填
      '/api': { //设置拦截器  拦截器格式  斜杠+拦截器名字，名字可以自己定
        target: 'http://localhost:8080', //代理的目标地址
        changeOrigin: true, //是否设置同源，输入是的
        pathRewrite: { //路径重写
          '^/api': '' //选择忽略拦截器里面的内容
        }
      }
    }
  }
}