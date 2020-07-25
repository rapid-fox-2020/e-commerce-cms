<template>
  <div>
    <h1> Update Product</h1>
    <form @submit.prevent="processEditProduct()">
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
      <button type="submit" class="btn btn-primary mb-5"> Edit Product </button>
    </form>
  </div>

</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      id: null,
      name: null,
      image_url: null,
      price: null,
      stock: null,
    };
  },
  props: ['data'],
  methods: {
    processEditProduct() {
      const updatedData = {
        id: this.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      console.log(updatedData, 'updatedData');
      this.$store.dispatch('processUpdateProduct', updatedData);
    },
  },
  created() {
    // const detail = this.$store.state.
    const data = this.$store.state.selectedProduct;
    console.log(this.$store.state.selectedProduct, 'this.$store.state.selectedProduct');
    this.id = data.id;
    this.name = data.name;
    this.image_url = data.image_url;
    this.price = data.price;
    this.stock = data.stock;
    console.log('masuk di product detail');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
