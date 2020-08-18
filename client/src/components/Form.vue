<template>
  <form v-on:submit.prevent="sendUpdateData">
    <div class="form-group">
      <label for="exampleInputEmail1">Product Name</label>
      <input type="text" class="form-control" placeholder="product_name"
      v-model="$store.state.name">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Image_URL</label>
      <input type="text" class="form-control" placeholder="image_url"
      v-model="$store.state.url">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Price</label>
      <input type="number" class="form-control"
      placeholder="product_price" v-model="$store.state.price">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Stock</label>
      <input type="number" class="form-control"
      placeholder="product_stock" v-model="$store.state.stock">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Category</label>
      <select class="form-control" id="exampleFormControlSelect1" v-model="$store.state.category">
        <option :selected="$store.state.category == 'Kemeja'" >Kemeja</option>
        <option :selected="$store.state.category == 'Kaos'" >Kaos</option>
        <option :selected="$store.state.category == 'Celana'" >Celana</option>
        <option :selected="$store.state.category == 'Sepatu'" >Sepatu</option>
        <option :selected="$store.state.category == 'Jas'" >Jas</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary mr-3">Submit</button>
    <router-link :to="{ name: 'Admin' }">
    <button type="button" class="btn btn-secondary" @click="backButton">Back</button>
  </router-link>
  </form>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    sendUpdateData() {
      this.$emit('updatedData');
    },
    backButton() {
      this.$store.commit('SET_EMPTYDATA')
    },
  },
  created() {
    // const temp1 = !this.productName ? '' : this.productName;
    // this.name = temp1;
    // const temp2 = !this.productURL ? '' : this.productURL;
    // this.url = temp2;
    // const temp3 = !this.productPrice ? '' : this.productPrice;
    // this.price = temp3;
    // const temp4 = !this.productStock ? '' : this.productStock;
    // this.stock = temp4;
    // this.name = this.productName || '';
    // this.url = this.productURL || '';
    // this.price = this.productPrice || '';
    // this.stock = this.productStock || '';
  },
  watch: {
    // productName() {
    //   const temp1 = !this.productName ? '' : this.productName;
    //   this.name = temp1;
    // },
    // productURL() {
    //   const temp2 = !this.productURL ? '' : this.productURL;
    //   this.url = temp2;
    // },
    // productPrice() {
    //   const temp3 = !this.productPrice ? '' : this.productPrice;
    //   this.price = temp3;
    // },
    // productStock() {
    //   const temp4 = !this.productStock ? '' : this.productStock;
    //   this.stock = temp4;
    // },
  },
};
</script>

<style lang="css" scoped>
</style>
