<template>
  <div class="col-4 mt-4">
      <form v-on:submit.prevent="login" class="login-form col bg-secondary p-3 rounded-lg mt-3">
        <h2>LOGIN</h2><br>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="emailLogin"
          aria-describedby="emailHelp" v-model="email">
          <small id="emailHelpLogin" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="passwordLogin" v-model="password">
        </div> <br>
        <button type="submit" class="btn btn-primary mt-2 mb-2">Login</button><br><br>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const obj = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', obj);
    },
  },
};
</script>

<style></style>
