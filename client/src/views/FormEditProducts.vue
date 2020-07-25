<template>
  <div
    class="add-user border"
    style="padding: 60px 360px; background-color: white; width: auto;
      height: auto;"
  >
    <div>
      <form
        @submit.prevent="updateProducts($store.state.productsById.id)"
        style="padding:10px 50px; width: 600px; background-color:#041E3A; color:white;"
      >
        <h2 style="text-align: center;">Edit Products</h2>
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
        <button type="submit" class="btn btn-primary">Edit</button>
        or
        <button @click="backToHome" class="btn btn-primary">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameProducts: `${this.$store.state.productsById.name}`,
      imageProducts: `${this.$store.state.productsById.image_url}`,
      priceProducts: `${this.$store.state.productsById.price}`,
      stockProducts: `${this.$store.state.productsById.stock}`,
      categoryProducts: `${this.$store.state.productsById.category}`,
    };
  },
  methods: {
    updateProducts(getId) {
      console.log(getId, 'check id apakah masuk');
      const name = this.nameProducts;
      const image = this.imageProducts;
      const price = this.priceProducts;
      const stock = this.stockProducts;
      const category = this.categoryProducts;
      const id = getId;
      this.$store.dispatch('updateProduct', {
        name,
        image,
        price,
        stock,
        category,
        id,
      });
    },
    backToHome() {
      this.$router.push({ name: 'Products' });
      // this.$store.dispatch("readProducts");
    },
  },
  created() {},
};
</script>

<style></style>
