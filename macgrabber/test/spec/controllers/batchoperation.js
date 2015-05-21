'use strict';

describe('Controller: BatchoperationCtrl', function () {

  // load the controller's module
  beforeEach(module('macgrabberApp'));

  var BatchoperationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BatchoperationCtrl = $controller('BatchoperationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
