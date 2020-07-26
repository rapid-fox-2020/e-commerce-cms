<template>
  <!-- Add Form -->
  <section class="container pt-5">
    <h1 class="page-label">Add Product</h1>

    <aside class="alert alert-danger" v-if="alert && typeof message === 'string'">
      <strong>FAIL</strong>: {{ message }}.
    </aside>
    <aside class="alert alert-success" v-if-else="alert">
      <strong>SUCCESS</strong>: add {{ name }}.
    </aside>

    <form @submit.prevent="addProduct()">
      <div class="form-group">
        <label>Product Name</label>
        <input type="text" v-model="name" placeholder="Product Name" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Image URL</label>
        <input type="url" v-model="image_url" placeholder="Image URL" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="text" v-model="price" placeholder="Price" class="form-control" required/>
      </div>
      <div class="form-group">
        <label>Stock</label>
        <input type="number" v-model="stock" placeholder="Stock" class="form-control" required/>
      </div>
      <button type="submit" class="btn btn-primary mr-3">Save</button>
      <button type class="btn btn-danger" @click.prevent="resetForm()">Reset</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: null,
      message: null,
      alert: false,
    }
  },
  methods: {
    resetForm() {
      this.name = '';
      this.image_url = '';
      this.price = '';
      this.stock = 0;
    },
    addProduct() {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      })
      .then(message => {
        this.alert = true;
        this.message = message;
        this.image_url = '';
        this.stock = null;
        this.price = null;
        setTimeout(() => this.alert = false, 5000);
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-group {
    margin: 30px 0;
  }
</style>
