(function () {
  'use strict';

  // Component for zoomable images
  angular.module('main')
  .component('zoomImage', {
    template: '<img ng-src="{{$ctrl.path}}" class="thumb" ng-class="{zoom: $ctrl.zoomed}" ng-click="$ctrl.zoom();" alt="Manual counter rating image">',
    bindings: {
      path: '@'
    },
    controller: function () {
        var ctrl = this;

        ctrl.zoomed = false;
        ctrl.zoom = function () {
          ctrl.zoomed = !ctrl.zoomed;
        }
    }
  });

})();
