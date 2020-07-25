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
        <h1 style="margin-left: 390px;">Example Products</h1>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
          style="width: 500px; height: 600px; margin-left: 300px;"
        >
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="d-block w-100"
                src="https://cdn.shopify.com/s/files/1/0036/4806/1509/products/m007275345.jpg?v=1588420988"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="https://www.notebookcheck.net/fileadmin/_processed_/4/a/csm_GL504_Hero_Cam05Lighting_v1_740f45a0ab.jpg"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/8/28/19034383/19034383_04d28c27-4359-49c5-8888-19a3e3ecf0c3_1500_1500"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>

      <!-- /#page-content-wrapper -->
    </div>
    <router-view />
    <!-- /#wrapper -->
  </div>
</template>

<script>
import TableProducts from '../components/TableProduct.vue';
import NavbarTopProducts from '../components/NavBarTopProducts.vue';

export default {
  data() {
    return {
      moveToBanner() {
        this.$router.push({ name: 'BannerProducts' });
      },
    };
  },
  methods: {},
  components: {
    NavbarTopProducts,
  },
};
</script>

<style>
</style>
