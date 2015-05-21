'use strict';

/**
 * @ngdoc function
 * @name macgrabberApp.controller:BatchoperationCtrl
 * @description
 * # BatchoperationCtrl
 * Controller of the macgrabberApp
 */
angular.module('macgrabberApp')
  .controller('BatchoperationCtrl', function ($scope, TagModel, ComputerModel) {
	$scope.operations = [
		{
			name: 'Add Tag',
			id: 0
		},
		{
			name: 'Remove Tag',
			id: 1
		},
		{
			name: 'Delete',
			id: 2
		}
	];

    $scope.selectedOperation = $scope.operations[0];

    TagModel.all().then(function(tags) {
    	$scope.tags = tags.data;
    	$scope.selectedTag = $scope.tags[0];
    });

    ComputerModel.all().then(function(computers) {
    	$scope.computers = computers.data;
    });

    $scope.commitOperation = function() {
		var serialNumberArray = $scope.serialNumbers.split('\n');
    	console.log(serialNumberArray);
		serialNumberArray.forEach(function (serialNumber) {
			($scope.computers || []).forEach(function(computer) {
				if (computer.onBoard && computer.serialNumber === serialNumber) {
					if ($scope.selectedOperation.id === 0) {
						console.log($scope.selectedTag);
						if (computer.tags.indexOf($scope.selectedTag._id) === -1) {
							console.log($scope.selectedTag);
							computer.tags.push($scope.selectedTag._id);
							ComputerModel.update(computer._id, computer);
							$scope.selectedTag.computers.push(computer._id);
							TagModel.update($scope.selectedTag._id, $scope.selectedTag);
						}
					}
					else if ($scope.selectedOperation.id === 1) {
						var index = $scope.selectedTag.computers.indexOf(computer._id);
						if (index > -1) {
							$scope.selectedTag.computers.splice(index, 1);
							TagModel.update($scope.selectedTag._id, $scope.selectedTag);
						}
						index = computer.tags.indexOf($scope.selectedTag._id);
						if (index > -1) {
							computer.tags.splice(index, 1);
							ComputerModel.update(computer._id, computer);
						}
					}
					else if ($scope.selectedOperation.id === 2) {
						var index2 = $scope.selectedTag.computers.indexOf(computer._id);
						if (index2 > -1) {
							$scope.selectedTag.computers.splice(index2, 1);
							TagModel.update($scope.selectedTag._id, $scope.selectedTag);
						}
						ComputerModel.destroy(computer._id);
						index2 = $scope.computers.indexOf(computer);
						if (index2 > -1) {
							$scope.computers.splice(index2, 1);
						}
					}
				}
			});
		});
		$scope.serialNumbers = '';
    };
  });
