<template>
  <section class="form-login mt-5">
    <div class="row justify-content-md-center">
      <div class="col-4">
        <form @submit.prevent="login">
          <h1 class="text-center">E-Commerce CMS</h1>
          <h3 class="text-center card-title">Login</h3>
          <br>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              v-model="emailLogin"
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
            />
            <small class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="passwordLogin" id="passwordLogin" type="password" class="form-control"/>
          </div>
          <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.emailLogin,
        password: this.passwordLogin,
        cb: () => {
          this.$router.push('/dashboard');
        },
      });
    },

  },
};
</script>
