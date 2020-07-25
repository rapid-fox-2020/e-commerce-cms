<template>
  <div class="container">
    <h1> Add New Products </h1>
    <hr>
    <form @submit.prevent="processAddProduct">
      <div class="container">
      <p class="text-danger"> {{this.$store.state.errMsg}}</p>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> Name </span>
          </div>
          <input v-model="name" type="text" class="form-control" placeholder="Name"
          aria-label="Name" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> Image Url </span>
          </div>
          <input v-model="image_url" type="text" class="form-control" placeholder="Image Url"
          aria-label="Image Url" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> Price </span>
          </div>
          <input v-model="price" type="text" class="form-control" placeholder="price"
          aria-label="price" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> Stock </span>
          </div>
          <input v-model="stock" type="text" class="form-control" placeholder="stock"
          aria-label="stock" aria-describedby="basic-addon1">
        </div>
      </div>
      <button type="submit" class="btn btn-primary"> Add New Product </button>
    </form>
    <hr>
  </div>
</template>

<script>

export default {
  name: 'AddProduct',
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
  created() {
  },
  methods: {
    increment() {
      this.$store.commit('INCREMENT');
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
  },
};
</script>

<style>
  h1{
    font-family: 'Lobster', cursive;
    font-size: 40pt;
  }
</style>
