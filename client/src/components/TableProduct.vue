<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Stock</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in $store.state.products" :key="index">
          <th scope="row">{{index+1}}</th>
          <td>{{product.name}}</td>
          <td>
            <img :src="product.image_url" width="100px" />
          </td>
          <td>{{product.stock}}</td>
          <td>{{product.price}}</td>
          <td>
            <button type="button" class="btn btn-info" @click="toEdit(index)">Edit</button>
            |
            <button
              type="button"
              class="btn btn-danger"
              @click="destroy(product.id)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "../router";

export default {
  methods: {
    destroy(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(data => {
        console.log(data);
        if (data.isConfirmed) {
          this.$store.dispatch("deleteProduct", id);
        } else if (data.isDismissed) {
          this.$swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
    },
    toEdit(id) {
      router.push({ path: `/edit/${id}` });
    }
  },
  created() {
    this.$store.dispatch("getProducts");
    // console.log(this.$store.state.products, "cekkkkkkkk");
  }
};
</script>

<style>
</style>