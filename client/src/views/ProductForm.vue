<template>
  <div>
  <Navbar/>
    <h1 class="text-info mt-5">ADD PRODUCT</h1>
  <div class="container-sm bg-white mt-4 border border-info">

    <form @submit.prevent="newProduct">
      <div class="form-group mt-3">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control font-weight-bold"
          id="name"
          aria-describedby="emailHelp"
          placeholder="name"
          v-model="name"
        />
      </div>
      <div class="form-group font-weight-bold">
        <label for="image_url">Image_Url</label>
        <input
          v-model="image_url"
          type="url"
          class="form-control"
          id="image_url"
          placeholder="www.image.png"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input v-model="price" type="number" class="form-control" id="price" placeholder="Rp" />
      </div>
      <div class="form-group font-weight-bold">
        <label for="stock ">Stock</label>
        <input v-model="stock" type="number" class="form-control" id="stock" placeholder="43" />
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
      name: "",
      price: null,
      stock: null,
      image_url: ""
    };
  },
  components: {
    Navbar
  },
  methods: {
    newProduct() {
      console.log(this.name);
      this.$store.dispatch("addProduct", {
        name: this.name,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url
      });
    }
  }
};
</script>

<style>
</style>