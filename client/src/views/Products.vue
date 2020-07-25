<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <table class="table table-striped table-dark"></table>
      </div>
      <div class="col-11">
        <h1 class="text-center">Products</h1>
        <router-link to="/add">
        <button class="btn btn-primary">
         Add
        </button>
        </router-link>
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <ProductList></ProductList>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';

export default {
  name: 'dashboard',
  components: {
    ProductList,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('fetchProduct');
  },
  methods: {},
};
</script>
