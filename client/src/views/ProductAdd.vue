<template>
  <div class="container col-6">
    <h1>Add Your Product Here</h1>
      <Form @updatedData="addProduct"></Form>
  </div>
</template>

<script>
// import axios from 'axios';
import Form from '../components/Form.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
    };
  },
  methods: {
    addProduct() {
      this.$store.dispatch('addProduct')
        .then(() => {
          this.$router.push({ name: 'Admin' });
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
