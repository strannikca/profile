(function () {
  'use strict';

  angular.module('main')
  .service('DataService', DataService);

  DataService.$inject = ['DataPath', '$http', '$q'];
  function DataService(DataPath, $http, $q) {
    var service = this;

    service.getData = function (name) {
      if(name) {
        return $http({
          method: 'GET',
          url: (DataPath + name + ".json")
        })
        .then(function (success) {
          return success;
        }, function (error) {
          return $q.reject(
          {
            "status": "error",
            "type": "server error"
          });
        });
      }
      else {
          return $q.reject({
            "status": "error",
            "type": "Name was not provided"
          });
      }
    }
  }

})();
