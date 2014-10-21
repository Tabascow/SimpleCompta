'use strict';

describe('Service: userNotification', function () {

  // load the service's module
  beforeEach(module('simpleComptaApp'));

  // instantiate service
  var userNotification;
  beforeEach(inject(function (_userNotification_) {
    userNotification = _userNotification_;
  }));

  it('should do something', function () {
    expect(!!userNotification).toBe(true);
  });

});
