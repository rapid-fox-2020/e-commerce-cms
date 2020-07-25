<template>
  <div>
    <button
      @click="add-product"
      id="add-product"
      type="button"
      class="btn btn-secondary"
      style="margin-top: 10px;"
    >Add Product</button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="showModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addProducts">
            <div class="modal-body">
              <div class="form-group">
                <label for="name-products">Name Products</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="nameProducts"
                  id="name-products"
                  placeholder="Enter Name Products"
                />
              </div>
              <div class="form-group">
                <label for="imageurl-products">Image Url</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageurl-products"
                  v-model="imageProducts"
                  placeholder="Enter Image Url"
                />
              </div>
              <div class="form-group">
                <label for="price-products">Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="price-products"
                  v-model="priceProducts"
                  placeholder="Enter Price"
                />
              </div>
              <div class="form-group">
                <label for="stock-products">Stock</label>
                <input
                  type="number"
                  class="form-control"
                  id="stock-products"
                  v-model="stockProducts"
                  placeholder="Enter Stock"
                />
              </div>
              <div class="form-group">
                <label for="category-products">Category</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageurl-products"
                  v-model="categoryProducts"
                  placeholder="Enter Category"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Add</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      modalShow: false,
      nameProducts: '',
      imageProducts: '',
      priceProducts: '',
      stockProducts: '',
      categoryProducts: '',
    };
  },
  methods: {
    showModal() {
      this.nameProducts = '';
      this.imageProducts = '';
      this.priceProducts = '';
      this.stockProducts = '';
      this.categoryProducts = '';

      this.showModal = true;
    },
    addProducts() {
      const name = this.nameProducts;
      const image = this.imageProducts;
      const price = this.priceProducts;
      const stock = this.stockProducts;
      const category = this.categoryProducts;
      this.$store.dispatch('addProducts', {
        name,
        image,
        price,
        stock,
        category,
      });
    },
  },
  created() {},
};
</script>

<style></style>
