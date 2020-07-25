<template>
  <div class="container">
      <form>
          <h1>Add Product</h1>
        <div class="form-group">
            <label for="product.name">Name</label>
            <input type="text" class="form-control" v-model="product.name">
        </div>
        <div class="form-group">
            <label for="image_url">Image url</label>
            <input type="text" class="form-control" v-model="product.image_url">
        </div>
        <div class="form-group">
            <label for="product.price">Price</label>
            <input type="number" class="form-control" v-model="product.price">
        </div>
        <div class="form-group">
            <label for="product.stock">Stock</label>
            <input type="number" class="form-control" v-model="product.stock">
        </div>
        <button @click.prevent="addProduct" class="btn btn-primary">Add Product</button>
    </form>
  </div>
</template>

<script>
    import store from '../store'
    import router from '../router'
    
    export default {
        name: 'Add Product',
        data(){
            return {
                product: {
                    name: '',
                    image_url: '',
                    price: 0,
                    stock: 0
                }
            }
        },
        methods: {
            addProduct(){
                this.$store.dispatch(`addProduct`, { 
                    name: this.product.name, 
                    image_url: this.product.image_url,
                    price: this.product.price,
                    stock: this.product.stock
                })
            }
        },
        beforeRouteEnter (to, from, next) {
        if (!localStorage.access_token){
            router.push({ path: '/' })
        } else {
            next()
        }
    }
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