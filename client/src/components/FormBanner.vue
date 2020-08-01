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
};
</script>

<style lang="css" scoped>
</style>
