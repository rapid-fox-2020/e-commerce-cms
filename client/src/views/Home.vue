<template>
  <div class="home container col-6 mt-3">
    <h1>Login</h1>
    <form v-on:submit.prevent="login">
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control"
      aria-describedby="emailHelp" placeholder="Enter email" v-model="$store.state.emailLogin">
      <small id="emailHelp"
      class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password-login"
      placeholder="Password" v-model="$store.state.passwordLogin">
    </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
  </form>
  </div>
</template>

<script>
// @ is an alias to /src

// import axios from 'axios';

export default {
  data() {
    return {
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login')
        .then(() => {
          this.$router.push({ name: 'Admin' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
  },

};
</script>
