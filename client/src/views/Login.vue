<template>
  <div
    class="login-admin"
    style="padding: 80px 360px; background-color: white; width: auto;
      height: 705px;"
  >
    <div
      class="form-login border"
      style="color:white; padding: 100px; width: 600px; background-color: #041E3A;"
    >
      <h2 style="text-align: center;">Login Admin</h2>
      <form @submit.prevent="formLogin">
        <div class="form-group">
          <label for="emailLogin">Email address</label>
          <input
            placeholder="Email"
            type="email"
            class="form-control"
            v-model="emailLogin"
            id="emailLogin"
          />
        </div>
        <div class="form-group">
          <label for="passwordLogin">Password</label>
          <input
            placeholder="Password"
            type="password"
            v-model="passwordLogin"
            class="form-control"
            id="passwordLogin"
          />
        </div>

        <button type="submit" class="btn btn-primary" style="width: 400px;">Login</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordLogin: '',
      emailLogin: '',
    };
  },
  methods: {
    formLogin() {
      const password = this.passwordLogin;
      const email = this.emailLogin;
      console.log(email, password, 'ini dari layout');
      this.$store.dispatch('loginAdmin', { email, password });
    },
  },
};
</script>

<style></style>
