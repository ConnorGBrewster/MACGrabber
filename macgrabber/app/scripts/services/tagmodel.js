'use strict';

/**
 * @ngdoc service
 * @name macgrabberApp.TagModel
 * @description
 * # TagModel
 * Service in the macgrabberApp.
 */
angular.module('macgrabberApp')
  .service('TagModel', function ($http, $location) {
    var ENDPOINT_URI = $location.protocol() + '://' + $location.host() + ':3000/api/';

    var service = this,
    	path = 'tags/';

    function getUrl() {
    	return ENDPOINT_URI + path;
    }

    function getUrlForId(itemId) {
    	return getUrl(path) + itemId;
    }

    service.all = function() {
    	return $http.get(getUrl());
    };

    service.fetch = function(itemId) {
    	return $http.get(getUrlForId(itemId));
    };

    service.create = function(item) {
    	return $http.post(getUrl(), item);
    };

    service.update = function(itemId, item) {
    	return $http.put(getUrlForId(itemId), item);
    };

    service.destroy = function(itemId) {
    	return $http.delete(getUrlForId(itemId));
    };
  });