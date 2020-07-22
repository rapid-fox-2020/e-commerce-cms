<template>
  <div>
    <div class="form-group">
      <label for="exampleInputEmail1">Product Name</label>
      <input type="text" class="form-control" placeholder="product_name"
      v-model="name">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Image_URL</label>
      <input type="text" class="form-control" placeholder="image_url"
      v-model="url">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Price</label>
      <input type="number" class="form-control"
      placeholder="product_price" v-model="price">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Stock</label>
      <input type="number" class="form-control"
      placeholder="product_stock" v-model="stock">
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="sendUpdateData">Submit</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendUpdateData() {
      this.$emit('updatedData', [this.name, this.url, this.price, this.stock]);
    },
  },
  data() {
    return {
      name: this.productName,
      url: this.productURL,
      price: this.productPrice,
      stock: this.productStock,
    };
  },
  props: ['productName', 'productURL', 'productPrice', 'productStock'],
};
</script>

<style lang="css" scoped>
</style>
