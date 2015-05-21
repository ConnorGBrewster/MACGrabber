'use strict';

describe('Service: TagModel', function () {

  // load the service's module
  beforeEach(module('macgrabberApp'));

  // instantiate service
  var TagModel;
  beforeEach(inject(function (_TagModel_) {
    TagModel = _TagModel_;
  }));

  it('should do something', function () {
    expect(!!TagModel).toBe(true);
  });

});
