<template>
  <div class="container mt-5 shadow-sm p-3 mb-5 bg-white rounded" style="width: 500px">
    <h1 class="display-5 text-center">Login Page</h1>

    <div>
      <img
        src="https://coworker.imgix.net/photos/south-africa/pretoria/the-workspace-pretoria/8-1561380225.jpg"
        class="img-thumbnail"
      />
    </div>
    <form @submit.prevent="login()">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" />
        <small id="emailHelp" class="form-text text-muted">
          We'll
          never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>