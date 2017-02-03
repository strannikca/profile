(function () {
  'use strict';

  angular.module('main')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['DataService', 'bullets'];
  function ProfileController(DataService, bullets) {
      var $ctrl = this;
      $ctrl.bullets = bullets;
  }

})();
