(function () {
  'use strict'

  angular.module('main')
  .service('MenuService', MenuService);

  MenuService.$inject = ['DataService', '$rootScope'];
  function MenuService(DataService, $rootScope) {
    var service = this;

    // service.test = null;
    service.menu = DataService.getData("menu")
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
    }, function () {
      console.log("err");
    });

    service.getMenu = function () {
      return service.menu;
    }

    // service.test = [];
    // service.test.push({'service': $rootScope.$on('$stateChangeSuccess', function () {
    //   console.log(service.test);
    //   console.log($rootScope);
    // })});
  }
})();
