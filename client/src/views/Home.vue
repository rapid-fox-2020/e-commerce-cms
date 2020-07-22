<template>
  <div class="home container col-6 mt-3">
    <h1>Login</h1>
    <form v-on:submit.prevent="login">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control"
      aria-describedby="emailHelp" placeholder="Enter email" v-model="emailLogin">
      <small id="emailHelp"
      class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="password-login"
      placeholder="Password" v-model="passwordLogin">
    </div>
      <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
    };
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: 'http://localhost:3002/login',
        data: {
          email: this.emailLogin,
          password: this.passwordLogin,
        },
      })
        .then((results) => {
          this.emaillogin = '';
          this.passwordlogin = '';
          localStorage.accessToken = results.data.accessToken;
          this.$router.push({ name: 'Admin' });
        // this.$emit("toParentLogin", results.data.accessToken)
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
  },
  created() {
  },

};
</script>
