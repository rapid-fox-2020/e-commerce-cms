<template>
  <tbody>
    <tr v-for="(product,index) in $store.state.products" :key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{$store.state.products[index].name}}</td>
      <td>
        <img :src="product.image_url" style="max-width:200px" />
      </td>
      <td>Rp.{{product.price}}</td>
      <td>{{product.stock}}</td>
      <td>
        <button class="btn btn-primary" @click="showEditForm(index)">Edit</button>
        <button class="btn btn-danger" @click="processingDelete(product.id)">Delete</button>
      </td>
    </tr>
  </tbody>
</template>

<script>
import store from "../store";

export default {
  name: "ProductList",
  data() {
    return {
      // isDate: new Date(this.product.updatedAt).toDateString()
    };
  },
  created() {
    // console.log(this.product, "cek created");
    // console.log(this.$store.state.products);
  },
  methods: {
    processingDelete(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    showEditForm(id) {
      this.$router.push({ path: `/update/${id}` });
    }
  }
};
</script>

<style>
</style>