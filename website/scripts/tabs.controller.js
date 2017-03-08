(function () {
  'use strict';

  angular.module('main')
  .controller('TabsController', TabsController);

  TabsController.$inject = ['DataService', 'contentLinks', '$state', '$rootScope', '$sanitize'];
  function TabsController(DataService, contentLinks, $state, $rootScope, $sanitize) {
    var ctrl = this;
    ctrl.imgLink;
    ctrl.text;

    ctrl.contentLinks = contentLinks;
    ctrl.templateLink;
    stateChange();

    $rootScope.$on('$stateChangeSuccess', function () {
      stateChange();
    });

    function stateChange() {
      if($state.current.name.substring(0,9) === 'base.tabs' && ctrl.contentLinks) {
        ctrl.imgLink = ctrl.contentLinks[$state.current.name].img;
        ctrl.templateLink = "/templates/" + ctrl.contentLinks[$state.current.name].text + '.html';
      }
    }

  }
})();
