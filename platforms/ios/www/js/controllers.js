angular.module('app.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('PlantsCtrl', function($scope, api, $http, $ionicPopup, $stateParams, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

  // $scope.plants = Plants.all();

  console.log("Reload: ");
  console.log($stateParams.reload);

  $scope.edit = function(plant) {
    var alerta = $ionicPopup.alert({
      title: 'Mensagem',
      template: 'Agora vamos editar...'
    });

    alerta.then(function(res) {
      $state.go('tab.add', { plantId: plant.id });
    });
  };
  
  $scope.remove = function(plant) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Excluir',
      template: 'Tem certeza que deseja excluir a planta ' + plant.nome + '?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        api.delete('planta/v1/delete/' + plant.id)
        .success (function(response){
            console.log (response);
            $scope.load();
          })
        .error (function(err) {
            console.log (err);
        });
      }
    });     
  };

  $scope.load = function () {
    api.get('planta/v1/list')
    .success (function(response){
        console.log (response);
        $scope.plants = response.items;
      })
    .error (function(err) {
        console.log (err);
    });
  };

  $scope.plants = [];
  $scope.load();

  $scope.$on('$ionicView.enter', function(e) {
    if($stateParams.reload) {
      $stateParams.reload = false;
      $scope.plants = [];
      $scope.load();
    }
  });
})

// .controller('PlantsAddCtrl', function($scope, api, $http) {
//   $scope.load = function () {
    
//   };

//   $scope.plants = [];
//   $scope.load();
// })

.controller('PlantsDetailCtrl', function($scope, $stateParams, api) {
  api.get('planta/v1/get/' + $stateParams.plantId)
    .success (function(response){
        console.log (response);
        $scope.plant = response;
      })
    .error (function(err) {
        console.log (err);
    });
})

.controller('AddCtrl', function($scope, $ionicLoading, $state, $stateParams, api, $ionicPopup, $filter) {
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.plant = { "ativa": true };

    console.log("Plant ID: ");
    console.log($stateParams.plantId);

    if($stateParams.plantId !== null) {
      //Carrega os dados e preenche os campos
      api.get('planta/v1/get/' + $stateParams.plantId)
      .success (function(response){
          console.log (response);
          $scope.plant = response;
        })
      .error (function(err) {
          console.log (err);
      });
    } else {
      $scope.plant = { "ativa": true };
    }

    $scope.$watch('plant.dataCadastro', function (newValue) {
      $scope.plant.dataCadastro = $filter('date')(newValue, 'dd/MM/yyyy HH:mm:ss'); 
    });
  });
  
  $scope.tirarFoto = function() {
    console.log("Entrou camera");
    navigator.camera.getPicture(function(imagedata) { 
      
      if(typeof(imagedata) !== "undefined" && imagedata !== "") {
        window.plugins.imageResizer.resizeImage(
                function(data) { 
                  
                  $('#img-camera').attr("src", "data:image/jpeg;base64," + data.imageData);
                  $scope.plant.foto.value = data.imageData;

                }, function (error) {
                    $ionicPopup.alert({
                      title: 'Oops',
                      template: 'Erro ao redimensionar imagem : \r\n' + error
                    });

                    $('#img-camera').attr("src", "");
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
      $ionicPopup.alert({
        title: 'Oops',
        template: 'Ocorreu um erro ao tentar tirar a foto!'
      });

      $('#img-camera').attr("src", "");
      $("#btn-gravar").addClass("disabled");
      $scope.plant.foto.value = "";
      $("#image-path").val("");
    }, 
    { 
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1600,
        targetHeight: 1200,
        cameraDirection: Camera.Direction.BACK
    });
  };

  $scope.gravar = function(plant) {
    //Recupera os dados do formulário digitado
    var planta = {};

    if(plant.id != null) {
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

    if(plant.id != null) {
      api.put('planta/v1/update', planta)
      .success (function(response){
          console.log (response);
          var alerta = $ionicPopup.alert({
            title: 'Maravilha',
            template: 'Tudo certo! Dados atualizados!'
          });

          alerta.then(function(res) {
            $stateParams.plantId = null;
            $state.go('tab.plants', { reload: true });
          });
        })
      .error (function(err) {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Macacos me mordam! Algo saiu errado!'
        });
        console.log (err);
      });
    } else {
      api.post('planta/v1/new', planta)
      .success (function(response) {
          console.log (response);
          var alerta = $ionicPopup.alert({
            title: 'Maravilha',
            template: 'Tudo certo! Cadastro realizado!'
          });

          alerta.then(function(res) {
            $stateParams.plantId = null;
            $state.go('tab.plants', { reload: true });
          });
        })
      .error (function(err) {
        $ionicPopup.alert({
          title: 'Oops',
          template: 'Macacos me mordam! Algo saiu errado!'
        });
        console.log (err);
      });
    }

  };

});
