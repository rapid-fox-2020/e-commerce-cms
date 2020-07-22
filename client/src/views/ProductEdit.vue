<template>
  <div class="container col-6">
    <h1>Edit Your Product Here</h1>
    <form v-on:submit.prevent="editProduct">
      <Form :productName="name"
      :productURL="url" :productPrice="price" :productStock="stock">
    </Form>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Form from '../components/Form.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
      name: null,
      url: null,
      price: null,
      stock: null,
    };
  },
  methods: {
    getProduct() {
      axios({
        method: 'get',
        url: `http://localhost:3002/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          this.name = results.data.name;
          this.url = results.data.image_url;
          this.price = results.data.price;
          this.stock = results.data.stock;
        })
        .catch((err) => {
          console.log(err);
          // swal("Failed!", "Please Try Again", "error");
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="css" scoped>
</style>
