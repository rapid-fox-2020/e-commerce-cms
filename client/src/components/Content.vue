<template>
<div class="content">
  <div class="cards d-flex justify-content-center flex-wrap">
    <Cards v-for="product in products" :key="product.name" :cards="product" />
  </div><br><br>
</div>
</template>

<script>
import Cards from '@/components/Cards.vue';

export default {
  name: 'Content',
  components: {
    Cards,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.content{
  width: 100%;
  height: 100%;
}
</style>
