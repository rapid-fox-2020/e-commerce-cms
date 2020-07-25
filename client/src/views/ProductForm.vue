<template>
  <div>
  <Navbar/>
    <h1>ADD PRODUCT</h1>

    <form @submit.prevent="newProduct">
      <div class="form-group">
        <label for="name">NAME</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="image_url">IMAGE</label>
        <input
          v-model="image_url"
          type="text"
          class="form-control"
          id="image_url"
          placeholder="url"
        />
      </div>
      <div class="form-group">
        <label for="price">price</label>
        <input v-model="price" type="number" class="form-control" id="price" placeholder="price" />
      </div>
      <div class="form-group">
        <label for="stock">stock</label>
        <input v-model="stock" type="number" class="form-control" id="stock" placeholder="stock" />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  data() {
    return {
      name: "",
      price: 0,
      stock: 0,
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