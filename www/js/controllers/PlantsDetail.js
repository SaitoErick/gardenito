'use strict';
angular.module('app.controllers')

  .controller('PlantsDetailCtrl', function ($scope, PlantaService, $stateParams) {

    PlantaService.get($stateParams.plantId, function (retorno) {
      if (retorno.success) {
        $scope.plant = retorno.items;
      } else {
        $ionicPopup.alert({
          title: 'Erro ao recuperar os dados',
          template: 'Desculpe, mas ocorreu um erro ao tentar recuperar a planta. Mensagem: ' + retorno.erro.mensagem
        });
      }
    });

  });