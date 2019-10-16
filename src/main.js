// import a from './about';
// console.log(a);
import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router
}).$mount('#app');

//上述写的是 vue 框架语法，webpack默认是不能编译的，需要使用loader处理。
//vue-loader(加载器 loader)搭配 vue-template-compiler(plugin 插件)
