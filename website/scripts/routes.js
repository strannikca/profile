(function () {
  'use strict';

  angular.module('main')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routeConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('base', {
      abstract: true,
      templateUrl: 'templates/base.html',
      resolve: {
        menu: ['MenuService', function (MenuService) {
          return MenuService.getMenu();
        }]
      }
    })

    .state('base.profile', {
      url: '/',
      templateUrl: 'templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        bullets: ['DataService', function (DataService) {
          return DataService.getData('profile')
          .then(function (result) {
            return result.data.bullets;
          }, function () {
            return ["Connection error"];
          });
        }]
      }
    })

    .state('base.web', {
      url: '/web',
      templateUrl: 'templates/web.html'
    });
  }
})();
