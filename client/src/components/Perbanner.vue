<template>
    <tr>
      <td scope="row">{{ banner[1]+1 }}</td>
      <td><img :src='banner[0].image_url' width="400px"></td>
      <td>{{ banner[0].status }}</td>
      <td>
        <router-link :to="{ name: 'BannerEdit', params: {id: banner[0].id} }">
          <button type="button" name="button"
          class="btn btn-info mr-2" @click="editBanner(banner[0].id)">
          <i class="fa fa-wrench" aria-hidden="true"></i> | Edit</button>
        </router-link>
        <button type="button" name="button" class="btn btn-danger mr-2"
        data-toggle="modal" data-target="#confirmationmodalbanner" @click="getIdBanner(banner[0].id)">
        <i class="fa fa-trash" aria-hidden="true"></i> | Delete</button></td>
      </td>
    </tr>
</template>

<script>

export default {
  props: ['banner'],
  methods: {
    editBanner(id) {
      this.$store.dispatch('getBannerById', id);
    },
    deleteBanner(id) {
      this.$store.dispatch('deleteBanner', id);
    },
    getIdBanner(id) {
      this.$store.commit('SET_IDBANNER', id);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
