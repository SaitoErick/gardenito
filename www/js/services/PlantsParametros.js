(function() {
  'use strict';

   angular
    .module('app.services')
    .factory('PlantaParametrosService', function ($http, GardenitoConfig, RetornoServicos) {

    //Retorna a URL padrão dos serviços do Google App Engine
    var urlBase = GardenitoConfig.urlServicos();

    return {

      //Funçao que retorna todos os parametros de todas as Plantas
      all: function (parametros, callback) {
        var retorno = RetornoServicos.retorno();

        $http.get(urlBase + 'plantaparametros/v1/list', parametros)
          .success(function (response) {
            retorno.success = true;
            retorno.items = response.items;

            if (typeof (callback) === "function") {
              callback(retorno);
            }
          })
          .error(function (data, status) {
            retorno.success = false;
            retorno.erro = {
              codigo: status,
              mensagem: data
            };

            if (typeof (callback) === "function") {
              callback(retorno);
            }
          });
      },

      //Função para inserir ou atualizar os parametros de uma Planta
      addOrUpdate: function (item, callback) {
        var retorno = RetornoServicos.retorno();

        if (item.id != null) {
          $http.put(urlBase + 'plantaparametros/v1/update', item)
            .success(function (response) {
              retorno.success = true;
              retorno.items = response;

              if (typeof (callback) === "function") {
                callback(retorno);
              }
            })
            .error(function (data, status) {
              retorno.success = false;
              retorno.erro = {
                codigo: status,
                mensagem: data
              };

              if (typeof (callback) === "function") {
                callback(retorno);
              }
            });
        } else {
          $http.post(urlBase + 'plantaparametros/v1/new', item)
            .success(function (response) {
              retorno.success = true;
              retorno.items = response;

              if (typeof (callback) === "function") {
                callback(retorno);
              }
            })
            .error(function (data, status) {
              retorno.success = false;
              retorno.erro = {
                codigo: status,
                mensagem: data
              };

              if (typeof (callback) === "function") {
                callback(retorno);
              }
            });
        }
      },

      //Função para excluir os parametros de uma Planta
      remove: function (plantId, callback) {
        var retorno = RetornoServicos.retorno();

        $http.delete(urlBase + 'plantaparametros/v1/delete/' + plantId)
          .success(function (response) {
            retorno.success = true;
            if (typeof (callback) === "function") {
              callback(retorno);
            }
          })
          .error(function (data, status) {
            retorno.success = false;
            retorno.erro = {
              codigo: status,
              mensagem: data
            };

            if (typeof (callback) === "function") {
              callback(retorno);
            }
          });
      },

      // Função que retorna os parametros de uma Planta pelo seu ID
      get: function (plantId, callback) {
        var retorno = RetornoServicos.retorno();
        $http.get(urlBase + 'plantaparametros/v1/get/' + plantId)
          .success(function (response) {
            retorno.success = true;
            retorno.items = response;

            if (typeof (callback) === "function") {
              callback(retorno);
            }
          })
          .error(function (data, status) {
            retorno.success = false;
            retorno.erro = {
              codigo: status,
              mensagem: data
            };

            if (typeof (callback) === "function") {
              callback(retorno);
            }
          });
      }
    };
  })

})();
