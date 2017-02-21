describe("DataService test", function () {

  var DataService;
  var $$httpMock;
  var $rootScope;

  beforeEach(function () {

    module('main');

    inject(function ($injector) {
      DataService = $injector.get('DataService');
      $httpMock = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
    });

  });

  it("DataService successful get respond", function () {
    $httpMock.whenGET('http://alex.crystacode.com/data/test.json')
    .respond('Successful respond');

    DataService.getData('test', 'data')
    .then(function(response) {
      expect(response.data).toEqual('Successful respond');
    });

    $httpMock.flush();
  });

  it("DataService unsuccessful get respond", function () {
    $httpMock.whenGET('http://alex.crystacode.com/data/test.json')
    .respond(400);

    DataService.getData('test', 'data')
    .then(function(response) {}, function(fail) {
      expect(fail.type).toEqual('Server error');
    });

    $httpMock.flush();
  });

  it("DataService wrong argument", function () {

    DataService.getData('test')
    .then(function(response) {}, function(fail) {
      expect(fail.type).toEqual('Invalid input');
    });

    $rootScope.$digest();
  });

});


//-----------------------

describe("Menu service tests", function () {
  var MenuService;
  var $rootScope;
  var deferred;

  beforeEach(function () {

    module('main');

    module(function ($provide) {
      $provide.service('DataService', function ($q, $rootScope) {
        var service = this;
        deferred = $q.defer();

        service.getData = function (name) {
          return deferred.promise;
        }

      });
    });

    inject(function ($injector, _$rootScope_) {
        MenuService = $injector.get('MenuService');
        $rootScope = _$rootScope_;
    });
  });


  it("Successful menu load test", function () {
    MenuService.loadMenu();
    deferred.resolve({
      data: {
        "name": ["Profile", "General"],
        "isEnabled": [true, false],
        "isHidden": [false, true],
        "url": ["/", "/general"],
        "routing": ["base.profile", "base.general"]
      }
    });

    $rootScope.$apply();
    expect(MenuService.menu[0].name).toEqual('Profile');
  });

  it("Error menu load test", function () {
    MenuService.loadMenu();
    deferred.reject();

    $rootScope.$apply();
    expect(MenuService.menu).toEqual([]);
  });
});
