<template>
  <div>
    <h1>webpack 搭建 vue 开发环境</h1>
    <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <router-link to="/about">关于</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
//当打包编译的时候如果不写 vue 后缀名就编译失败  说不认识这个模块
//解决方案修 webpack 改配置文件
export default {
  name: "app"
  // created() {
  //   console.log(10);
  // }
};
</script>

<style scoped lang='scss'>
h1 {
  color: red;
}
</style>