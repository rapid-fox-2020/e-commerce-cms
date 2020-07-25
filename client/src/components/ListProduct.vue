<template>
  <!-- Mainboard -->
  <section class="container pt-4">
    <div>
      <h1 class="page-label">Product List</h1>
    </div>

    <!-- Table -->
    <div class="mt-3 table-responsive scroll">
      <table class="table table-striped scroll">
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
        <tbody class="scroll">
          <tr v-for="(product, index) in $store.state.products" :key="product.updatedAt">
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
export default {
  name: "AddProduct",
  created() {
    this.$store.dispatch("fetchProduct");
  },
  methods: {
    destroy(productId) {
      this.$store.dispatch("destroyProduct", productId);
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
