<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import store from '../store'
import router from  '../router'

export default {
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    if (!store.state.isLogin){
        router.push({ path: '/' })
    } else {
        next()
    }
  },
}
</script>