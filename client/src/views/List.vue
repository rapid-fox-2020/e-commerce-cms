<template>
  <div class="container">
    <h1> Products </h1>
    <button class="btn btn-primary m-4" @click="showFormAddProduct"> Add New Product</button>
    <table class="table border table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
          <Product v-for="data in $store.state.products" v-bind:key="data.id" :data="data">
          </Product>
      </tbody>
    </table>
    <hr>
  </div>
</template>

<script>

import Product from '../components/Product.vue';

export default {
  name: 'Login',
  data() {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      nameUpdate: '',
      image_urlUpdate: '',
      priceUpdate: '',
      stockUpdate: '',
    };
  },
  components: {
    Product,
  },
  created() {
    this.$store.dispatch('getProducts');
    // this.nameUpdate = this.$store.state.selectedProduct.name;
    // this.image_urlUpdate = this.$store.state.selectedProduct.image_url;
    // this.priceUpdate = this.$store.state.selectedProduct.price;
    // this.stockUpdate = this.$store.state.selectedProduct.stock;
    console.log(this.stockUpdate, 'this.stockUpdate');
    console.log(this.$store.state.selectedProduct.stock, 'this.$store.state.selectedProduct.stock');
  },
  methods: {
    increment() {
      this.$store.commit('INCREMENT');
    },
    showFormAddProduct() {
      // this.showformAdd = !this.showformAdd;
      // router.push({ name: 'AddProduct' });
      this.$store.dispatch('moveToPage');
    },
    processAddProduct() {
      const newData = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.showformAdd = false;
      this.$store.dispatch('processAddProduct', newData);
    },
    processEditProduct() {
      const updatedData = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      // this.showFormUpdate = false;
      this.$store.dispatch('processUpdateProduct', updatedData);
    },
  },
};
</script>

<style>
  h1{
    font-family: 'Lobster', cursive;
    font-size: 40pt;
  }
</style>
