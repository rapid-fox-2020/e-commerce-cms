<template>
  <div class="container col-6 mt-3">
    <h1>Add Your Secret Product Here</h1>
    <form @submit.prevent="submitImage">
      <div class="form-group">
        <label for="exampleInputEmail1">Image Name</label>
    <input type="text" class="form-control" v-model="$store.state.secret_name">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Image</label>
    <input type="file" class="form-control" id="exampleInputPassword1" @change="processImage">
  </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    processImage(event) {
      this.$store.commit('SET_SECRETIMAGE', event.target.files);
    },
    submitImage() {
      this.$store.dispatch('submitImage');
    },
  },
}
</script>

<style lang="css" scoped>
</style>
