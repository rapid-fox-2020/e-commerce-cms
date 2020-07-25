<template>
  <div class="container">
      <form>
        <h1>Edit Product</h1>
        <div class="form-group">
          <label for="product.name">Name</label>
          <input type="text" class="form-control" v-model="product.name" placeholder="product.name">
        </div>
        <div class="form-group">
          <label for="image_url">Image url</label>
          <input type="text" class="form-control" v-model="product.image_url" placeholder="product.image_url">
        </div>
        <div class="form-group">
          <label for="product.price">Price</label>
          <input type="number" class="form-control" v-model="product.price" placeholder="product.price">
        </div>
        <div class="form-group">
          <label for="product.stock">Stock</label>
          <input type="number" class="form-control" v-model="product.stock" placeholder="product.stock">
        </div>
        <button class="btn btn-primary" @click.prevent="editProduct">Edit Product</button> 
      </form>
  </div>
</template>

<script>
  import store from '../store'
  import router from '../router'

  export default {
      data(){
          return {
              product: {
                  name: this.$store.state.products[this.$route.params.id].name,
                  image_url: this.$store.state.products[this.$route.params.id].image_url,
                  price: this.$store.state.products[this.$route.params.id].price,
                  stock: this.$store.state.products[this.$route.params.id].stock
              }
          }
      },
      methods: {
        editProduct(){
          const updateProduct = {
            id: this.$store.state.products[this.$route.params.id].id,
            name: this.product.name,
            image_url: this.product.image_url,
            price: this.product.price,
            stock: this.product.stock
          }
          this.$store.dispatch('editProduct', updateProduct)
          router.push('/home')
          this.$store.dispatch('fetchProduct')
        }
      },
  }
</script>

<style scoped>

  .container {
        padding: 0 50px 50px 50px ;

    }

    .btn {
        width: 70%;
        margin: 10px 130px;
    }

    .container h1 {
        text-align: center;
    }


</style>