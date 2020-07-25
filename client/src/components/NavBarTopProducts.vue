<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <button type="button" @click="logout" class="btn btn-danger">Logout</button>
        </li>
      </ul>
    </div>
    <router-view />
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style></style>
