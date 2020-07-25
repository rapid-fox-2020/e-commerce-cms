<template>
    <div class="container">
        <Navbar></Navbar>
        <Products></Products>
        <router-view/>
    </div>
</template>

<script>
import Products from '../components/Product.vue';
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    Products,
    Navbar,
  },
};
</script>

<style></style>
