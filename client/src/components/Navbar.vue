<template>
  <div>
    <!-- Start Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Mugi CMS</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'ProductPage' }"
              >Products <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ userEmail }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a role="button" class="dropdown-item" @click.prevent="processLogout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <br />
    <br />
    <!-- End Navbar -->
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    userEmail() {
      return localStorage.getItem("userName");
    }
  },
  methods: {
    processLogout() {
      this.$store.dispatch("logout", () => {
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>

<style></style>
