<template>
  <div class="container-fluid" id="product-content">
    <router-link :to="{name: 'AddProducts'}">
      <button
        id="add-product"
        type="button"
        class="btn btn-secondary"
        style="margin-top: 10px;"
      >Add Product</button>
    </router-link>

    <table class="table" style="margin-top: 10px;">
      <thead class="thead-dark">
        <tr style="text-align: center;">
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col" style="width: 50px;">Image Url</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="text-align: center;"
          v-for="(data, index) in $store.state.products"
          :key="data.id"
        >
          <td>{{ index+1 }}</td>
          <td>{{ data.name }}</td>
          <td>
            <img style="width: 250px; height: 250px;" :src="data.image_url" />
          </td>
          <td>{{ data.price }}</td>
          <td>{{ data.stock }}</td>
          <td>{{ data.category }}</td>
          <td>
            <button
              type="button"
              @click="updateProduct(data.id)"
              style
              class="btn btn-secondary"
            >Update</button>
            |
            <button
              type="button"
              @click="deleteProduct(data.id)"
              class="btn btn-danger"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-view />
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  methods: {
    addProduct() {
      this.$router.push({ name: 'AddProducts' });
    },
    updateProduct(id) {
      this.$store.dispatch('getProductsById', id);
    },
    deleteProduct(id) {
      swal({
        title: 'Are you sure?',
        text:
          'Once deleted, you will not be able to recover this product file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch('deleteProducts', id);
          swal('Poof! Your product file has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your product file is safe!');
        }
      });
    },
  },
  created() {
    this.$store.dispatch('readProducts');
    // this.productData();
  },
  components: {},
};
</script>

<style></style>
