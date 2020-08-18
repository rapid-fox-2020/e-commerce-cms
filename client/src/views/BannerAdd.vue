<template>
  <div class="container col-6">
    <h1>Add Your Banner Here</h1>
      <FormBanner @updatedData="addBanner"></FormBanner>
  </div>
</template>

<script>
// import axios from 'axios';
import FormBanner from '../components/FormBanner.vue';

export default {
  components: {
    FormBanner,
  },
  data() {
    return {
    };
  },
  methods: {
    addBanner() {
      this.$store.dispatch('addBanner')
        .then(() => {
          this.$router.push({ name: 'Banner' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
