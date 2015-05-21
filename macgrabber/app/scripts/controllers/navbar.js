'use strict';

/**
 * @ngdoc function
 * @name macgrabberApp.controller:NavbarctrlCtrl
 * @description
 * # NavbarctrlCtrl
 * Controller of the macgrabberApp
 */
angular.module('macgrabberApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  });
