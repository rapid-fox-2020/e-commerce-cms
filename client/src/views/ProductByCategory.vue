<template>
  <div class="container mt-3">
    <div class="intro">
      <h1>List of {{this.$route.params.category}} Products</h1><br>
    </div>
    <ModalComponent></ModalComponent>
    <table class="table table-striped" style="text-align:center;">
    <thead>
      <tr>
        <th scope="col">id_Product</th>
        <th scope="col">Product Name</th>
        <th scope="col">Image</th>
        <th scope="col">Product Price</th>
        <th scope="col">Product Stock (pcs)</th>
        <th scope="col">Actions</th>
      </tr>
      <Product v-for="(product,index) in $store.state.ProductByCategory"
      :key="product.id" :product="[product,index]"></Product>
    </thead>
    <tbody>
    </tbody>
  </table>
  </div>
</template>

<script>
import Product from '../components/Product.vue';
import ModalComponent from '../components/ModalComponent.vue'

export default {
  components: {
    Product,
    ModalComponent,
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('getByCategory',this.$route.params.category)
    }
  },
  created() {
    this.$store.dispatch('getCategories');
    this.$store.dispatch('getByCategory',this.$route.params.category)
    this.$store.commit('SET_ISLOGIN')
  },
}
</script>

<style lang="css" scoped>
  .intro {
    text-align: center;
  }
</style>
