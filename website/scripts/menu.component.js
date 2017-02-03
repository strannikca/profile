(function () {
  'use strict';

  angular.module('main')
  .component('navigation', {
    templateUrl: 'templates/navigation.html',
    controller: 'NavigationController',
    controllerAs: 'navCtrl',
    bindings: {
      position: '@'
    }
  });

})();
