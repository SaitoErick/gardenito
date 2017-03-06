(function() {
  'use strict';

  angular
    .module('app.controllers')
    .controller('PlantsDetailCtrl', function (
                      $scope,
                      PlantaService,
                      PlantaParametrosService,
                      $stateParams,
                      $ionicPopup,
                      $state) {

      $scope.setPlantStatus = function (plant) {
      var danger = false;
      var dados = plant.dados[0];
      var parametros = plant.parametros;

      if(parametros !== null) {
        if (dados.humidade_ar < parametros.humidade_ar_min || dados.humidade_ar > parametros.humidade_ar_max) {
          danger = true;
          dados.humidade_ar_status = "danger";
        }

        if (dados.humidade_solo < parametros.humidade_solo_min || dados.humidade_solo > parametros.humidade_solo_max) {
          danger = true;
          dados.humidade_solo_status = "danger";
        }

        if (dados.luminosidade < parametros.luminosidade_min || dados.luminosidade > parametros.luminosidade_max) {
          danger = true;
          dados.luminosidade_status = "danger";
        }

        if (dados.temperatura < parametros.temperatura_min || dados.temperatura > parametros.temperatura_max) {
          danger = true;
          dados.temperatura_status = "danger";
        }
      }

      if (danger) {
        plant.status = "danger";
        plant.status_message = "Socorrooooo! Preciso de ajuda!";
        plant.icon = "icon-triste";
      } else {
        plant.status = "cool";
        plant.status_message = "Yupi!!! Estou muito feliz e saudável!";
        plant.icon = "icon-feliz";
      }
    }

    PlantaService.get($stateParams.plantId, function (retorno) {
      if (retorno.success) {
        // console.log(retorno);
        $scope.plant = retorno.items;
        $scope.setPlantStatus($scope.plant);
        if(retorno.items.dados){
          $scope.dados = retorno.items.dados[0];
        }
      } else {
        // console.log(retorno.erro.mensagem.error.message);
        $ionicPopup.alert({
          title: 'Erro ao recuperar os dados',
          template: 'Desculpe, mas ocorreu um erro ao tentar recuperar a planta. Mensagem: ' + retorno.erro.mensagem.error.message
        });
      }
    });

    $scope.editPlant = function (plant) {
      $state.go('tab.add', {
        plantId: plant.id
      });
    }

    $scope.gravarParametros = function (parametros) {
      if ($scope.validarDados(parametros)) {
        if (parametros.id !== null) {
          parametros = {
            "id": parametros.id,
            "idPlanta": parametros.idPlanta,

          };
        } else {
          parametros = {
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
              $state.go('tab.plants', {
                reload: true
              });
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

})();
