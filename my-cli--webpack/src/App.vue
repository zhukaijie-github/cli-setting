<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <img src="@/assets/img/txm.png" alt="" srcset="" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello vue',
    };
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 200px;
}
</style>
