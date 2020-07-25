<template>
  <!-- Mainboard -->
  <section class="container pt-4">
    <aside class="alert alert-danger" v-if="status === 200">
      <strong>SUCCESS</strong> delete product.
    </aside>

    <div>
      <h1 class="page-label">Product List</h1>
    </div>

    <!-- Table -->
    <div class="mt-3 table-responsive scroll">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in $store.state.products" :key="product.id">
            <td>{{ index + 1}}</td>
            <td>{{ product.name }}</td>
            <td>
              <img :src="product.image_url" alt width="80" />
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <i
                class="fa fa-pencil-square"
                style="margin-right: 10px;"
                @click.prevent="edit(product)"
              ></i>
              <i class="fa fa-trash" @click.prevent="destroy(product.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: "AddProduct",
  data() {
    return {
      status: null,
    }
  },
  created() {
    this.$store.dispatch("fetchProduct");
  },
  methods: {
    destroy(productId) {
      swal({
        title: "Are you sure?",
        text: "This product will be delete permanently",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(answer => {
        if (answer) {
          return this.$store.dispatch("destroyProduct", productId);
        }
      })
      .then(res => {
        this.status = res;
      })
      .catch(err => console.log(err));
    },
    edit(product) {
      this.$emit("editPage", product);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td i {
  cursor: pointer;
  text-decoration: none;
  color: grey;
  font-size: 35px !important;
}
td i:hover {
  color: #1f8dd6;
}
table a {
  font-size: 30px;
  text-decoration: none !important;
  color: grey;
  padding-top: -30px;
}
table td {
  vertical-align: middle !important;
}
.scroll {
  height: 650px !important;
  overflow: scroll;
}
</style>
