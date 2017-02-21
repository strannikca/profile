(function () {
  'use strict';

  angular.module('main')
  .service('DataService', DataService);

  DataService.$inject = ['BasePath', '$http', '$q'];
  function DataService(BasePath, $http, $q) {
    var service = this;

    service.getData = function (name, type) {
      var resolvedType = resolveType(type);
      if(name && resolvedType) {
        return $http({
          method: 'GET',
          url: (resolvedType.dir + name + resolvedType.ext)
        })
        .then(function (success) {
          return success;
        }, function (error) {
          return $q.reject(
          {
            "status": "error",
            "type": "Server error"
          });
        });
      }
      else {
          return $q.reject({
            "status": "error",
            "type": "Invalid input"
          });
      }
    }

    function resolveType(type) {
      switch(type) {
        case 'data': return {
          dir: BasePath + "data/",
          ext: ".json"
        }

        case 'template': return {
          dir: "/templates/",
          ext: ".html"
        }

        default: return false;
      }
    }
  }

})();
