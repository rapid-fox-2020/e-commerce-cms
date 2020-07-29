<template>
<div>
  <Navbar></Navbar>
  <div class="container mt-5">
    <div class="row justify-content-md-center">
      <div class="col-8">
        <h3 class="text-center">Edit Product</h3>
          <br>
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <label for="name">Product Name:</label>
              <input v-model="editName" type="text" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label for="image">Image Url:</label>
              <input v-model="editImage" type="text" class="form-control" id="image">
            </div>
              <div class="form-group">
              <label for="price">Price:</label>
              <input v-model="editPrice" type="text" class="form-control" id="price">
            </div>
              <div class="form-group">
              <label for="stock">Stock:</label>
              <input v-model="editStock" type="stock" class="form-control" id="stock">
            </div>
            <div>
            <button type="submit" class="btn btn-primary">Update</button> |
            <button @click="cancelEdit" type="submit" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '../views/Navbar.vue';

export default {
  name: 'Edit',
  components: {
    Navbar,
  },
  data() {
    return {
      editName: this.$store.state.products[this.$route.params.id].name,
      editImage: this.$store.state.products[this.$route.params.id].img_url,
      editStock: this.$store.state.products[this.$route.params.id].stock,
      editPrice: this.$store.state.products[this.$route.params.id].price,
    };
  },
  // props: ['ediData'], = state
  methods: {
    updateProduct() {
      this.$store.dispatch('editProduct', {
        name: this.editName,
        img_url: this.editImage,
        stock: this.editStock,
        price: this.editPrice,
        id: this.$store.state.products[this.$route.params.id].id,
      });
    },
    cancelEdit() {
      this.$router.push('/dashboard');
    },
  },
};
</script>
