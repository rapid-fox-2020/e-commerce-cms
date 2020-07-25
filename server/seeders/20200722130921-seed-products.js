'use strict';

const products = [
  {
    name: 'Dompet',
    image_url: 'https://s1.bukalapak.com/img/12465308132/s-246-246/data.jpeg',
    price: 20000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lampu',
    image_url: 'https://s0.bukalapak.com/img/0951210551/s-330-330/Captain_Stag_LED_Candle_Lantern_Mono.jpg',
    price: 250000,
    stock: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Dompet',
    image_url: 'https://s1.bukalapak.com/img/12465308132/s-246-246/data.jpeg',
    price: 20000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lampu',
    image_url: 'https://s0.bukalapak.com/img/0951210551/s-330-330/Captain_Stag_LED_Candle_Lantern_Mono.jpg',
    price: 250000,
    stock: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Dompet',
    image_url: 'https://s1.bukalapak.com/img/12465308132/s-246-246/data.jpeg',
    price: 20000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lampu',
    image_url: 'https://s0.bukalapak.com/img/0951210551/s-330-330/Captain_Stag_LED_Candle_Lantern_Mono.jpg',
    price: 250000,
    stock: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', products);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null);
  }
};
