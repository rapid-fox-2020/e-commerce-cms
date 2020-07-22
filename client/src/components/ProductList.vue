<template>
  <div>
    <EditModal :updatedProduct="updateProduct"></EditModal>
    <!-- Start Looping data Product -->
    <div class="container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, idx) in this.$store.state.products" :key="idx">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-success" @click="editProduct(product)">
                Edit
              </button>
              |
              <button type="button" class="btn btn-danger" @click="processDelete(product.id)">
                Delete
              </button>
              |
              <router-link
                class="btn btn-warning"
                :to="{ name: 'DetailPage', params: { id: product.id, product: product } }"
                >Detail</router-link
              >
            </td>
          </tr>
          <!-- End Looping data Product-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EditModal from './EditModal.vue';

export default {
  name: 'ProductList',
  components: {
    EditModal,
  },
  data() {
    return {
      updateProduct: {
        id: '',
        name: '',
        stock: '',
        price: '',
        imageUrl: '',
      },
    };
  },
  methods: {
    processDelete(id) {
      this.$store.dispatch('deleteProduct', id);
    },
    editProduct(product) {
      this.updateProduct.id = product.id;
      this.updateProduct.name = product.name;
      this.updateProduct.price = product.price;
      this.updateProduct.stock = product.stock;
      this.updateProduct.imageUrl = product.imageUrl;
      this.$store.dispatch('changeShowModal');
    },
  },
};
</script>

<style></style>
