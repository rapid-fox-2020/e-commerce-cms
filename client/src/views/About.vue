<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import store from '../store'
import router from '../router'
export default {
  beforeRouteEnter(to,from,next){
    if(!localStorage.token){
      router.push({path: "/login"})
    } else {
      next()
    }
  }
}
</script>