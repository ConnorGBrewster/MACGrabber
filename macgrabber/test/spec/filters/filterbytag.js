'use strict';

describe('Filter: filterByTag', function () {

  // load the filter's module
  beforeEach(module('macgrabberApp'));

  // initialize a new instance of the filter before each test
  var filterByTag;
  beforeEach(inject(function ($filter) {
    filterByTag = $filter('filterByTag');
  }));

  it('should return the input prefixed with "filterByTag filter:"', function () {
    var text = 'angularjs';
    expect(filterByTag(text)).toBe('filterByTag filter: ' + text);
  });

});
