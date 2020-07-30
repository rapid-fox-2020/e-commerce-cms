<template>
    <div class="col-4 col bg-info p-3 rounded-lg mt-3">
        <form  v-on:submit.prevent="added" class="mt-3">
            <h2>Add Product</h2><br>
            <div class="form-group">
                <label for="exampleInputTitle1">Name</label>
                <input type="text" class="form-control" aria-describedby="emailHelp" v-model="name">
                <small class="form-text">*required</small>
            </div>
            <div class="form-group">
                <label for="exampleInputDescription1">Image</label>
                <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="input image url" v-model="image_url">
                <small class="form-text">*required</small>
            </div>
            <div class="form-group">
                <label for="exampleInputStatus1">Price</label>
                <input type="text" class="form-control" placeholder="e.g. 100000" 
                 aria-describedby="emailHelp" v-model="price">
                <small class="form-text">*required</small>
            </div>
            <div class="form-group">
                <label for="exampleInputDueDate1">Stock</label>
                <input type="number" class="form-control" aria-describedby="emailHelp" v-model="stock">
                <small class="form-text">*required</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button> &nbsp;&nbsp;
            <router-link :to="{name: 'MainPage'}">
            <button type="submit" class="btn btn-warning">Cancel</button>
            </router-link>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            name: '',
            image_url: '',
            price: null,
            stock: null,
        };
    },
    methods: {
        added() {
            const obj = {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock,
            };
            this.$store.dispatch('addProduct', obj);
        },
    },
};
</script>

<style></style>
