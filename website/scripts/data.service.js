(function () {
  'use strict';

  angular.module('main')
  .service('DataService', DataService);

  DataService.$inject = ['$http', '$q'];
  function DataService($http, $q) {
    var service = this;

    service.getData = function (name) {
      if(name) {
        return $http({
          method: 'GET',
          url: ('/data/' + name + '.json')
        })
        .then(function (success) {
          return success;
        }, function (error) {
          console.log(error);
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
  }

})();
