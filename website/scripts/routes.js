(function () {
  'use strict';

  angular.module('main')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Abstract state fro all pages
    $stateProvider
    .state('base', {
      abstract: true,
      templateUrl: 'templates/base.html',
      resolve: {
        menu: ['MenuService', function (MenuService) {
          return MenuService.loadMenu();
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
          return DataService.getData('profile', 'data')
          .then(function (result) {
            return result.data.bullets;
          }, function () {
            return ["Connection error"];
          });
        }]
      }
    })

    //abstract substate for all pages, except profile
    .state('base.tabs', {
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'TabsController',
      controllerAs: 'tabsCtrl',
      resolve: {
        contentLinks: ['DataService', function (DataService) {
          return DataService.getData('content', 'data')
          .then(function (result) {
            return result.data;
          }, function (reject) {});
        }]
      }
    })

    .state('base.tabs.web', {
      url: '/web'
    })

    .state('base.tabs.general', {
      url: '/general'
    });
  }
})();
