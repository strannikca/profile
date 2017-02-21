(function () {
  'use strict'

  angular.module('main')
  .service('MenuService', MenuService);

  MenuService.$inject = ['DataService', '$rootScope'];
  function MenuService(DataService, $rootScope) {
    var service = this;

    // service.test = null;
    service.menu = [];

    service.loadMenu = function () {

      return DataService.getData('menu', 'data')
      .then(function (res) {
          var data = res.data;
          var length = data.name.length;
          service.menu = new Array(length);
          for(var i = 0; i < length; i++) {
            service.menu[i] = {
              name: data.name[i],
              url: data.url[i],
              route: data.routing[i],
              isEnabled: data.isEnabled[i],
              isHidden: data.isHidden[i]
            }
          }
          return service.menu;
      }, function () {
        return service.menu;
      });
    }

  }
})();
