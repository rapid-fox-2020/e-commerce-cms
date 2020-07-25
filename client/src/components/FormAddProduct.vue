<template>
  <div class="container" style="width:650px">
    <h1 class="text-center">Form Add</h1>
    <form @submit.prevent="processAdd">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp" required/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Image_url</label>
        <input type="text" class="form-control" v-model="image_url" required/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input type="text" class="form-control" v-model="price" required/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Stock</label>
        <input type="text" class="form-control" v-model="stock" required/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>|
      <router-link to="/products">
        <button class="btn btn-secondary">Back</button>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'formAddProduct',
  data() {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
    };
  },
  methods: {
    processAdd() {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      });
    },
  },
};
</script>
