angular.module('app.services')

  .factory('PlantaService', function ($http, GardenitoConfig, RetornoServicos) {
    //Retorna a URL padrão dos serviços do Google App Engine
    var urlBase = GardenitoConfig.urlServicos();

    return {
      //Funçao que retorna a lista de todas as plantas
      all: function (parametros, callback) {
        var retorno = RetornoServicos.retorno();

        $http.get(urlBase + 'planta/v1/list', parametros)
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
      //Função para inserir ou atualizar uma planta
      addOrUpdate: function (item, callback) {
        var retorno = RetornoServicos.retorno();

        if (item.id != null) {
          $http.put(urlBase + 'planta/v1/update', item)
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
          $http.post(urlBase + 'planta/v1/new', item)
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
      //Função para excluir uma panta
      remove: function (plantId, callback) {
        var retorno = RetornoServicos.retorno();

        $http.delete(urlBase + 'planta/v1/delete/' + plantId)
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
      get: function (plantId, callback) {
        var retorno = RetornoServicos.retorno();

        $http.get(urlBase + 'planta/v1/get/' + plantId)
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
  });
