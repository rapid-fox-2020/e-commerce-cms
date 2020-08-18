<template>
  <div class="container col-6">
    <h1>Edit Your Product Here</h1>
      <Form @updatedData="editProduct">
    </Form>
  </div>
</template>

<script>
// import axios from 'axios';
import Form from '../components/Form.vue';

export default {
  components: {
    Form,
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
    editProduct() {
      this.$store.dispatch('editProduct')
        .then(() => {
          console.log(this.$route.params)
          this.$router.push({ name: 'Admin' });
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
