'use strict';

describe('Controller: ExpensesCtrl', function () {

  // load the controller's module
  beforeEach(module('simpleComptaApp'));

  var ExpensesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesCtrl = $controller('ExpensesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
