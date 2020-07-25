<template>
  <div id="page-content-wrapper">
    <div class="container-fluid col-9 mt-5">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="justify-content: center;">Name</th>
            <th scope="col" style="justify-content: center;">Image</th>
            <th scope="col" style="justify-content: center;">Price</th>
            <th scope="col" style="justify-content: center;">Stock</th>
            <th scope="col" style="justify-content: center;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,idx) in $store.state.products" :key="idx">
            <td style="font-weight: bolder" scope="row">{{product.name}}</td>
            <td><img :src="product.image_url" style="width:400px;height:345px;"></td>
            <td> {{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}}</td>
            <td>{{product.stock}}</td>
            <td>
              <router-link class="text-white" :to="{name: 'EditForm', params: {id: product.id}}">
                <button @click="edit(product.id)" type="button"
                  class="btn btn-success"><i class="fa fa-pencil" aria-hidden="true"> Edit</i>
                </button> 
              </router-link> &nbsp;&nbsp;
              <button @click="deleteProduct(product.id)" type="button"
              class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"> Delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: null,
    };
  },
  methods: {
    edit(id) {
      this.$store.dispatch('getData', id);
    },
    deleteProduct(id) {
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover after Delete it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Succesfully Deleted Data!", {
            icon: "success",
          });
          this.$store.dispatch('deleteProds', id);
        } else {
          swal("Delete Data Canceled!");
        }
      });
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
#wrapper {
  overflow-x: hidden;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}
#page-content-wrapper {
  min-width: 100vw;
}
#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}
@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
