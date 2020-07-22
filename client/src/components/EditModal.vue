<template>
  <div>
    <!--Start Modal -->
    <div class="loadingModal" v-if="this.$store.state.showModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update Product</h5>
              <button type="button" class="close" @click="modalEdit">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!--Start Form -->
              <form @submit.prevent="processUpdate">
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text" class="form-control" v-model="updatedProduct.name" />
                </div>
                <div class="form-group">
                  <label>Product Price</label>
                  <input
                    type="number"
                    step="500"
                    class="form-control"
                    v-model="updatedProduct.price"
                  />
                </div>
                <div class="form-group">
                  <label>Product Stock</label>
                  <input
                    type="number"
                    min="1"
                    class="form-control"
                    v-model="updatedProduct.stock"
                  />
                </div>
                <div class="form-group">
                  <label>Product Image(url)</label>
                  <input type="text" class="form-control" v-model="updatedProduct.imageUrl" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button> |
                <button type="button" class="btn btn-secondary" @click="modalEdit">Close</button>
              </form>
              <!--End Form -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End Modal -->
  </div>
</template>

<script>
export default {
  name: "EditModal",
  props: ["updatedProduct"],
  methods: {
    processUpdate() {
      this.$store.dispatch("updateProduct", this.updatedProduct);
      this.$store.dispatch("changeShowModal");
    },
    modalEdit() {
      this.$store.dispatch("changeShowModal");
    }
  }
};
</script>

<style scoped>
.loadingModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  /*display: none;*/
}

.theModal {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  width: 100%;
  min-width: 600px;
  max-width: 800px;
  /*background: white;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: center;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
