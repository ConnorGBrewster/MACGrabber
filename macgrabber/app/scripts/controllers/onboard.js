'use strict';

/**
 * @ngdoc function
 * @name macgrabberApp.controller:OnboardCtrl
 * @description
 * # OnboardCtrl
 * Controller of the macgrabberApp
 */
angular.module('macgrabberApp')
  .controller('OnboardCtrl', function ($scope, ComputerModel, TagModel) {    
    ComputerModel.all().then(function (result) {
  		$scope.computers = result.data;

  	});

    $scope.selectedTag = {name: 'No Tag', _id: -1};

  	TagModel.all().then(function (result) {
  		$scope.tags = result.data;
  		$scope.tags.splice(0, 0, {name: 'No Tag', _id: -1});
  		$scope.selectedTag = $scope.tags[0];
  	});

  	$scope.selectAllComputers = function(checkbox) {
  		for (var i = 0; i < $scope.computerResults.length; i++) {
			$scope.computerResults[i].selected = checkbox;
		}
  	};

  	$scope.resetSelected = function() {
  		$scope.computersCheckbox = false;
  		for (var i = 0; i < $scope.computers.length; i++) {
        $scope.computers[i].selected = false;
      }
  	};

  	$scope.onBoard = function() {
  		for (var i = 0; i < $scope.computers.length; i++) {
  			var computer = $scope.computers[i];
  			if (computer.selected) {
  				if ($scope.selectedTag._id !== -1 && computer.tags.indexOf($scope.selectedTag._id) === -1) {
  					$scope.selectedTag.computers.push(computer._id);
  					computer.tags.push($scope.selectedTag._id);
          }
          computer.onBoard = true;
          ComputerModel.update(computer._id, computer);
				}
		  }
  		if ($scope.selectedTag._id !== -1) {
  			TagModel.update($scope.selectedTag._id, $scope.selectedTag).then(function(tag) {
  				$scope.selectedTag = tag.data;
  			});
  		}
  		$scope.resetSelected();
  	};
  });
