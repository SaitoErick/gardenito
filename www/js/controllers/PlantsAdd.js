'use strict';
angular.module('app.controllers')

    .controller('AddCtrl', function ($scope, PlantaService, $ionicLoading, $state, $stateParams, $ionicPopup, $filter) {

        $scope.$on('$ionicView.enter', function (e) {
            $scope.plant = { "ativa": true, "dataCadastro": new Date() };

            console.log("Plant ID: ");
            console.log($stateParams.plantId);

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

        $scope.validarDados = function (plant) {
            if (typeof (plant.nome) == "undefined") {
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'O campo nome não foi preenchido.'
                });
                return false;
            }

            return true;

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
        }

        $scope.gravar = function (plant) {
            //Recupera os dados do formulário digitado
            var planta = {};
            console.log(plant);

            if ($scope.validarDados(plant)) {
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
                        "ativa": plant.ativa
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
                        "ativa": plant.ativa
                    };
                }

                console.log("Dados do formulário: ");
                console.log(planta);

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

        };

    });