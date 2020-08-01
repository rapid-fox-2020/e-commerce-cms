<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">My-Ecommerce-CMS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
      aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.isLoggedIn">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.isLoggedIn">
          <router-link to="/banners" class="nav-link">Banner</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.isLoggedIn">
          <router-link to="/secrets" class="nav-link">Secrets</router-link>
        </li>
      </ul>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle mr-4"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false"
        v-if="$store.state.isLoggedIn">
      Show Product By Category
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <router-link v-for="category in $store.state.categories"
      :key="category.id"
      :to="{ name: 'ProductByCategory', params: {category: category} }"
      class="dropdown-item">{{ category }}</router-link>
    </div>
    </div>
      <button type="button" class="btn btn-danger"
      v-if="$store.state.isLoggedIn" @click="logout">Logout</button>
  </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('SET_LOGOUT');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style>

</style>
