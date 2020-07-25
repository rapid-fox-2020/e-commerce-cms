<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-light" id="navbar" v-if="logged">
  <div class="brand">
    <a class="navbar-brand" id="brand" href="#">Game Center</a>
  </div>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#"><b>HOME</b> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="openAdd"><b>ADD</b> <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
  <div class="icons row">
    <div class="dropdown-user">
    <a href="#" style="font-size:24px" class="usericon"><i class="material-icons" id="user-btn">person</i></a>
      <div class="dropdown-content-user">
      <a href="#" v-if="logged" @click.prevent="logout"><b>LOGOUT</b></a>
    </div>
    </div>
  </div>
</nav>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Navbar',

  computed: {
    logged() {
      return this.$store.state.logged;
    },
  },
  data() {
    return {
      isLogin: false,
    };
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = this.logged;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LoggedOut');
      localStorage.clear();
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push({
          name: 'home',
        });
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Logged Out successfully',
      });
    },
    openAdd() {
      this.$store.dispatch('openAddpage');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap');

#brand {
  font-size: 32px;
  font-family: 'Cinzel Decorative', cursive;
}

#navbar {
  position: fixed;
}

.glyphicon.glyphicon-list {
  /* font-size: 25px; */
  margin-top: -2px;
  margin-right: -1px;
}

/* Style The Dropdown Button */
.dropbtn {
  background-color: rgb(0, 0, 0);
  padding: 10px;
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-left: 30px;
  margin-top: -5px;
  border-radius: 50px;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-user{
  margin-right: 25px;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content-user {
  display: none;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  width: 90px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-right: 20px;
}

.dropdown-content-cart {
  display: none;
  position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content-user a {
  color: black;
  padding: 10px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content-cart a {
  color: black;
  padding: 10px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: rgb(51, 153, 51);
}

.dropdown-content-user a:hover {
  background-color: rgb(51, 153, 51);
}

.dropdown-content-cart a:hover {
  background-color: rgb(51, 153, 51);
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-user:hover .dropdown-content-user{
  display: block;
}

.dropdown:hover .dropdown-content-cart{
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

.usericon {
  background-color: rgb(0, 0, 0);
  padding: 5px;
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: -5px;
  border-radius: 50px;
  width: 35px;
}

.usericon:hover {
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  text-decoration: none;
}

.icons {
  margin-right: 25px;
}

#navbarNav a {
  color: rgb(0, 0, 0);
}

#navbarNav a:hover {
  color: orangered;
}

.navbar-brand{
  color: black;
}

.navbar-brand:hover {
  color: orangered;
}

#user-dropwdown{
  margin-right: 50px;
}

</style>
