(function () {
  'use strict';

  angular.module('main')
  .component('tabContent', {
    template: "<div ng-include=$ctrl.templatePath></div>",
    bindings: {
      templatePath: "@"
    }
  });

})();
