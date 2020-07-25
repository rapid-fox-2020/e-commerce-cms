<template>
  <div id="app">
    <div id="nav" class="bg-dark">
      <router-link v-if="$store.state.isLogin || isLogin" to="/list"
      class="text-warning mr-4">List Product</router-link> |
      <button class="btn btn-danger ml-4" v-if="$store.state.isLogin || isLogin"
      @click="processLogout">Logout</button>
    </div>
    <hr>
    <router-view/>
     <div id="nav" class="bg-dark" style="height:100px">
       <p class="text-warning"> @copyright CMS E-Commerse: Bima Nathanael</p>
    </div>
  </div>
</template>

<script>
import router from './router';

export default {
  data() {
    return {
      isLogin: false,
    };
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    processLogout() {
      localStorage.clear();
      this.isLogin = false;
      this.$store.dispatch('processLogout');
      router.push({ name: 'Login' });
    },
  },
};
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Roboto', sans-serif;
  /* font-family: 'Sora', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
