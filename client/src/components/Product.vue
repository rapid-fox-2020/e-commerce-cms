<template>
    <tr>
      <td scope="row">{{ product.id }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.image_url }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.stock }}</td>
      <td>
        <router-link :to="{ name: 'ProductEdit', params: {id: product.id} }">
          <button type="button" name="button" class="btn btn-info mr-2">
          <i class="fa fa-wrench" aria-hidden="true"></i> | Edit</button>
        </router-link>
        <button type="button" name="button" class="btn btn-danger mr-2">
        <i class="fa fa-trash" aria-hidden="true"></i> | Delete</button></td>
    </tr>
</template>

<script>
export default {
  props: ['product'],
};
</script>

<style lang="css" scoped>
</style>
