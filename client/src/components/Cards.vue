<template>
<div class="card">
<div class="deletebtn">
    <a href="#" style="font-size:30px" class="controlIcon" @click.prevent="deletebtn(cards.id)"><i class="material-icons" id="user-btn">delete</i></a>
    <a href="#" style="font-size:30px" class="controlIcon" @click.prevent="editpanel(cards.id)"><i class="material-icons" id="user-btn">edit</i></a>
  </div>
  <div class="tags">
    <p class="tag"><span class="glyphicon glyphicon-tag"></span> {{cards.genre}}</p>
  </div>
  <img class="card-img-top" :src="cards.image_url" alt="Card image cap">
  <div class="bodycard">
    <div class="card-body">
      <h5 class="card-title"><b>{{cards.name}}</b></h5>
      <div class="desc">
        {{cards.description}}
      </div>
      <div class="stock">
        <h6>Stock : {{cards.stock}}</h6>
      </div>
      <h5>IDR {{cards.price}}</h5>
      <div class="btn-detail">
        <form @submit.prevent="addStock(cards.id)">
          <input type="number" name="qty" id="qty" placeholder="0" v-model="qty" :min="0">
          <button type="submit" class="btn btn-primary">Add Stock</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Cards',
  props: ['cards'],
  data () {
    return {
      qty: 0
    }
  },
  methods: {
    addStock (id) {
      const payload = {
        id: id,
        stock: this.qty
      }
      this.$store.dispatch('addStock', payload)
        .then((data) => {
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
            title: 'Added successfully'
          })
          this.$store.dispatch('getProducts')
          this.qty = 0
        })
        .catch(err => {
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
          this.qty = 0
        })
    },
    editpanel (id) {
      this.$store.dispatch('openEditpage', id)
    },
    deletebtn (id) {
      this.$store.dispatch('deleteProduct', id)
        .then((result) => {
          this.$store.dispatch('getProducts')
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
            title: 'Deleted successfully'
          })
        })
    }
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  margin: 5px;
  height: 300px;
  border: none;
}

.card-img-top {
  width: 100%;
  height: inherit;
}

.desc {
  height: 40px;
}

.bodycard{
  position: absolute;
  display: flex;
  width: inherit;
  height: inherit;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.card-body{
  margin-top: 100px;
  color: aliceblue;
}

.tags {
  display: flex;
  justify-content: flex-end;
  width: inherit;
  position: absolute;
  color: rgb(255, 255, 255);
  z-index: 2;
}

.stock {
  height: 10px;
}

.btn-detail {
  margin-top: 10px;
}

#qty {
  border-radius: 5px;
  height: 33px;
  width: 33px;
  margin-right: 5px;
  margin-top: 3px;
  text-align: center;
  color: #000;
}

.deletebtn {
  z-index: 3;
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  height: 30px;
  width: 35px;
}

.controlIcon {
  background-color: rgb(255, 255, 255);
  padding: 5px;
  color: blue;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 50px;
  margin-top: 2px;
}

.controlIcon:hover {
  background: rgb(211, 211, 211);
  color: red;
  text-decoration: none;
}
</style>
