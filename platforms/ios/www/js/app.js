// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var notificationOpenedCallback = function(jsonData) {
      console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal.init("af02f37e-7adb-48cb-b15f-c76cca4fb49c",
                                  {googleProjectNumber: "398377242088"},
                                  notificationOpenedCallback);
    
    // Show an alert box if a notification comes in when the user is in your app.
    window.plugins.OneSignal.enableInAppAlertNotification(true);
  });
})

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
        controller: 'DashCtrl'
      }
    }
  })

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
})
.directive("formatDate", function() {
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
});