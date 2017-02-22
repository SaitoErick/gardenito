'use strict';
angular.module('app.controllers')

  .controller('PlantsDetailCtrl', function ($scope, PlantaService, PlantaParametrosService, $stateParams, $ionicPopup) {

    PlantaService.get($stateParams.plantId, function (retorno) {
      if (retorno.success) {
        // console.log(retorno.items.dados);
        $scope.dados = retorno.items.dados[0];
        $scope.plant = retorno.items;
      } else {
        $ionicPopup.alert({
          title: 'Erro ao recuperar os dados',
          template: 'Desculpe, mas ocorreu um erro ao tentar recuperar a planta. Mensagem: ' + retorno.erro.mensagem
        });
      }
    });

    $scope.gravarParametros = function (parametros) {
      console.log(parametros);
      if ($scope.validarDados(parametros)) {
        if (parametros.id != null) {
            parametros = {
                "id": parametros.id,
                "idPlanta": parametros.idPlanta,

            };
        } else {
            parametros= {
              "idPlanta": parametros.idPlanta,
            };
        }

        console.log("Dados do formulário: ");
        console.log(parametros);

        PlantaParametrosService.addOrUpdate(parametros, function (retorno) {
            if (retorno.success) {
                var alerta = $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'Tudo certo! Dados gravados com sucesso!'
                });

                alerta.then(function (res) {
                    $stateParams.plantId = null;
                    $state.go('tab.plants', { reload: true });
                });
            } else {
                $ionicPopup.alert({
                    title: 'Erro ao gravar os dados',
                    template: 'Desculpe, mas ocorreu um erro ao tentar gravar os dados da planta. Mensagem: ' + retorno.erro.mensagem
                });
            }
        });

      };
    };
  });