(function () {
  'use strict';

  angular.module('main')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['bullets'];
  function ProfileController(bullets) {
      var $ctrl = this;
      $ctrl.bullets = bullets;
  }

})();
