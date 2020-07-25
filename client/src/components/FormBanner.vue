<template>
  <form v-on:submit.prevent="sendUpdateData">
    <div class="form-group">
      <label for="exampleInputEmail1">Banner Image_URL</label>
      <input type="text" class="form-control" placeholder="banner_image_url"
      v-model="$store.state.banner_image_url">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Banner Status</label>
      <select class="form-control" id="exampleFormControlSelect1" v-model="$store.state.banner_status">
        <option :selected="$store.state.banner_status == 'active'" >Active</option>
        <option :selected="$store.state.banner_status == 'inactive'" >Inactive</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary mr-3">Submit</button>
    <router-link :to="{ name: 'Banner' }">
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
      this.$store.commit('SET_EMPTYDATABANNER')
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
