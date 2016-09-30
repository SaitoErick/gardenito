angular.module('app.config', [])
//Arquivo de configurações padrões do Projeto
.factory('GardenitoConfig', function($http) {

  return {
    urlServicos: function() {
      return "https://cit-gardenito.appspot.com/_ah/api/";
    }
  };
});