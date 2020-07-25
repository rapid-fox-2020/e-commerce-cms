<template>
  <div class="home-layout">
    <div id="wrapper" style="display: flex; ">
      <!-- Sidebar -->
      <div
        class="border-right"
        id="sidebar-wrapper"
        style="background-color:#041E3A; color:white; width: 200px; height:auto;"
      >
        <div
          style="padding: 20px; background-color:#041E3A; color:white;"
          class="sidebar-heading"
        >E-Commerce</div>
        <div class="list-group list-group-flush">
          <a
            @click="moveToBanner"
            class="list-group-item list-group-item-action"
            style="background-color:#041E3A; color:white;"
          >Banner</a>
          <router-link
            class="list-group-item list-group-item-action"
            style="background-color:#041E3A; color:white;"
            to="/products"
          >Products</router-link>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper" style="width:100%">
        <NavbarTopProducts style="background-color:#041E3A; color:white;"></NavbarTopProducts>
        <TableProducts style="overflow: auto; height:640px;"></TableProducts>
      </div>

      <!-- /#page-content-wrapper -->
    </div>
    <router-view />
    <!-- /#wrapper -->
  </div>
</template>

<script>
import TableProducts from "../components/TableProduct.vue";
import NavbarTopProducts from "../components/NavBarTopProducts.vue";

export default {
  data() {
    return {};
  },
  methods: {
    moveToBanner() {
      this.$router.push({ name: "BannerProducts" });
    }
  },
  components: {
    TableProducts,
    NavbarTopProducts
  }
};
</script>

<style></style>
