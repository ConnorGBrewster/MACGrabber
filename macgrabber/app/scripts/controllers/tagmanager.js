'use strict';

/**
 * @ngdoc function
 * @name macgrabberApp.controller:TagmanagerCtrl
 * @description
 * # TagmanagerCtrl
 * Controller of the macgrabberApp
 */
angular.module('macgrabberApp')
  .controller('TagmanagerCtrl', function ($scope, TagModel, ComputerModel) {    
    TagModel.all().then(function(tags) {
    	$scope.tags = tags.data;
    	$scope.tags.forEach(function(tag) {
    		tag.editing = false;
    	})
    });

    ComputerModel.all().then(function(computers) {
    	$scope.computers = computers.data;
    });

    $scope.operations = [
		{
			name: 'Remove Tag(s)',
			id: 0
		},
		{
			name: 'Remove All Computers From Tag(s)',
			id: 1
		}
	];

	$scope.selectedOperation = $scope.operations[0];

	$scope.selectAllTags = function(tagsCheckbox) {
		$scope.tagResults.forEach(function(tag) {
			tag.selected = tagsCheckbox;
		});
	};

	$scope.resetSelected = function() {
  		$scope.tagsCheckbox = false;
  		for (var i = 0; i < $scope.tags.length; i++) {
			$scope.tags[i].selected = false;
		}
  	};

	$scope.commitOperation = function() {
		$scope.tagResults.forEach(function(tag) {
			if (tag.selected) {
				$scope.computers.forEach(function (computer) {
					var index = computer.tags.indexOf(tag._id); 
					if (index > -1) {
						computer.tags.splice(index, 1);
						ComputerModel.update(computer._id, computer);
					}
				});
				if ($scope.selectedOperation.id === 0) {
					TagModel.destroy(tag._id);
					var index = $scope.tags.indexOf(tag);
					if (index > -1) {
						$scope.tags.splice(index, 1);
					}
				}
				else if ($scope.selectedOperation.id === 1) {
					tag.computers = [];
					TagModel.update(tag._id, tag);
				}
			}
		});
		$scope.resetSelected();
	};

	$scope.newTag = function() {
		var tag = {
			name: $scope.newTagName,
			computers: []
		};
		TagModel.create(tag).then(function (createdTag) {
			$scope.tags.push(createdTag.data);
			$scope.newTagName = '';
		});
	};

	$scope.editTag = function(tag) {
		tag.editing = true;
	};

	$scope.saveTag = function(tag) {
		TagModel.update(tag._id, tag);
		tag.editing = false;
	};

	$scope.cancelEdit = function(tag) {
		tag.editing = false;
	};

	$scope.isEditing = function(tag) {
		return tag.editing;
	};
  });
