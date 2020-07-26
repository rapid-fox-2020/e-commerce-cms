<template>
  <div>
    <h1 class="text-center mt-5">CMS Admin</h1>
    <div class="login-form">
      <form @submit.prevent="login()">
        <h2 class="text-center">Log in</h2>
        <div class="form-group mt-4">
          <label>Email address</label>
          <input type="email" class="form-control" v-model="loginEmail"/>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="loginPassword"/>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block mt-4">login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.loginEmail, password: this.loginPassword });
    }
  }
};
</script>

<style scoped>
  .login-form {
    width: 340px;
    margin: 50px auto;
    font-size: 15px;
  }
  .login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }
</style>
