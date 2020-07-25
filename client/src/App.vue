<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import router from './router';

export default {
  name: 'App',
  // created() {
  //   if (localStorage.access_token) {
  //     router.push({path: '/'});
  //   } else {
  //     router.push({path: '/login'});
  //   }
  // }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
