<template>
  <div class="container col-6 mt-4" style="text-align:center;">
    <h1>My Secret Products</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(secret,idx) in $store.state.secrets" :key="idx">
          <th scope="row">{{ idx+1 }}</th>
          <td><img :src="secret" width="400" ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getSecrets')
  },
}
</script>

<style lang="css" scoped>
</style>
