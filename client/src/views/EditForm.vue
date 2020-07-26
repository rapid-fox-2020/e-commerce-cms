<template>
<div>
  <Navbar/>
    <h1 class="text-warning mt-5">Edit Product</h1>
    <div class="container-sm bg-white mt-4 border border-warning">

    <form @submit.prevent="editProduct">
      <div class="form-group mt-3 font-weight-bold" >
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="soto banjar"
          v-model="name"
        />
      </div>
      <div class="form-group font-weight-bold">
        <label for="image_url">Image_url</label>
        <input
          v-model="image_url"
          type="url"
          class="form-control"
          id="image_url"
          placeholder="www.image.png"
        />
      </div>
      <div class="form-group font-weight-bold">
        <label for="price">Price</label>
        <input v-model="price" type="number" class="form-control" id="price" placeholder="Rp" />
      </div>
      <div class="form-group font-weight-bold">
        <label for="stock">Stock</label>
        <input v-model="stock" type="number" class="form-control" id="stock" placeholder="34" />
      </div>

      <button type="submit" class="btn btn-primary mb-4">Submit</button>
    </form>
  </div>
  </div>
  
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  data() {
    return {
      name: this.$store.state.products[this.$route.params.id].name,
      price: this.$store.state.products[this.$route.params.id].price,
      stock: this.$store.state.products[this.$route.params.id].stock,
      image_url: this.$store.state.products[this.$route.params.id]. image_url,
    };
  },
  components: {
    Navbar
  },
  methods: {
    editProduct() {


    //   console.log(this.name,'cekkkkkkkkkkkkkk');
      this.$store.dispatch("editProduct", {
        name: this.name,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url,
        id:this.$store.state.products[this.$route.params.id].id
      });
    }
  }
};
</script>

<style>
</style>