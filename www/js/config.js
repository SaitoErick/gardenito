/**
 * Arquivo de configurações padrões do Projeto
 */

angular.module('app.config', [])
  .factory('GardenitoConfig', function($http) {

    return {
      urlServicos: function() {
        return "https://cit-gardenito.appspot.com/_ah/api/";
      }
    };
  });
