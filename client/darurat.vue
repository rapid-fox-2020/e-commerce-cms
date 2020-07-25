<template>
  <div>
    <Login></Login>
    <HomeProducts></HomeProducts>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import HomeProducts from "./views/HomeProducts.vue";

export default {
  components: {
    Login,
    HomeProducts
  }
};
</script>

<style></style>
