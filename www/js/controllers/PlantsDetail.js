'use strict';
angular.module('app.controllers')

  .controller('PlantsDetailCtrl', function ($scope, PlantaService, $stateParams, $ionicPopup) {

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

    $scope.validarDados = function (parametros) {
      if (typeof (parametros.humidade_ar_min) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Humidade do ar mínimo não informada.'
        });
        return false;
      }

      if (typeof (parametros.humidade_ar_max) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Humidade do ar máximo não informada.'
        });
        return false;
      }

      if (parseInt(parametros.humidade_ar_min) >= parseInt(parametros.humidade_ar_max)) {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Humidade do ar mínimo não pode ser maior ou igual a humidade do ar máximo.'
        });
        return false;
      }

      if (typeof (parametros.humidade_solo_min) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Humidade do solo mínimo não informada.'
        });
        return false;
      }

      if (typeof (parametros.humidade_solo_max) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Humidade do solo máximo não informada.'
        });
        return false;
      }

      if (parseInt(parametros.humidade_solo_min) >= parseInt(parametros.humidade_solo_max)) {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Humidade do solo mínimo não pode ser maior ou igual a humidade do solo máximo.'
        });
        return false;
      }

      if (typeof (parametros.luminosidade_min) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Luminosidade mínima não informada.'
        });
        return false;
      }

      if (typeof (parametros.luminosidade_max) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Luminosidade máxima não informada.'
        });
        return false;
      }

      if (parseInt(parametros.luminosidade_min) >= parseInt(parametros.luminosidade_max)) {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Luminosidade mínima não pode ser maior ou igual a luminosidade máxima.'
        });
        return false;
      }

      if (typeof (parametros.temperatura_min) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Temperatura mínima não informada.'
        });
        return false;
      }

      if (typeof (parametros.temperatura_max) == "undefined") {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Temperatura máxima não informada.'
        });
        return false;
      }

      if (parseInt(parametros.temperatura_min) >= parseInt(parametros.temperatura_max)) {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Temperatura mínima não pode ser maior ou igual a temperatura máxima.'
        });
        return false;
      }

      return true;
    }

    $scope.gravarParametros = function (parametros) {
      console.log(parametros);
      if ($scope.validarDados(parametros)) {

      };

    };

  });