'use strict';

angular.module('app')

.service('api', function($http) {
    var url_servico = 'https://cit-gardenito.appspot.com/_ah/api/';
    var api = {};

    api.get = function(route,params) {
        route=url_servico + route;
        return $http.get(route,params);
    };

    api.post = function(route,params) {
        route=url_servico + route;
        return $http.post(route,params);
    };

    api.delete = function(route,params) {
        route = url_servico + route;
        return $http.delete(route,params);
    }
    
    api.put = function(route,params) {
        route = url_servico + route;
       return $http.put(route,params);
    }

    return api;

});
