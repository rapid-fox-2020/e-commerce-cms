<template>
  <div>
    <form @submit.prevent="addProduct" class="w-50">
      <div class="form-group">
        <label>Product Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          v-model="newProduct.name"
        />
      </div>
      <div class="form-group">
        <label>Product Price</label>
        <input type="number" step="500" class="form-control" v-model="newProduct.price" />
      </div>
      <div class="form-group">
        <label>Product Stocks</label>
        <input type="number" min="1" class="form-control" v-model="newProduct.stock" />
      </div>
      <div class="form-group">
        <label>Image Url</label>
        <input type="text" class="form-control" v-model="newProduct.imageUrl" />
      </div>
      <button type="submit" class="btn btn-info">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormAdd",
  data() {
    return {
      newProduct: {
        name: "",
        price: "",
        stock: "",
        imageUrl: "",
        toDashboard: () => {
          this.$router.push({ name: "ProductPage" });
        }
      }
    };
  },
  methods: {
    addProduct() {
      this.$store.dispatch("addNewProduct", this.newProduct);
      this.newProduct.name = "";
      this.newProduct.price = "";
      this.newProduct.stock = "";
      this.newProduct.imageUrl = "";
    }
  }
};
</script>

<style></style>
