<template>
  <div class="container mt-3">
    <div class="intro">
      <h1>List of Ecommerce Products</h1>
      <button type="button" name="button" class="btn btn-primary mt-3 mb-4"
      v-on:click="showFormAdd">
        <i class="fa fa-plus-square" aria-hidden="true"></i> | Add Product</button>
      <button type="button" name="button" class="btn btn-success mt-3 mb-4 ml-3"
        v-on:click="showFormAddSecret">
          <i class="fa fa-plus-square" aria-hidden="true"></i> | Add Secret</button>
    </div>
    <ModalComponent></ModalComponent>
    <table class="table table-striped" style="text-align:center;">
    <thead>
      <tr>
        <th scope="col">id_Product</th>
        <th scope="col">Product Name</th>
        <th scope="col">Image</th>
        <th scope="col">Product Price</th>
        <th scope="col">Product Stock (pcs)</th>
        <th scope="col">Actions</th>
      </tr>
      <Product v-for="(product,index) in $store.state.products"
      :key="product.id" :product="[product,index]"></Product>
    </thead>
    <tbody>

    </tbody>
  </table>
  </div>
</template>

<script>
// import axios from 'axios';
import Product from '../components/Product.vue';
import ModalComponent from '../components/ModalComponent.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    Product,
    ModalComponent,
  },
  methods: {
    showFormAdd() {
      this.$store.commit('SET_EMPTYDATA')
      this.$router.push({ name: 'ProductAdd' });
    },
    showFormAddSecret() {
      this.$router.push({ name: 'SecretAdd' });
    },
  },
  created() {
    this.$store.dispatch('getProducts');
    this.$store.dispatch('getCategories');
    this.$store.commit('SET_ISLOGIN');
  },
};
</script>

<style lang="css" scoped>
  .intro {
    text-align: center;
  }
</style>
