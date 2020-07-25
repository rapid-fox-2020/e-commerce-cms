'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Products', [{
       name: 'Baju 1',
       image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/9/6143497/6143497_b4519a1b-9e8a-45d2-8359-73c787f39bf9_640_640.jpg',
       price: 100000,
       stock: 10,
       category: "Kemeja",
       createdAt: new Date(),
       updatedAt: new Date()
     }, {
        name: 'Baju 2',
        image_url: 'https://cf.shopee.co.id/file/e7e4fc1cd889153622715774b0193f54',
        price: 100000,
        stock: 10,
        category: "Kaos",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
         name: 'Baju 3',
         image_url: 'https://s3-ap-southeast-1.amazonaws.com/prelo/images/resized/base/products/590f53dadfd84704c677c46c/kemeja-batik-pria-yang-bermotif-4c39de3223b5-PySBnc-1.jpg',
         price: 100000,
         stock: 10,
         category: "Kemeja",
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Products', null, {})
  }
};
