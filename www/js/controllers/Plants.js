(function() {
  'use strict';

  angular
    .module('app.controllers')
    .controller('PlantsCtrl', function (
                         $scope,
                         PlantaService,
                         $ionicPopup,
                         $stateParams,
                         $state) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //

    // $scope.plants = Plants.all();

    console.log("Reload: ");
    console.log($stateParams.reload);

    $scope.edit = function (plant) {
      // var alerta = $ionicPopup.alert({
      //   title: 'Mensagem',
      //   template: 'Agora vamos editar...'
      // });
      // alerta.then(function(res) {
      // });
      $state.go('tab.add', { plantId: plant.id });
    };

    $scope.remove = function (plant) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir',
        template: 'Tem certeza que deseja excluir a planta ' + plant.nome + '?'
      });

      confirmPopup.then(function (res) {
        if (res) {

          PlantaService.remove(plant.id, function (retorno) {
            if (retorno.success) {
              console.log(retorno);
              $scope.load();
            } else {
              $ionicPopup.alert({
                title: 'Erro ao excluir',
                template: 'Desculpe, mas ocorreu um erro ao tentar excluir a planta. Mensagem: ' + retorno.erro.mensagem
              });
            }
          });
        }
      });
    };

    $scope.load = function () {

      PlantaService.all(null, function (retorno) {
        if (retorno.success) {
          $scope.plants = retorno.items;
        } else {
          $ionicPopup.alert({
            title: 'Erro ao listar as plantas',
            template: 'Desculpe, mas ocorreu um erro ao tentar listar as plantas. Mensagem: ' + retorno.erro.mensagem
          });
        }
      });

    };

    $scope.plants = [];
    $scope.load();

    $scope.$on('$ionicView.enter', function (e) {
      if ($stateParams.reload) {
        $stateParams.reload = false;
        $scope.plants = [];
        $scope.load();
      }
    });
  });

})();
