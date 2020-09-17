'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        "name": "Downhill",
        "image_url": "https://sm.ign.com/t/ign_ap/review/t/the-elder-/the-elder-scrolls-v-skyrim-special-edition-review_8nw2.1200.jpg",
        "description": "The Dragonborn Comes...",
        "price": 250000,
        "stock": 15,
        "genre": "Adventure",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "UserId": 1,
      }, {
        "name": "Resident Evil 3",
        "image_url": "https://wallpapercave.com/wp/wp5187172.jpg",
        "description": "The Remake version of Resident Evil 3: Nemesis",
        "price": 250000,
        "stock": 22,
        "genre": "Horror",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "UserId": 1,
      }, {
        "name": "Cities Skylines",
        "image_url": "https://store-images.s-microsoft.com/image/apps.47288.14188059920471079.8845931d-936f-4c5b-848c-e9700ef87a6b.92da2b6e-01a3-4806-8575-6f6278ecd71b?mode=scale&q=90&h=1080&w=1920&format=jpg",
        "description": "The City Building Games",
        "price": 125000,
        "stock": 18,
        "genre": "Simulation",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "UserId": 1,
      }, {
        "name": "GTA V",
        "image_url": "https://www.blibli.com/friends/assets/GTA-V-big.jpg",
        "description": "The latest sequel of Grand Theft Auto",
        "price": 250000,
        "stock": 23,
        "genre": "RPG",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "UserId": 1,
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
