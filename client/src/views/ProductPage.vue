<template>
  <div>
    <Navbar></Navbar>
    <!--Start add Button-->
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-info" @click.prevent="toFormAdd">Add Products</button>
    </div>
    <br />
    <br />

    <!--End add Button-->
    <router-view></router-view>
    <ProductList></ProductList>
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'ProductPage',
  components: {
    ProductList,
    Navbar,
  },
  methods: {
    toFormAdd() {
      this.$router.push({ name: 'FormAdd' });
    },
  },
  created() {
    // this.$store.dispatch("fetchProducts");
  },
};
</script>

<style scoped></style>
