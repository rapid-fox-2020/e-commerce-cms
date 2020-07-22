<template>
  <div>
    <!-- <h1>BISA detail page</h1> -->
    <div class="container">
      <div class="card">
        <img v-bind="{src:$route.params.product.imageUrl}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{$route.params.product.name}}</h5>
          <p class="card-text">Stock: {{$route.params.product.stock}}</p>
          <p class="card-text">Price: {{$route.params.product.price}}</p>
          <button class="btn btn-danger" @click="closeCard">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  methods: {
    closeCard() {
      this.$router.push({ name: 'ProductPage' });
    },
  },
};
</script>

<style>
</style>
