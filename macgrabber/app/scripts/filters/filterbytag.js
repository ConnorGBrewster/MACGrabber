'use strict';

/**
 * @ngdoc filter
 * @name macgrabberApp.filter:filterByTag
 * @function
 * @description
 * # filterByTag
 * Filter in the macgrabberApp.
 */
angular.module('macgrabberApp')
  .filter('filterByTag', function () {
    return function (items, tag) {
    	if (!tag || tag === '') {
    		return items;
    	}
    	var filtered = [];
    	(items || []).forEach(function (item) {
    		if (tag && item.tags.indexOf(tag._id) > -1) {
    			filtered.push(item);
    		}
    	});
    	return filtered;
    };
  });
