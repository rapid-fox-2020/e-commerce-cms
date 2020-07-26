 <template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">MyCMS</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/products">
              <a>List Product</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add">
              <a>Add Product</a>
            </router-link>
          </li>
        </ul>
        <button @click="logout" class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "../router";

export default {
  methods: {
    logout() {
      localStorage.clear();
      router.push({ name: "Login" });
      this.$swal("Success Logout!", ``, "success");
    }
  }
};
</script>

<style>
</style>