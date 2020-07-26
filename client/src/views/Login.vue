  <form @submit.prevent='userLogin'>
    <div class="form-group">
      <label for="email">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        v-model="email"
      />
      <small
        id="emailHelp"
        class="form-text text-muted"
      >We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
<template>

<div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form" @submit.prevent='userLogin'>
				<span class="contact100-form-title">
					LOGIN CMS
				</span>

				<div class="wrap-input100 validate-input" data-validate="email is required">
					<span class="label-input100">Email</span>
					<input class="input100" type="email" name="email" placeholder="Enter your email" v-model="email">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate = "Valid email is required: passowrd">
					<span class="label-input100">Password</span>
					<input class="input100" type="password" name="password" placeholder="Enter your password" v-model="password">
					<span class="focus-input100"></span>
				</div>

				<div class="container-contact100-form-btn">
					<div class="wrap-contact100-form-btn">
						<div class="contact100-form-bgbtn"></div>
						<button class="contact100-form-btn">
							<span>
								Submit
								<i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    userLogin() {
        console.log(this.email);
      this.$store.dispatch("postLogin", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style >

</style>