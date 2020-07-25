<template>
  <div class="container" style="width:650px">
    <h1 class="text-center">Form Edit</h1>
    <form @submit.prevent="processEdit">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" v-model="EditName" aria-describedby="emailHelp"  required/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Image_url</label>
        <input type="text" class="form-control" v-model="EditImage_url" required/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input type="text" class="form-control" v-model="EditPrice" required/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Stock</label>
        <input type="text" class="form-control" v-model="EditStock" required/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button> |
      <router-link to="/products">
        <button class="btn btn-secondary">Back</button>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormEditProduct',
  data() {
    return {
      EditName: this.$store.state.products[this.$route.params.id].name,
      EditImage_url: this.$store.state.products[this.$route.params.id]
        .image_url,
      EditPrice: this.$store.state.products[this.$route.params.id].price,
      EditStock: this.$store.state.products[this.$route.params.id].stock,
      EditId: this.$store.state.products[this.$route.params.id].id,
    };
  },
  methods: {
    processEdit() {
      this.$store.dispatch('updateProduct', {
        id: this.EditId,
        name: this.EditName,
        image_url: this.EditImage_url,
        price: this.EditPrice,
        stock: this.EditStock,
      });
    },
  },
};
</script>
