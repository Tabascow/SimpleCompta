'use strict';

describe('Controller: RevenuesCtrl', function () {

  // load the controller's module
  beforeEach(module('simpleComptaApp'));

  var RevenuesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevenuesCtrl = $controller('RevenuesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
