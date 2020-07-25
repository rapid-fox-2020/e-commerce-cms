<template>
  <div>
    <h1> E-commerse CMS Login </h1>
    <form @submit.prevent="processLogin" >
      <div class="container" style="width: 30%">
      <p class="text-danger"> {{this.$store.state.errMsg}}</p>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> Email </span>
          </div>
          <input v-model="email" type="text" class="form-control" placeholder="Email"
          aria-label="Email" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> Password </span>
          </div>
          <input v-model="password" type="password" class="form-control" placeholder="Password"
          aria-label="Password" aria-describedby="basic-addon1">
        </div>
      </div>
      <button type="submit" class="btn btn-primary"> Login </button>
    </form>
    <hr>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    processLogin() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('processLogin', loginData);
    },
  },
};
</script>

<style>
  h1{
    font-family: 'Lobster', cursive;
    font-size: 40pt;
  }
</style>
