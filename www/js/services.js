angular.module('app.services', [])

.factory('Plants', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var plants = [{
    id: 0,
    name: 'Manjericão',
    description: "Minha plantinha querida",
    img: 'img/manjericc3a3o1.jpg',
    data: {
      temp: 25,
      humi: 45,
      lumi: 40
    }
  },
  {
    id: 1,
    name: 'Hortelã',
    description: "Minha plantinha favorita",
    img: 'img/hortela.jpg',
    data: {
      temp: 25,
      humi: 45,
      lumi: 40
    }
  }

  ];

  return {
    all: function() {
      return plants;
    },
    remove: function(plant) {
      plants.splice(plants.indexOf(plant), 1);
    },
    get: function(plantId) {
      for (var i = 0; i < plants.length; i++) {
        if (plants[i].id === parseInt(plantId)) {
          return plants[i];
        }
      }
      return null;
    }
  };
});
