(function () {
  'use strict';

  angular.module('main')
  .controller('LoaderController', LoaderController);

  LoaderController.$inject = ['$rootScope'];
  function LoaderController($rootScope) {
    var $ctrl = this;
    $ctrl.on = false;

    var initListener = $rootScope.$on('$viewContentLoading', startFunc);

    var initListenerS = $rootScope.$on('$viewContentLoaded', function () {
      $ctrl.on = false;
      initListener();
      initListenerS();
    });

    var startListener = $rootScope.$on('$stateChangeStart', startFunc);

    var stopListenerS = $rootScope.$on('$stateChangeSuccess', stopFunc);
    var stopListenerE = $rootScope.$on('$stateChangeError', stopFunc);

    function startFunc() {
      $ctrl.on = true;
    }

    function stopFunc() {
      $ctrl.on = false;
    }

    $ctrl.onDestroy = function () {
      stopListenerE();
      stopListenerS();
      startListener();
    }
  }
})();
