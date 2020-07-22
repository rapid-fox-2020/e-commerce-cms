<template>
  <div class="container col-6">
    <h1>Add Your Product Here {{ name }}</h1>
    <form v-on:submit.prevent="addProduct">
      <Form :productName="name"
      :productURL="url" :productPrice="price" :productStock="stock"
      @updatedData="changeData"
      ></Form>
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
      name: '',
      url: '',
      price: '',
      stock: '',
    };
  },
  methods: {
    changeData(newData) {
      const [newName, newURL, newPrice, newStock] = newData;
      this.name = newName;
      this.url = newURL;
      this.price = newPrice;
      this.stock = newStock;
    },
    addProduct() {
      axios({
        method: 'post',
        url: 'http://localhost:3002/products',
        data: {
          name: this.name,
          image_url: this.url,
          price: this.price,
          stock: this.stock,
        },
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then(() => {
          this.name = '';
          this.url = '';
          this.price = '';
          this.stock = '';
          this.$router.push({ name: 'Admin' });
        // this.$emit("toParentLogin", results.data.accessToken)
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
