<template>
  <div style="position: relative; margin: 0 auto; width: 500px; top: 200px;
            color:black; text-shadow: black 0px 0px 1px">
        <form @submit.prevent="editProduct">
            <h1>halaman Edit product</h1>
            <br>
            <div class="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"            
                    v-model="product.name">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Image URL</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"            
                    v-model="product.img_url">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Price</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"            
                    v-model="product.price">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Stock</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"            
                    v-model="product.stock">
            </div>
            <input class="btn btn-primary" type="submit" value="Submit">
            <router-link :to="`/dashboard`" class="btn btn-warning">cancel</router-link>
        </form>
  </div>
</template>
<script>
import router from '../router'
export default {
   data(){
       return {
           product:{
               name: "",
                img_url: "",
                price: "",
                stock: ""
           }
       }
   },

   created(){
       console.log(this.$route.params.product_id)
       this.$store.dispatch("getDataById", {id: this.$route.params.id, cb: (product)=> {
           this.product.name = product.name
           this.product.img_url = product.img_url
           this.product.price = product.price
           this.product.stock = product.stock
       }})
   },

   methods: {
       editProduct(){
           const updateData = {
                id: this.$route.params.id,
                name: this.product.name, 
                img_url: this.product.img_url,
                price: this.product.price,
                stock: this.product.stock 
           }
           console.log(updateData.id)
            this.$store.dispatch("editProduct",updateData)
            router.push('/dashboard')
        }
    }

   
}
</script>
<style scoped>
    form{
        color: white
    }
</style>

