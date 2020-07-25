<template>
  <div class="login">
   <div class="container">
    <div class="d-flex justify-content-center h-100">
     <div class="card">
      <div class="card-header">
       <h3>Log In</h3>
      </div>
      <div class="card-body">
       <form>
        <div class="input-group form-group">
         <input type="text" class="form-control" placeholder="email" v-model="email">
         </div>
         <div class="input-group form-group">
          <input type="password" class="form-control" placeholder="password" v-model="password">
         </div>
         <br><br>
         <div class="form-group">
          <input type="submit" value="Login" class="btn login_btn" @click.prevent="loginUser">
         </div>
       </form>
      </div>
     </div>
    </div>
   </div>
  </div>
</template>

<script>
// import Swal from 'sweetalert2';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginUser() {
      console.log('masuk login <<');
      console.log('masuk login <<');
      const loginUser = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', loginUser);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Numans');

.login{
position: fixed;
background-size: cover;
height: 100%;
width: 100%;
margin-top: 10px;
font-family: 'Numans', sans-serif;
z-index: 998;
}

.container{
height: 100%;
align-content: center;
}

.card{
height: 370px;
margin-bottom: auto;
width: 400px;
background-color: rgba(0, 0, 0, 0.7) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.login_btn{
color: black;
background-color: #FFC312;
width: 100%;
}

.cancel_btn{
color: black;
background-color: rgb(255, 65, 18);
width: 100%;
}

.login_btn:hover, .cancel_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

#footer{
  color: rgb(255, 255, 255);
}

.links a{
margin-left: 4px;
}
</style>
