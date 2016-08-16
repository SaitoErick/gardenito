angular.module('app.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('PlantsCtrl', function($scope, api, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.plants = Plants.all();
  // $scope.remove = function() {
  //   Plants.remove(plant);
  // };

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
})

.controller('PlantsAddCtrl', function($scope, api, $http) {
  $scope.load = function () {
    
  };

  $scope.plants = [];
  $scope.load();
})

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
