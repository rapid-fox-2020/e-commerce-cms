<template>
  <div class="modal fade" id="confirmationmodalbanner" tabindex="-1"
  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmationmodal">Delete</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure want to delete this banner?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
          @click="deleteThisBanner" data-dismiss="modal">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteThisBanner() {
      this.$store.dispatch('deleteBanner')
        .then(() => {
          this.$store.dispatch('getBanners');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
