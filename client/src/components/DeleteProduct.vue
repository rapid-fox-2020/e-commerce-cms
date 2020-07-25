<template>
  <div class="p-5 bg-warning">
    <h1> Are you sure want to delete Product "{{ name }}" ? </h1>
    <button class="btn btn-info mr-4" @click="cancelDelete"> Cancel </button>
    <button class="btn btn-danger" @click="processDeleteProduct"> Destroy </button>
  </div>

  <!-- <tr>
    <th scope="row"> {{ data.id }} </th>
    <td>{{ data.name }}</td>
    <td>{{ data.image_url }}</td>
    <td>{{ data.price }}</td>
    <td>{{ data.stock }}</td>
    <td> <button class="btn btn-warning" @click="showUpdateForm(data.id)"> edit </button> ||
        <button class="btn btn-danger" @click="processDeleteProduct(data.id)"> delete </button>
    </td>
  </tr> -->
</template>

<script>

export default {
  name: 'Product',
  data() {
    return {
      id: null,
      name: null,
    };
  },
  props: ['data'],
  methods: {
    processDeleteProduct() {
      const deletedDataId = this.id;
      console.log(deletedDataId, 'deletedDataId');
      this.$store.dispatch('processDeleteProduct', deletedDataId);
    },
    cancelDelete() {
      this.$store.commit('BACK_HOME');
    },
  },
  created() {
    // const detail = this.$store.state.
    const data = this.$store.state.selectedProduct;
    this.id = data.id;
    this.name = data.name;
    console.log('masuk di product detail');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
