describe("Loader controller test", function() {

  var $controller;
  var $rootScope;
  var mockLoaderCtrl;

  beforeEach(module('main'));


  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    mockLoaderCtrl = $controller('LoaderController', {$rootScope: $rootScope});
  }));

  it("Initial value", function() {
    expect(mockLoaderCtrl.on).toBe(false);
  });

  it("Reaction on init loading event", function () {
    $rootScope.$broadcast('$viewContentLoading');
    expect(mockLoaderCtrl.on).toBe(true);
  });

  it("Reaction on init loading END event", function () {
    $rootScope.$broadcast('$viewContentLoaded');
    expect(mockLoaderCtrl.on).toBe(false);
  });

  it("Reaction on starting view change", function () {
    $rootScope.$broadcast('$stateChangeStart');
    expect(mockLoaderCtrl.on).toBe(true);
  });

  it("Reaction on ending view change", function () {
    $rootScope.$broadcast('$stateChangeSuccess');
    expect(mockLoaderCtrl.on).toBe(false);
  });

  it("Reaction on error view change", function () {
    $rootScope.$broadcast('$$stateChangeError');
    expect(mockLoaderCtrl.on).toBe(false);
  });

});


describe("Navigation controller test", function () {

  var $controller;
  var $rootScope;
  var $state;
  var mockNavCtrl;
  var mockMenuService;

  beforeEach(function () {
    module('main');
    module(function ($provide) {
      $provide.service('mockMenuService', function () {
        var service = this;
        service.menu = [
          {
            name: 'active',
            url: 'url1',
            route: 'route.active',
            isEnabled: true,
            isHidden: false
          },
          {
            name: 'hidden',
            url: 'url2',
            route: 'route.hidden',
            isEnabled: true,
            isHidden: true
          },
          {
            name: 'disabled',
            url: 'url3',
            route: 'route.disabled',
            isEnabled: false,
            isHidden: false
          }
        ]
      });
    });
  });

  beforeEach(inject(function (_$controller_, _$rootScope_, mockMenuService) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = { current: {name: "route.active"}};


    mockNavCtrl = $controller('NavigationController', {$state: $state, $rootScope: $rootScope, MenuService: mockMenuService});
  }));

  it("Initial values", function () {
    expect(mockNavCtrl.items[0].url).toBe("url1");
  });

  it("Change state event", function () {
    $rootScope.$broadcast('$stateChangeSuccess');
    expect(mockNavCtrl.active).toBe("route.active");
  });

  it("Second change state event", function () {
    $state.current.name = "route.disabled";
    $rootScope.$broadcast('$stateChangeSuccess');
    expect(mockNavCtrl.active).toBe("route.disabled");
  });
});

//----------------

describe("Tabs controller tests", function () {

  var $state;
  var deferred;
  var $rootScope;
  var $sanitize;
  var tabsCtrl;
  var mockDataService;

  beforeEach(function () {
    module('main');
    module(function ($provide) {
      $provide.service('mockDataService', function ($q, $rootScope) {
        var service = this;
        deferred = $q.defer();

        service.getData = function (name) {
          return deferred.promise;
        }

      });
    });

    inject(function (_$state_, _$rootScope_, _$sanitize_, $controller, mockDataService) {
      $state = { current: {name: "base.tabs.active"}};
      $rootScope = _$rootScope_;
      $sanitize = _$sanitize_;
      var mockContentLinks = {
        "base.tabs.active": {
          img: "image",
          text: "test"
        }
      }
      tabsCtrl = $controller('TabsController', {DataService: mockDataService, contentLinks: mockContentLinks, $state: $state, $rootScope: $rootScope, $sanitize: $sanitize});
    });
  });

  it("Initialization (content links)", function () {
    expect(tabsCtrl.contentLinks['base.tabs.active'].text).toEqual("test");
  });
});
