'use strict';
angular.module('app.controllers')

    .controller('AddCtrl', function ($scope, PlantaService, PlantaParametrosService, $ionicLoading, $state, $stateParams, $ionicPopup, $filter) {

        $scope.$on('$ionicView.enter', function (e) {
            $scope.plant = { "ativa": true, "dataCadastro": new Date() };

            console.log("Plant ID: " + $stateParams.plantId);

            if ($stateParams.plantId != null) {
                //Carrega os dados e preenche os campos
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

        $scope.tirarFoto = function () {
            console.log("Entrou camera");
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

        $scope.validarDados = function (plant, parametros) {

            if (plant.id != null) {
              parametros = plant.dados[0];
            }

            if (typeof (plant.nome) == "undefined"||
                (plant.nome) == "") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo nome não foi preenchido.'
                });
                return false;
            }
            if (typeof (plant.descricao) == "undefined"||
                (plant.descricao) == "") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo descrição não foi preenchido.'
                });
                return false;
            }
            if (typeof (plant.localizacao) == "undefined"||
                (plant.localizacao) == "") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo localização não foi preenchido.'
                });
                return false;
            }

            // if(typeof (plant.nome) == "undefined" ||
            //   typeof (plant.descricao) == "undefined" ||
            //   typeof (plant.localizacao) == "undefined" ||
            //   typeof (plant.dataCadastro) == "undefined" ||
            //   typeof (plant.foto) == "undefined"){
            //     var alerta = $ionicPopup.alert({
            //       title: 'Oops',
            //       template: 'Macacos me mordam! Algo saiu errado!'
            //     });
            //   }

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

        $scope.gravar = function (plant) {
            //Recupera os dados do formulário digitado
            var planta = {};
            console.log("Gravar dados no Banco");
            console.log(plant);

            if ($scope.validarDados(plant)) {
                console.log("aqui1");
                if (plant.id != null) {
                    planta = {
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
                    planta = {
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

                console.log("Dados do formulário: ");
                console.log(plant.dados);

                PlantaService.addOrUpdate(planta, function (retorno) {
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
            }

            if ($scope.validarDados(plant, plant.parametros)) {
                console.log("aqui2");
                if (plant.parametros.id != null) {
                    plant.parametros = {
                      "id": parametros.id,
                      "idPlanta": plant.parametros.idPlanta,
                      "humidade_ar_max": plant.parametros.humidade_ar_max,
                      "humidade_ar_min": plant.parametros.humidade_ar_min,
                      "humidade_solo_max": parametros.humidade_solo_max,
                      "humidade_solo_min": parametros.humidade_solo_min,
                      "luminosidade_max": parametros.luminosidade_max,
                      "luminosidade_min": parametros.luminosidade_min,
                      "temperatura_max": parametros.temperatura_max,
                      "temperatura_min": parametros.temperatura_min
                    };
                } else {
                    plant.parametros= {
                      "idPlanta": plant.parametros.idPlanta,
                      "humidade_ar_max": plant.parametros.humidade_ar_max,
                      "humidade_ar_min": plant.parametros.humidade_ar_min,
                      "humidade_solo_max": parametros.humidade_solo_max,
                      "humidade_solo_min": parametros.humidade_solo_min,
                      "luminosidade_max": parametros.luminosidade_max,
                      "luminosidade_min": parametros.luminosidade_min,
                      "temperatura_max": parametros.temperatura_max,
                      "temperatura_min": parametros.temperatura_min
                    };
                }

                console.log("Dados do formulário: ");
                console.log(parametros);

                // PlantaParametrosService.addOrUpdate(parametros, function (retorno) {
                //     if (retorno.success) {
                //         var alerta = $ionicPopup.alert({
                //             title: 'Sucesso',
                //             template: 'Tudo certo! Dados gravados com sucesso!'
                //         });

                //         alerta.then(function (res) {
                //             $stateParams.plantId = null;
                //             $state.go('tab.plants', { reload: true });
                //         });
                //     } else {
                //         $ionicPopup.alert({
                //             title: 'Erro ao gravar os dados',
                //             template: 'Desculpe, mas ocorreu um erro ao tentar gravar os dados da planta. Mensagem: ' + retorno.erro.mensagem
                //         });
                //     }
                // });

            };
        };
    });
