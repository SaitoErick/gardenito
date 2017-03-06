(function() {
  'use strict';

  angular
    .module('app.controllers')
    .controller('AddCtrl', function (
                      $scope,
                      PlantaService,
                      PlantaParametrosService,
                      $ionicLoading,
                      $state,
                      $stateParams,
                      $ionicPopup,
                      $filter,
                      $q,
                      $cordovaDevice) {

        // var device = $cordovaDevice.device;
        // console.log(device);

        // var deviceInformation = ionic.Platform.device();
        // console.log(deviceInformation);

        // var currentPlatform = ionic.Platform.platform();
        // console.log(currentPlatform);

        $scope.$on('$ionicView.enter', function (e) {
        $scope.plant = { "ativa": true, "dataCadastro": new Date() };

        //Em caso de Edição, carrega os dados de uma planta pelo seu ID
        if ($stateParams.plantId !== null) {
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
          } else {
            $scope.plant = { "ativa": true, "dataCadastro": new Date() };
          }
        });

        // Função para Tirar Foto usando Plugins (somente em Mobile Devices)
        $scope.tirarFoto = function () {
          // console.log("Entrou camera");
          navigator.camera.getPicture(function (imagedata) {

            if (typeof (imagedata) !== "undefined" && imagedata !== "") {
                window.plugins.imageResizer.resizeImage(
                  function (data) {
                      $('#img-camera').attr("src", "data:image/jpeg;base64," + data.imageData);
                      $scope.plant.foto.value = "data:image/jpeg;base64," + data.imageData;
                      $("#btn-gravar").removeClass("disabled");

                  },
                  function (error) {
                      $ionicPopup.alert({
                          title: 'Oops',
                          template: 'Erro ao redimensionar imagem : \r\n' + error
                      });

                      $('#img-camera').prop("src", "");
                      $("#btn-gravar").addClass("disabled");
                      $scope.plant.foto.value = "";
                      $("#image-path").val("");

                  }, imagedata, 800, 0, {
                      resizeType: ImageResizer.RESIZE_TYPE_MAX_PIXEL,
                      imageDataType: ImageResizer.IMAGE_DATA_TYPE_URL,
                      format: ImageResizer.FORMAT_JPG,
                      quality: 70
                  }
              );
            }

          },
            function (message) {
                $('#img-camera').prop("src", "");
                $("#btn-gravar").addClass("disabled");
                $scope.plant.foto.value = "";
                $("#image-path").val("");
            },
            {
                quality: 90,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 1600,
                targetHeight: 1200,
                cameraDirection: Camera.Direction.BACK
            });
        };

        // Função que valida os dados do Formulário
        $scope.validarDados = function (plant, parametros) {

            if (typeof (plant.nome) == "undefined"||
                (plant.nome) === "") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo nome não foi preenchido.'
                });
                return false;
            }

            if (typeof (plant.descricao) == "undefined"||
                (plant.descricao) === "") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo descrição não foi preenchido.'
                });
                return false;
            }

            if (typeof (plant.localizacao) == "undefined"|| (plant.localizacao) === "") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo localização não foi preenchido.'
                });
                return false;
            }

            // if (typeof (plant.foto) == "undefined"|| (plant.foto) === "") {
            //     $ionicPopup.alert({
            //         title: 'Oops',
            //         template: 'É preciso tirar uma foto da sua plantinha'
            //     });
            //     return false;
            // }

            if(typeof (plant.nome) == "undefined" ||
              typeof (plant.descricao) == "undefined" ||
              typeof (plant.localizacao) == "undefined" ||
              typeof (plant.dataCadastro) == "undefined"
              // || typeof (plant.foto) == "undefined"
              ){
                $ionicPopup.alert({
                  title: 'Oops',
                  template: 'Macacos me mordam! Algo saiu errado!'
                });
                return false;
            }


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
        },

        // Função que salva no Banco dados Editados ou Inseridos pela Primeira Vez
        $scope.gravar = function (plant, parametros) {

            var planta = {};
            // console.log("Dados que vieram do formulario: Plant");
            // console.log(plant);
            // console.log("Dados que vieram do formulario: Parametros");
            // console.log(parametros);

            if(!plant.foto){
              plant.foto = {
                  "value" : 'img/default.jpg'
                };
            }

            insertPlant(plant, parametros);
        };

        function insertPlant(plant, parametros){
            if ($scope.validarDados(plant, parametros)) {
              // console.log('insertPlant');

                if (plant.id !== null) {
                    plant = {
                        "id": plant.id,
                        "nome": plant.nome,
                        "descricao": plant.descricao,
                        "localizacao": plant.localizacao,
                        "dataCadastro": plant.dataCadastro,
                        "foto": {
                            "value": plant.foto.value
                        },
                        "ativa": plant.ativa,
                        "sensor": plant.sensor
                    };
                } else {
                    plant = {
                        "nome": plant.nome,
                        "descricao": plant.descricao,
                        "localizacao": plant.localizacao,
                        "dataCadastro": plant.dataCadastro,
                        "foto": {
                            "value": plant.foto.value
                        },
                        "ativa": plant.ativa,
                        "sensor": plant.sensor
                    };
                }

                PlantaService.addOrUpdate(plant, function (retorno) {
                    if (retorno.success) {
                        // console.log(retorno);
                        plant.id = retorno.items.id;
                        var alerta = $ionicPopup.alert({
                            title: 'Sucesso',
                            template: 'Tudo certo! Dados gravados com sucesso!'
                        });

                        alerta.then(function (res) {
                            $stateParams.plantId = null;
                            $state.go('tab.plants', { reload: true });
                        });
                    } else {
                      console.log(retorno.erro.mensagem);
                        $ionicPopup.alert({
                            title: 'Erro ao gravar os dados',
                            template: 'Desculpe, mas ocorreu um erro ao tentar gravar os dados da planta. Mensagem: ' + retorno.erro.mensagem
                        });
                        return false;
                    }

                    insertParameters(plant, parametros);
                });
            }
        }

        function insertParameters(plant, parametros){

            if (parametros.id !== null) {
                parametros = {
                    "id": parametros.id,
                    "idPlanta": plant.id,
                    "humidade_ar_max": parametros.humidade_ar_max,
                    "humidade_ar_min": parametros.humidade_ar_min,
                    "humidade_solo_max": parametros.humidade_solo_max,
                    "humidade_solo_min": parametros.humidade_solo_min,
                    "luminosidade_max": parametros.luminosidade_max,
                    "luminosidade_min": parametros.luminosidade_min,
                    "temperatura_max": parametros.temperatura_max,
                    "temperatura_min": parametros.temperatura_min
                }
            } else {
                parametros = {
                    "idPlanta": plant.id,
                    "humidade_ar_max": parametros.humidade_ar_max,
                    "humidade_ar_min": parametros.humidade_ar_min,
                    "humidade_solo_max": parametros.humidade_solo_max,
                    "humidade_solo_min": parametros.humidade_solo_min,
                    "luminosidade_max": parametros.luminosidade_max,
                    "luminosidade_min": parametros.luminosidade_min,
                    "temperatura_max": parametros.temperatura_max,
                    "temperatura_min": parametros.temperatura_min
                }
            }

            PlantaParametrosService.addOrUpdate(parametros, function (retorno) {
                if (retorno.success) {
                    // console.log(retorno);
                    plant.parametros.id = retorno.items.id;
                    var alerta = $ionicPopup.alert({
                        title: 'Sucesso',
                        template: 'Tudo certo! Dados gravados com sucesso!'
                    });

                    alerta.then(function (res) {
                        $stateParams.plantId = null;
                        $state.go('tab.plants', { reload: true });
                    });
                } else {
                    console.log(retorno.erro.mensagem);
                    $ionicPopup.alert({
                        title: 'Erro ao gravar os dados',
                        template: 'Desculpe, mas ocorreu um erro ao tentar gravar os dados da planta. Mensagem: ' + retorno.erro.mensagem
                    });
                    return false;
                }

                insertPlantParameters(plant, parametros);
            });
        }

        function insertPlantParameters(plant, parametros) {
            if ($scope.validarDados(plant, parametros)) {
                // console.log('insertParameters');

                if (plant.parametros !== null) {
                    plant.parametros = {
                      "id": parametros.id,
                      "idPlanta": plant.id,
                      "humidade_ar_max": parametros.humidade_ar_max,
                      "humidade_ar_min": parametros.humidade_ar_min,
                      "humidade_solo_max": parametros.humidade_solo_max,
                      "humidade_solo_min": parametros.humidade_solo_min,
                      "luminosidade_max": parametros.luminosidade_max,
                      "luminosidade_min": parametros.luminosidade_min,
                      "temperatura_max": parametros.temperatura_max,
                      "temperatura_min": parametros.temperatura_min
                    };
                } else {
                    plant.parametros = {
                      "idPlanta": plant.id,
                      "humidade_ar_max": parametros.humidade_ar_max,
                      "humidade_ar_min": parametros.humidade_ar_min,
                      "humidade_solo_max": parametros.humidade_solo_max,
                      "humidade_solo_min": parametros.humidade_solo_min,
                      "luminosidade_max": parametros.luminosidade_max,
                      "luminosidade_min": parametros.luminosidade_min,
                      "temperatura_max": parametros.temperatura_max,
                      "temperatura_min": parametros.temperatura_min
                    };
                }

                 PlantaParametrosService.addOrUpdate(plant, function (retorno) {
                    if (retorno.success) {
                        // console.log(retorno);
                        var alerta = $ionicPopup.alert({
                            title: 'Sucesso',
                            template: 'Tudo certo! Dados gravados com sucesso!'
                        });

                        alerta.then(function (res) {
                            $stateParams.plantId = null;
                            $state.go('tab.plants', { reload: true });
                        });
                    } else {
                        console.log(retorno.erro.mensagem);
                        $ionicPopup.alert({
                            title: 'Erro ao gravar os dados',
                            template: 'Desculpe, mas ocorreu um erro ao tentar gravar os dados da planta. Mensagem: ' + retorno.erro.mensagem
                        });
                        return false;
                    }
                });
            }
        }
    });

})();
