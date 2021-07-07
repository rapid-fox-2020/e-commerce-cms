<template>
    <div class="col-10 offset-4">
        <div class="container mt-1">
          <div class="row">

            <div class="col-sm-4" id="login-form">
              <form @submit.prevent="login()" class="mt-3">
                <h4 style="text-align: center;">Login</h4>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control"
                  v-model="emailLogin" aria-describedby="emailHelp">
                  <small id="emailHelpLogin" class="form-text text-muted">
                      We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" v-model="passwordLogin">
                </div>
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="submit" class="btn btn-primary btn-md">Login</button>
                  </div>
                </div>
              </form>
            </div>

        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.emailLogin, password: this.passwordLogin });
      this.$router.push('/');
    },
  },
};
</script>

<style scope>

</style>
