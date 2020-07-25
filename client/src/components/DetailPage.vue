<template>
  <div>
    <!-- <h1>BISA detail page</h1> -->
    <div class="container d-flex justify-content-center">
      <div class="card" style="width: 18rem;">
        <img v-bind="{ src: $store.state.product.imageUrl }" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ $store.state.product.name }}</h5>
          <p class="card-text">Stock: {{ $store.state.product.stock }}</p>
          <p class="card-text">Price: {{ $store.state.product.price }}</p>
          <button class="btn btn-danger" @click="closeCard">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPage",
  methods: {
    closeCard() {
      this.$router.push({ name: "ProductPage" });
    }
  }
};
</script>

<style></style>
