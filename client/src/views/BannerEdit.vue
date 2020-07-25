<template>
  <div class="container col-6">
    <h1>Edit Your Banner Here</h1>
      <FormBanner @updatedData="editBanner">
    </FormBanner>
  </div>
</template>

<script>
// import axios from 'axios';
import FormBanner from '../components/FormBanner.vue';

export default {
  components: {
    FormBanner,
  },
  watch: {
    $route() {
      // this.getProduct();
    },
  },
  data() {
    return {

    };
  },
  methods: {
    editBanner() {
      this.$store.dispatch('editBanner')
        .then(() => {
          this.$router.push({ name: 'Banner' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
  },
};
</script>

<style lang="css" scoped>
</style>
