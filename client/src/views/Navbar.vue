<template>
  <!-- Navbar -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style=" background-color: #e3f2fd;">
      <a class="navbar-brand" href="#">E-Commerce</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item active">
            <router-link to="/" class="nav-link">
              Home
              <span class="sr-only">(current)</span>
            </router-link>
          </li> -->
          <li class="nav-item active">
            <router-link to="/dashboard" class="nav-link">
            Dasboard
            <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">Banner</router-link>
          </li>
        </ul>
        <div class="ml-auto">
          <a type class="text-white btn btn-danger btn-sm"
          @click.prevent="processlogout()">Logout</a>
        </div>
      </div>
    </nav>
  </div>
  <!-- End Navbar -->
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    processlogout() {
      console.log('testing logout');
      this.$store.commit('SET_LOGOUT');
    },
  },
};
</script>
