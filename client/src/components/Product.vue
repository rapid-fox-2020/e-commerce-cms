<template>
  <tr>
    <th scope="row"> {{ data.id }} </th>
    <td>{{ data.name }}</td>
    <!-- <td>{{ data.image_url }}</td> -->
    <td> <img :src="data.image_url" alt="no preview" style="width: 100px">
    </td>
    <td>{{ data.price }}</td>
    <td>{{ data.stock }}</td>
    <td> <button class="btn btn-warning" @click="showUpdateForm(data.id)"> Edit </button> ||
         <button class="btn btn-danger" @click="showDeleteForm(data.id)"> Delete </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Product',
  props: ['data'],
  methods: {
    processDeleteProduct(id) {
      this.$store.dispatch('processDeleteProduct', id);
    },
    showUpdateForm(id) {
      const data = {
        id,
        action: 'update',
      };
      this.$store.dispatch('getProductByPk', data);
    },
    showDeleteForm(id) {
      const data = {
        id,
        action: 'delete',
      };
      this.$store.dispatch('getProductByPk', data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
