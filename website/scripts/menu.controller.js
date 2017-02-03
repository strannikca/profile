(function () {
  'use strict';

  angular.module('main')
  .controller('NavigationController', NavigationController);

  NavigationController.$inject = ['$state', 'MenuService', '$rootScope']
  function NavigationController($state, MenuService, $rootScope) {
    var $ctrl = this;

    $ctrl.active = $state.current.name;
    $ctrl.items = MenuService.menu;

    $rootScope.$on('$stateChangeSuccess',
      function () {
        $ctrl.active = $state.current.name;
      });

  }
})();
