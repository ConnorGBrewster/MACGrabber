'use strict';

describe('Service: ComputerModel', function () {

  // load the service's module
  beforeEach(module('macgrabberApp'));

  // instantiate service
  var ComputerModel;
  beforeEach(inject(function (_ComputerModel_) {
    ComputerModel = _ComputerModel_;
  }));

  it('should do something', function () {
    expect(!!ComputerModel).toBe(true);
  });

});
