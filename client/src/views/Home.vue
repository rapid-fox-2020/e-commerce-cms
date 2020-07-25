<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import store from '../store'
import router from '../router'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  beforeRouteEnter(to,from,next){
    if(!localStorage.token){
      router.push({path: "/login"})
    } else {
      next()
    }
  }
}
</script>
