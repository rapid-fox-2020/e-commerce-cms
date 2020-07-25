<template>
    <div>
        <Navbar></Navbar>
        <router-view />

        <table class="table table-dark">
        <thead class="thead-dark">
            <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Action  </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product,i) in $store.state.products" :key="product.id">
            <th scope="row">{{i + 1}}</th>
            <td>{{product.name}}</td>
            <td>
                <img :src="product.img_url" width="150px">
            </td>
            <td>{{product.price}}</td>
            <td>{{product.stock}}</td>
            <router-link :to="`Edit-Product/${product.id}`">
                <button type="button" class="btn btn-warning">Update</button>
            </router-link> 
            |
            <button type="button" @click="deleteproduct(product.id)" class="btn btn-danger">Delete</button>
            </tr>
        </tbody>
        </table>
    </div>

</template>
<script>
import Navbar from "../components/Navbar.vue"
export default {
    components: {
        Navbar
    },
  created(){
      //untuk memanggil action fetchproduct (action pakai dispatch),
      this.$store.dispatch("fetchProduct")
      console.log("ini console.log product di dashboard")
  },
  methods:{
      deleteproduct(id){
          this.$store.dispatch("deleteProduct", id)
      }
  }

    
}
</script>

<style scoped>
    .navbar{
        margin-bottom: 40px;
    }
</style>