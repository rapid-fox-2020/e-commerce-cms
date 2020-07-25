<template>
  <div
    class="add-user border"
    style="padding: 60px 360px; background-color: white; width: auto;
      height: auto;"
  >
    <div>
      <form
        @submit.prevent="addProducts"
        style="padding:10px 50px; width: 600px; background-color:#041E3A; color:white;"
      >
        <h2 style="text-align: center;">Add Products</h2>
        <div class="form-group">
          <label for="name-products">Name Products</label>
          <input
            type="text"
            class="form-control"
            v-model="nameProducts"
            id="name-products"
            placeholder="Enter Name Products"
          />
        </div>
        <div class="form-group">
          <label for="imageurl-products">Image Url</label>
          <input
            type="text"
            class="form-control"
            id="imageurl-products"
            v-model="imageProducts"
            placeholder="Enter Image Url"
          />
        </div>
        <div class="form-group">
          <label for="price-products">Price</label>
          <input
            type="text"
            class="form-control"
            id="price-products"
            v-model="priceProducts"
            placeholder="Enter Price"
          />
        </div>
        <div class="form-group">
          <label for="stock-products">Stock</label>
          <input
            type="number"
            class="form-control"
            id="stock-products"
            v-model="stockProducts"
            placeholder="Enter Stock"
          />
        </div>
        <div class="form-group">
          <label for="category-products">Category</label>
          <input
            type="text"
            class="form-control"
            id="imageurl-products"
            v-model="categoryProducts"
            placeholder="Enter Category"
          />
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
        or
        <button @click="cancelAdd" class="btn btn-primary">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameProducts: '',
      imageProducts: '',
      priceProducts: '',
      stockProducts: '',
      categoryProducts: '',
    };
  },
  methods: {
    addProducts() {
      const name = this.nameProducts;
      const image = this.imageProducts;
      const price = this.priceProducts;
      const stock = this.stockProducts;
      const category = this.categoryProducts;
      this.$store.dispatch('addProducts', {
        name,
        image,
        price,
        stock,
        category,
      });
    },
    cancelAdd() {
      this.$router.push({ name: 'Products' });
    },
  },
};
</script>

<style>
</style>
