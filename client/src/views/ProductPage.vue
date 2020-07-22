<template>
  <div>
    <!--Start add Button-->
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-info" @click="toFormAdd">Add Products</button> |
      <button type="button" class="btn btn-secondary" @click="processLogout">Logout</button>
    </div>
    <!--End add Button-->

    <ProductList></ProductList>
    <router-view />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'ProductPage',
  components: {
    ProductList,
  },
  methods: {
    toFormAdd() {
      this.$router.push({ name: 'FormAdd' });
    },
    toDetailPage(id) {
      this.$router.push({ name: 'DetailPage', params: { id } });
    },
    processLogout() {
      this.$store.dispatch('logout', () => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('fetchProducts');
    }
  },
};
</script>

<style scoped></style>
