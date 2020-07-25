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
              <a class="btn btn-warning" @click.prevent="getDetail(product.id)">Detail</a>
            </td>
          </tr>
          <!-- End Looping data Product-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
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
      detailProduct: {
        id: '',
      },
    };
  },
  methods: {
    processDelete(id) {
      Swal.fire({
        title: 'Are You Sure?',
        text: 'This data cant be restored',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteProduct', id);
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
          });
        });
    },
    editProduct(product) {
      this.updateProduct.id = product.id;
      this.updateProduct.name = product.name;
      this.updateProduct.price = product.price;
      this.updateProduct.stock = product.stock;
      this.updateProduct.imageUrl = product.imageUrl;
      this.$store.commit('changeShowModal', true);
    },
    getDetail(id) {
      this.detailProduct.id = id;
      this.$store.dispatch('detailPage', this.detailProduct);
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style></style>
