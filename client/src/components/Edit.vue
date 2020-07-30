<template>
  <div class="Edit">
    <div class="form-bg">
        <h1>Edit Product</h1>
        <form>
          <input type="text" id="form-input" :placeholder="editing.name" v-model="newdata.name" required>
          <input type="text" id="form-input" :placeholder="editing.image_url" v-model="newdata.image_url" required>
          <input type="text" id="form-input" :placeholder="editing.description" v-model="newdata.description" required>
          <select id="form-input-select" v-model="newdata.genre">
          <option value="" selected>Select Genre</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Horror">Horror</option>
          <option value="Simulation">Simulation</option>
          </select>
          <input type="number" id="form-input-number" :placeholder="editing.stock" :min="0" v-model="newdata.stock" required>
          <input type="number" id="form-input-number" :placeholder="editing.price" :min="0" v-model="newdata.price" required>
          <div class="btn-panel">
          <button class="btn btn-primary" id="Editbtn" @click.prevent="edit">Edit</button>
          <button class="btn btn-primary" id="cancelbtn" @click.prevent="cancelEdit">Cancel</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Edit',
  data () {
    return {
      newdata: {
        name: '',
        image_url: '',
        description: '',
        stock: '',
        price: '',
        genre: ''
      }
    }
  },
  computed: {
    editing () {
      return this.$store.state.editProduct
    }
  },
  methods: {
    cancelEdit () {
      this.$store.dispatch('closeEditpage')
    },
    edit () {
      const payload = {
        name: this.newdata.name || this.editing.name,
        image_url: this.newdata.image_url || this.editing.image_url,
        description: this.newdata.description || this.editing.description,
        stock: this.newdata.stock || this.editing.stock,
        price: this.newdata.price || this.editing.price,
        genre: this.newdata.genre || this.editing.genre,
        id: this.editing.id
      }
      this.$store.dispatch('edit', payload)
        .then(data => {
          this.$store.dispatch('closeEditpage')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Edited successfully'
          })
          this.$store.dispatch('getProducts')
        })
        .catch(err => {
          this.$store.dispatch('closeEditpage')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: err
          })
        })
    }
  }
}
</script>

<style scoped>
.Edit{
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
  margin-top: 20px;
  width: 200px;
  color: black;
  text-align: center;
}
.btn-panel{
  margin-top: 30px;
}

#Editbtn{
  margin-right: 5px;
  width: 200px;
}

#cancelbtn{
  margin-right: 5px;
  width: 200px;
}
</style>
