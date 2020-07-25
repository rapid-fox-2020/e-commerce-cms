<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark
      d flex justify-content-between shadow-sm p-3 mb-5 rounded"
      id="nav"
    >
      <a class="navbar-brand">E-COMMERCE</a>
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to='/Products'>Products</router-link>
          </li>
        </ul>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="Middle" v-if="!$store.state.isLogin">KRUGENZACTH</div>
      <div class="nav-item dropdown float-sm-left">
        <a
          class="nav-link dropdown-toggle text-white"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          v-if="$store.state.isLogin"
        >{{this.$store.state.email}}</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/Login" @click="logout()">Logout</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  created() {
    this.renderEmailName();
  },
  data() {
    return {
      emailName: '',
    };
  },
  methods: {
    logout() {
      this.$store.commit('SET_LOGOUT');
    },
    renderEmailName() {
      this.emailName = this.$store.state.email;
    },
  },
};
</script>

<style>
#nav {
  background-color: rgba(105, 110, 163, 0.801);
}
#Middle {
  font-family: "Bungee", cursive;
  font-size: 30px;
  margin-right: 110px;
  color: black;
}
#navbarDropdown {
  font-family: "Bungee", cursive;
}
</style>
