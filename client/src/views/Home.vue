<template>
  <div class="container">
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Stock</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in $store.state.products" :key="index">
          <td>{{index + 1}}</td>
          <td>{{product.name}}</td>
          <td><img :src="product.image_url"></td>
          <td>{{product.stock}}</td>
          <td>{{product.price}}</td>
          <td>
            <router-link :to="`/edit-product/${index}`"><button class="btn btn-primary"><i class="fa fa-pencil"></i> Edit</button></router-link>
             | <button @click="deleteProduct(product.id)" class="btn btn-danger"> <i class="fa fa-trash"></i> Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import store from '../store'
import router from '../router'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    deleteProduct(id){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch(`deleteProduct`, id)
          swal("Your file has been deleted!", {
            icon: "success",
          });
        }
      });
    }
  },
  created(){
    // console.log(`created ini home`)
    this.$store.dispatch(`fetchProduct`)
    console.log('created')

  },
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    if (!localStorage.access_token){
        router.push({ path: '/' })
    } else {
        next()
    }
  }
}
</script>

<style scoped>
  table {
    text-align: center;
    border: 1px black;
  }

  img {
    height: 200px;
    width: 200px;
    object-fit: cover;
  }
</style>
