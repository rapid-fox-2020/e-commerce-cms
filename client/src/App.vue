<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  created() {
    if (localStorage.access_token) {
      this.$store.commit("SET_LOGIN", true);
      // if (this.$route.name !== "DashBoard") {
      //   this.$router.push({ path: "/dashboard" });
      // }
    } else {
      // console.log(this.$route.name, "<<<<<<<<<<<");
      this.$store.commit("SET_LOGIN", false);
      // if (this.$route.name !== "Login") {
      //   this.$router.push({ path: "/" });
      // }
    }
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>