<template>
    <!-- login page START -->
    <div id="loginPage">
      <div id="loginForm">
        <i class="fa fa-cubes" aria-hidden="true"></i>
        <form @submit.prevent="processLogin">
          <h4>Login Page</h4>
          <hr>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
            v-model="email"
            type="email"
            class="form-control"
            id="email" placeholder="email@example.com">
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
            v-model="password"
            type="password"
            class="form-control" id="password" placeholder="*****">
          </div>
          <div class="form-group form-check">
            <input @click="togglePassword('password')"
            type="checkbox" class="form-check-input">
            <label class="form-check-label">
              Show password
            </label>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
    <!-- login page END -->
</template>

<script>
import swal from 'sweetalert';
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    togglePassword(id) {
      const x = document.getElementById(id);
      if (x.type === 'password') {
        x.type = 'text';
      } else {
        x.type = 'password';
      }
    },
    processLogin() {
      axios({
        method: 'POST',
        url: 'https://murmuring-headland-34171.herokuapp.com/login',
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token);
          this.$router.push({ name: 'ProductTable' });
        })
        .catch((err) => {
          const error = err.response.data.message;
          swal('Error', `${error}`, 'error');
        });
    },
  },
};
</script>
