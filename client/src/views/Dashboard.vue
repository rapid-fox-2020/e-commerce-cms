<template>
<div>
  <Navbar></Navbar>
  <div class="container mt-4">
    <h2 class="text-center">List of Products</h2>
    <button @click="addNewProduct" type="button" class="float-right btn btn-success btn-sm mb-1">
      <i class="fa fa-plus"></i>Add Product
    </button>
    <table class="table table-striped table-responsive-sm">
      <thead class="text-center text-white thead-ligh bg-info">
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,i) in $store.state.products" :key="product.id">
          <td class="text-center">{{i+1}}</td>
          <td class="text-left">{{product.name}}</td>
          <td class="text-left">
            <img :src="product.img_url" width="100px" />
          </td>
          <td class="text-right">{{product.price.toLocaleString()}}</td>
          <td class="text-right">{{product.stock}}</td>
          <td class="text-center">
            <button @click="editProduct(i)"
              type="button" class=" text-white btn btn-warning btn-sm">
              <i class="fa fa-edit"></i>Edit
            </button> |
            <button @click="deleteProduct(product.id)" type="button" class="btn btn-danger btn-sm">
              <i class="fa fa-trash"></i>Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import Navbar from './Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
  },
  created() {
    // memanggil action dari fetcProduct (action pakai dispatch)
    this.$store.dispatch('fetchProduct');
  },
  methods: {
    addNewProduct() {
      this.$router.push('/add');
    },
    editProduct(id) {
      this.$router.push(`/edit/${id}`);
      // this.$router.push(`/edit{product.id}`);
    },
    deleteProduct(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this product!',
        icon: 'warning',
        buttons: ['Cancel', 'Destroy'],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('deleteProduct', id);
          }
        });
    },
  },
};
</script>
