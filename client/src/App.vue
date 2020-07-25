<template>
  <div id="app">
    <div id="nav">
      
      <!-- <div v-if="!$store.state.isLogin">
        <router-link to="/"> Login </router-link> 
      </div> -->

      <div v-if="$store.state.isLogin">
     
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <router-link class="navbar-brand" to="/home"> StoreStor Admin </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-item nav-link" to="/add-product"> Add Product </router-link> 
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-item nav-link" @click.prevent="logout" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        



      </div>
      
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      localStorage.clear()
      this.$store.commit(`SET_LOGIN`, false)
      this.$router.push({ path: '/' })
    }
  },
  created(){
    console.log(`masuk`)
    if(localStorage.access_token){
      this.$store.commit(`SET_LOGIN`, true)
    } else {
      this.$store.commit(`SET_LOGIN`, false)
    }
  }
}
</script>

<style scoped>
  .navbar {
    margin-bottom: 50px;
  }

  .nav-link {
    font-size: 20px;
  }
</style>
