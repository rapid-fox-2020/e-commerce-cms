<template>
  <!-- Edit Form -->
  <section class="container pt-5">
    <h1 class="page-label">Edit Data Product</h1>

    <aside class="alert alert-success" v-if="status === 200">
      <strong>SUCCESS</strong>: Product's data has been update.
    </aside>
    <aside class="alert alert-danger" v-else-if="typeof status === 'string'">
      <strong>FAIL</strong>: {{ status }}.
    </aside>

    <form @submit.prevent="updateProduct(product.id)">
      <div class="form-group">
        <label>Product Name</label>
        <input v-model="name" type="text" placeholder="Product Name" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Image URL</label>
        <input v-model="image_url" type="url" placeholder="Image URL" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Price</label>
        <input v-model="price" type="text" placeholder="Price" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Stock</label>
        <input v-model="stock" type="number" placeholder="Stock" class="form-control" required/>
      </div>
      <button type="submit" class="btn btn-primary mr-3">Save</button>
      <button type="reset" class="btn btn-danger" @click="back()">Cancel</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "EditProduct",
  props: ['product'],
  data() {
    return {
      name: this.product.name,
      image_url: this.product.image_url,
      price: this.product.price,
      stock: this.product.stock,
      status: null,
    }
  },
  methods: {
    updateProduct() {
      this.$store.dispatch('updateProduct', {
        id: this.product.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      })
      .then(status => {
        this.status = status;
        this.back();
      })
      .catch(err => console.log(err));
    },
    back() {
      this.$emit('back');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-group {
    margin: 30px 0;
  }
</style>
