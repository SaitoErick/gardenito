'use strict';

angular.module('app')

.service('api', function($http) {
    var url_servico = 'http://api.iot.ciandt.com/v2/data/';
    var api={};

    api.get = function(route,params) {
        route=url_servico + route;
        return $http.get(route,params);
    };

    api.post = function(route,params) {
        route=url_servico + route;
        return $http.post(route,params);
    };

    return api;

});
