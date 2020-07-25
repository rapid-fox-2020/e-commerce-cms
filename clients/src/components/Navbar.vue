<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark mt-1">
    <a class="navbar-brand text-white" href="#">E-Commerce CMS</a>
    <button class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li style="margin-left: 40px;">
                <router-link class="text-white" to="/add">
                <button type="button"
                class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"> Add Product</i>
                </button>
                </router-link> 
            </li>
            <li class="nav-item" style="margin-left: 1200px;">
                <router-link class="text-white" :to="{name: 'Login'}">
                <button @click="logout" type="button"
                class="btn btn-warning text-white">Logout
                </button>
                </router-link>
            </li>
        </ul>
    </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.clear();
        },
    },
};
</script>

<style></style>
