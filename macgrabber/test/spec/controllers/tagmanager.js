'use strict';

describe('Controller: TagmanagerCtrl', function () {

  // load the controller's module
  beforeEach(module('macgrabberApp'));

  var TagmanagerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TagmanagerCtrl = $controller('TagmanagerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
