<template>
    <div style="position: relative; margin: 0 auto; width: 500px; top: 200px;
            color:black; text-shadow: black 0px 0px 1px" >
        <h1>halaman Add product</h1>
        <form @submit.prevent="addProduct">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" 
                 v-model="product.name" >
            </div>

            <div class="form-group">
                <label for="img_url">Image URL</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="img_url" 
                    v-model="product.img_url">
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input 
                    type="text" class="form-control" 
                    id="price" 
                    v-model="product.price">
            </div>
            <div class="form-group">
                <label for="stock">Stock</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="stock" 
                    v-model="product.stock">
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
            
            <router-link :to="`/dashboard`">
                <button type="button" class="btn btn-warning">Cancle</button>
            </router-link>
        </form>
        
    </div>
</template>

<script>
import router from '../router'
export default {
    data(){
        return{
            product:{
                name: "",
                img_url: "",
                price: 0,
                stock: 0
            }
        }
    },
    methods: {
        addProduct(){
            this.$store.dispatch("addProduct",{product: this.product ,cb: () => {
                this.$router.push({path: "/dashboard"})
            }})
        }
    }
    
}
</script>