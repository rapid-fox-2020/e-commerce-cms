<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
        aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item logged-in">
                <router-link class="nav-link" to="dashboard"  >Main Menu</router-link>
            </li>
            <li class="nav-item logged-in">
                <router-link class="nav-link" to="/add-Product">Add Product</router-link>
            </li>
            <li class="nav-item logged-in">
                <a class="nav-link" @click="logout" href="" >Logout</a>
            </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
     name: "Navbar",
     methods: {
        logout() {
        localStorage.clear();
        this.$router.push("/login");
        }
    }
}
</script>

