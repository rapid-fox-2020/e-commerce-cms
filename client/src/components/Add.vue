<template>
  <div class="Add">
    <div class="form-bg">
        <h1>Add New Product</h1>
        <form>
          <input type="text" placeholder="input title" id="form-input" v-model="newdata.name">
          <input type="text" placeholder="img_url" id="form-input" v-model="newdata.image_url">
          <input type="text" placeholder="input description" id="form-input" v-model="newdata.description">
          <select id="form-input-select" v-model="newdata.genre">
          <option value="" selected>Select Genre</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Horror">Horror</option>
          <option value="Simulation">Simulation</option>
          </select>
          <input type="number" placeholder="input stock" id="form-input-number" :min="0" v-model="newdata.stock">
          <input type="number" placeholder="input price" id="form-input-number" :min="0" v-model="newdata.price">
          <div class="btn-panel">
          <button class="btn btn-primary" id="addbtn" @click.prevent="add">Create</button>
          <button class="btn btn-primary" id="cancelbtn" @click.prevent="cancelAdd">Cancel</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Add',
  data() {
    return {
      newdata: {
        name: '',
        image_url: '',
        description: '',
        stock: '',
        price: '',
        genre: '',
      },
    };
  },
  methods: {
    add() {
      this.$store.dispatch('addProduct', this.newdata)
        .then(() => {
          this.$store.dispatch('closeAddpage');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Added successfully',
          });
          this.$store.dispatch('getProducts');
        })
        .catch((err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: err,
          });
        });
    },
    cancelAdd() {
      this.$store.dispatch('closeAddpage');
    },
  },
};
</script>

<style scoped>
.Add{
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 4;
}

.form-bg{
  color: white;
  margin-top: 100px;
  background: rgba(0, 0, 0, 0.9);
  width: 500px;
  height: 400px;
  position: fixed;
}

#form-input{
  width: 400px;
  height: 25px;
  text-align: center;
  margin-top: 20px;
  color: black;
}

#form-input-select{
  height: 25px;
  width: 400px;
  text-align: center;
  margin-top: 20px;
  color: black;
}

#form-input-number{
  height: 25px;
  margin-top: 20px;
  width: 200px;
  color: black;
  text-align: center;
}
.btn-panel{
  margin-top: 30px;
}

#addbtn{
  margin-right: 5px;
  width: 200px;
}

#cancelbtn{
  margin-right: 5px;
  width: 200px;
}
</style>
