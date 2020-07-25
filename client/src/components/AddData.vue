<template>
<div class="container mt-3">
  <dir class="row justify-content-md-center">
    <div class="col-8">
      <h3>Add Product</h3>
      <br>
      <form @submit.prevent="addProduct">
        <div class="form-group">
          <label for="name">Product Name:</label>
          <input v-model="newProduct.addName" type="text" class="form-control" id="name"
          placeholder="Product name">
        </div>
        <div class="form-group">
          <label for="image">Image Url:</label>
          <input v-model="newProduct.addImage" type="text" class="form-control" id="image"
          placeholder="Image url">
        </div>
          <div class="form-group">
          <label for="price">Price:</label>
          <input v-model="newProduct.addPrice" type="text" class="form-control" id="price"
          placeholder="0">
        </div>
          <div class="form-group">
          <label for="stock">Stock:</label>
          <input v-model="newProduct.addStock" type="stock" class="form-control" id="stock"
          placeholder="0">
        </div>
        <div>
        <button type="submit" class="btn btn-primary">Save</button> |
        <button @click="cancelAdd" type="submit" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </dir>
</div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {
      newProduct: {
        addName: '',
        addImage: '',
        addPrice: null,
        addStock: null,
      },
    };
  },
  methods: {
    addProduct() {
      this.$store.dispatch('addProduct', this.newProduct);
      // this.$store.dispatch('addProduct', {
      //   newProduct: this.newProduct,
      //   cb: () => {
      //     this.$router.push('/dashboard');
      //   },
      // });
    },
    cancelAdd() {
      this.$router.push('/dashboard');
    },
  },

};
</script>
