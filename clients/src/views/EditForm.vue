<template>
  <div class="col-4 col bg-info p-3 rounded-lg mt-3">
    <form v-on:submit.prevent="edited" class="mt-2">
      <h2>Edit Product</h2><br>
      <div class="form-group">
        <label for="exampleInputTitle1">Name</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" v-model="name">
      </div>
      <div class="form-group">
        <label for="exampleInputDescription1">Image</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="input image url" v-model="image_url">
      </div>
      <div class="form-group">
        <label for="exampleInputStatus1">Price</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" v-model="price">
      </div>
      <div class="form-group">
        <label for="exampleInputDueDate1">Stock</label>
        <input type="number" class="form-control" aria-describedby="emailHelp" v-model="stock">
      </div><br>
        <button type="submit" class="btn btn-primary">Submit</button> &nbsp;&nbsp;
      <router-link :to="{name: 'MainPage'}">
        <button type="submit" class="btn btn-warning">Cancel</button>
      </router-link>
    </form>
  </div>
</template>

<script>

export default {
  methods: {
    edited() {
      const obj = {
        id: this.$store.state.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.$store.dispatch('editProduct', obj);
    },
  },
  computed: {
    name: {
      get () {
        return this.$store.state.name;
      },
      set (name) {
        this.$store.commit('EDIT_NAME', name);
      },
    },
    image_url: {
      get () {
        return this.$store.state.image_url;
      },
      set (image_url) {
        this.$store.commit('EDIT_IMAGE', image_url);
      },
    },
    price: {
      get () {
        return this.$store.state.price;
      },
      set (price) {
        this.$store.commit('EDIT_PRICE', price);
      },
    },
    stock: {
      get () {
        return this.$store.state.stock;
      },
      set (stock) {
        this.$store.commit('EDIT_STOCK', stock);
      },
    },
  },
  created() {
    console.log('<<<< this is from created edit form');
  },
};
</script>

<style></style>
