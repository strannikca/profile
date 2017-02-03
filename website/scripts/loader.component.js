(function () {
  'use strict';

  angular.module('main')
  .component('loading', {
    template: '<img src="/images/loading.svg" alt="loader" class="loader" ng-if="loadCtrl.on">',
    controller: "LoaderController",
    controllerAs: "loadCtrl"
  });

})();
