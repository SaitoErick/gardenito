angular.module('starter.controllers', [])

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
    api.get('a4:28:72:ca:55:13/last')
    .success (function(response){
        console.log (response);
        $scope.plantas = response.content;
      })
    .error (function(err) {
        console.log (err);
    });
  };

  $scope.plantas = [];
  $scope.load();
})

.controller('PlantsDetailCtrl', function($scope, $stateParams, Plants) {
  $scope.plant = Plants.get($stateParams.plantId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
