angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'HomeCtrl'
      }
    }
  })

  // .state('home', {
  //   url: '/home',
  //   views: {
  //     'tab-home': {
  //       templateUrl: 'templates/home.html',
  //       controller: 'HomeCtrl'
  //     }
  //   }
  // })

  .state('tab.plants', {
      url: '/plants',
      params: {reload: null},
      views: {
        'tab-plants': {
          templateUrl: 'templates/tab-plants.html',
          controller: 'PlantsCtrl'
        }
      }
    })
    .state('tab.plants-detail', {
      url: '/plants/:plantId',
      params: {plantId: null},
      views: {
        'tab-plants': {
          templateUrl: 'templates/plants-detail.html',
          controller: 'PlantsDetailCtrl'
        }
      }
    })

  .state('tab.add', {
    url: '/add',
    params: {plantId: null},
    views: {
      'tab-add': {
        templateUrl: 'templates/plants-add.html',
        controller: 'AddCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/plants');
});
