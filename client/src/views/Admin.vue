<template>
  <div class="container mt-3">
    <div class="intro">
      <h1>List of Ecommerce Products</h1>
      <button type="button" name="button" class="btn btn-primary mt-3 mb-4"
      v-on:click="showFormAdd">
        <i class="fa fa-plus-square" aria-hidden="true"></i> | Add Product</button>
    </div>
    <table class="table table-striped" style="text-align:center;">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Name</th>
        <th scope="col">Image_URL</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Actions</th>
      </tr>
      <Product v-for="product in dataProducts" :key="product.id" :product="product"></Product>
    </thead>
    <tbody>

    </tbody>
  </table>
  </div>
</template>

<script>
import axios from 'axios';
import Product from '../components/Product.vue';

export default {
  data() {
    return {
      dataProducts: null,
    };
  },
  components: {
    Product,
  },
  methods: {
    showFormAdd() {
      this.$router.push({ name: 'ProductAdd' });
    },
    getProducts() {
      axios({
        method: 'get',
        url: 'http://localhost:3002/products',
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          this.dataProducts = results.data;
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="css" scoped>
  .intro {
    text-align: center;
  }
</style>
