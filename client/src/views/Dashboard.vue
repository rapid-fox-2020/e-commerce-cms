<template>
  <div class="d-flex">
    <div class="sidebar text-white">
      <h4 class="pt-4 text-center">{{ user }}</h4>
      <hr/>
      <ul class="navbar pt-1">
        <li @click.prevent="showListProduct()" :class="{selected:selected == 'Dashboard'}">
          <span>Dashboard</span>
        </li>
        <li @click.prevent="showAddProduct()"
        :class="{selected:selected == 'addProduct'}">
          <span>Add Product</span>
        </li>
        <li @click.prevent="logout()">
          <span>Logout</span>
        </li>
      </ul>
    </div>

    <AddProduct @back="showListProduct" v-if="page === 'addProduct'"></AddProduct>
    <EditProduct v-else-if="page === 'editProduct'"
    :product="product" @back="showListProduct"></EditProduct>
    <ListProduct v-else-if="page === 'listProduct'" @editPage="showEditProduct"></ListProduct>
  </div>
</template>

<script>
import AddProduct from '../components/AddProduct.vue';
import EditProduct from '../components/EditProduct.vue';
import ListProduct from '../components/ListProduct.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      page: 'listProduct',
      user: localStorage.name,
      product: {},
      selected: 'Dashboard',
    };
  },
  components: {
    AddProduct,
    EditProduct,
    ListProduct,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: '/login' });
    },
    showListProduct() {
      this.selected = 'Dashboard';
      this.page = 'listProduct';
    },
    showAddProduct() {
      this.selected = 'addProduct';
      this.page = 'addProduct';
    },
    showEditProduct(product) {
      this.selected = 'editProduct';
      this.product = product;
      this.page = 'editProduct';
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: cadetblue;
  width: 180px;
  max-width: 180px;
  height: 100vh;
}
.sidebar .navbar li span:hover {
  background: slategray;
}
.selected {
  background: slategrey;
}
.navbar {
  color: #fff;
  display: block;
  list-style-type: none;
  font-family: sans-serif;
}
.navbar li {
  cursor: pointer;
}
</style>
