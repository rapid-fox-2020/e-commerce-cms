'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Products', [{
                name: 'Eskrim',
                image_url: 'https://assets-pergikuliner.com/ZZJSlYWsbHFOgagLDtffZaAz4B8=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/bootsy/image/11101/es_krim_bucket.JPG',
                price: 5000000,
                stock: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Bebek',
                image_url: 'https://assets-pergikuliner.com/3MyAISsO3OyeYxa-lXZRA8g6fsE=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1204655/picture-1545970163.JPEG',
                price: 200000000,
                stock: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Products', null, {});
    }
};