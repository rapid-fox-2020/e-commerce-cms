<template>
  <div class="d-flex justify-content-lg-center">
    <!-- Start Form Login -->
    <div>
      <h3>Login</h3>

      <form @submit.prevent="processLogin">
        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control"
            placeholder="Email Here..."
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password Here.."
            v-model="user.password"
          />
        </div>
        <button type="submit" class="btn btn-primary">login</button>
      </form>
    </div>
    <!-- End Form Login -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
        toDashboard: () => {
          this.$router.push({ name: 'ProductPage' });
        },
      },
    };
  },
  methods: {
    processLogin() {
      this.$store.dispatch('login', this.user);
      this.user.email = '';
      this.user.password = '';
    },
  },
};
</script>
