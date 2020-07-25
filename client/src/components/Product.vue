<template>
    <tr>
      <td scope="row">{{ product[1]+1 }}</td>
      <td>{{ product[0].name }}</td>
      <td><img :src='product[0].image_url' width="100px"></td>
      <td>Rp. {{ Number((product[0].price).toFixed(1)).toLocaleString() }}</td>
      <td>{{ product[0].stock }}</td>
      <td>
        <router-link :to="{ name: 'ProductEdit', params: {id: product[0].id} }">
          <button type="button" name="button"
          class="btn btn-info mr-2" @click="editProduct(product[0].id)">
          <i class="fa fa-wrench" aria-hidden="true"></i> | Edit</button>
        </router-link>
        <button type="button" name="button" class="btn btn-danger mr-2"
        data-toggle="modal" data-target="#confirmationmodal" @click="getId(product[0].id)">
        <i class="fa fa-trash" aria-hidden="true"></i> | Delete</button></td>
    </tr>
</template>

<script>

export default {
  props: ['product'],
  methods: {
    editProduct(id) {
      this.$store.dispatch('getProductById', id);
    },
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', id);
    },
    getId(id) {
      this.$store.commit('SET_IDPRODUCT', id);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
