<template>
  <div class="home">
  <Add v-if="openAddpage" />
  <Edit v-if="openEditpage" />
  <div class="navigation">
    <Navbar />
  </div>
    <Login v-if="!log" />
    <Content v-if="log" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from './Login.vue';
import Navbar from '../components/Navbar.vue';
import Add from '../components/Add.vue';
import Edit from '../components/Edit.vue';
import Content from '../components/Content.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Navbar,
    Content,
    Add,
    Edit,
  },
  computed: {
    log() {
      return this.$store.state.logged;
    },
    openAddpage() {
      return this.$store.state.openAdd;
    },
    openEditpage() {
      return this.$store.state.openEdit;
    },
  },
  created() {
    if (localStorage.access_token) {
      this.$store.dispatch('Logged');
    }
  },
};
</script>
<style scoped>
.home{
  width: 100%;
}
.navigation{
  height: 150px;
}
</style>
