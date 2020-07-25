<template>
  <div class="home-layout">
    <div id="wrapper" style="display: flex;">
      <!-- Sidebar -->
      <div class="bg-info border-right" id="sidebar-wrapper" style="width: 200px; height:auto;">
        <div style="padding: 20px;" class="sidebar-heading">E-Commerce</div>
        <div class="list-group list-group-flush">
          <router-link
            to="/products/banner"
            class="list-group-item list-group-item-action bg-info"
            style="color: black;"
          >Banner</router-link>
          <router-link
            class="list-group-item list-group-item-action bg-info"
            style="color: black;"
            to="/products"
          >Products</router-link>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper" style="width:100%">
        <NavbarTopProducts></NavbarTopProducts>
        <TableProducts style="overflow: auto; height:640px;"></TableProducts>
      </div>

      <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->
  </div>
</template>

<script>
import TableProducts from '../components/TableProduct.vue';
import NavbarTopProducts from '../components/NavBarTopProducts.vue';

export default {
  components: {
    TableProducts,
    NavbarTopProducts,
  },
};
</script>

<style>
</style>
