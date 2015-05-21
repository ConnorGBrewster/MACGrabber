'use strict';

/**
 * @ngdoc overview
 * @name macgrabberApp
 * @description
 * # macgrabberApp
 *
 * Main module of the application.
 */
angular
  .module('macgrabberApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCsv'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl'
      })
      .when('/onboard', {
        templateUrl: 'views/onboard.html',
        controller: 'OnboardCtrl'
      })
      .when('/batchoperation', {
        templateUrl: 'views/batchoperation.html',
        controller: 'BatchoperationCtrl'
      })
      .when('/tagmanager', {
        templateUrl: 'views/tagmanager.html',
        controller: 'TagmanagerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('ENDPOINT_URI', 'http://10.33.15.150:3000/api/');