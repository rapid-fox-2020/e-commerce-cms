<template>
  <div class="container mt-3">
    <div class="intro">
      <h1>List of Banners</h1>
      <button type="button" name="button" class="btn btn-primary mt-3 mb-4"
      v-on:click="showFormAdd">
        <i class="fa fa-plus-square" aria-hidden="true"></i> | Add Banner</button>
    </div>
    <BannerModal></BannerModal>
    <table class="table table-striped" style="text-align:center;">
    <thead>
      <tr>
        <th scope="col">id_Banner</th>
        <th scope="col">Banner Image</th>
        <th scope="col">Banner Status</th>
        <th scope="col">Actions</th>
      </tr>
      <Perbanner v-for="(banner,index) in $store.state.banners"
      :key="banner.id" :banner="[banner,index]"></Perbanner>
    </thead>
    <tbody>

    </tbody>
  </table>
  </div>
</template>

<script>
import Perbanner from '../components/Perbanner.vue';
import BannerModal from '../components/BannerModal.vue';

export default {
  components: {
    Perbanner,
    BannerModal,
  },
  methods: {
    showFormAdd() {
      this.$store.commit('SET_EMPTYDATABANNER')
      this.$router.push({ name: 'BannerAdd' });
    },
  },
  created() {
    this.$store.dispatch('getBanners');
    this.$store.commit('SET_ISLOGIN');
  }
}
</script>

<style lang="css" scoped>
.intro {
  text-align: center;
}
</style>
