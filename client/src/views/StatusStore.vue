<template>
  <div class="info">
        <table class="table">
            <thead class="thead-dark">
                <tr class="text-center">
                    <th scope="col">No.</th>
                    <th scope="col">Product's Name</th>
                    <th scope="col">Display</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Category</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <!-- looping data START -->
                <TableDataProduct
                v-for="(product, index) in $store.state.products"
                :key="index"
                :product="product" :index="index"></TableDataProduct>
                <!-- looping data END -->
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
