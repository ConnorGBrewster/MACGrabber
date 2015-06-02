'use strict';

/**
 * @ngdoc function
 * @name macgrabberApp.controller:InventoryCtrl
 * @description
 * # InventoryCtrl
 * Controller of the macgrabberApp
 */
angular.module('macgrabberApp')
  .controller('InventoryCtrl', function ($scope, ComputerModel, TagModel) {
    $scope.tags = [];
  	$scope.computers = [];
  	$scope.selectedTag = '';
    $scope.loading = true;
    console.log($scope.loading);

  	TagModel.all().then(function (result) {
  		$scope.tags = result.data;
  		$scope.updateTagNames();
      $scope.tagDropdown = $scope.tags[0];
  	});

  	ComputerModel.all().then(function (result) {
  		$scope.computers = result.data;
  		$scope.updateTagNames();
      $scope.loading = false;
      console.log($scope.loading);
  	});

  	$scope.isTagActive = function(tag) {
  		return tag._id === $scope.selectedTag._id;
  	};

  	$scope.resetSelected = function() {
  		$scope.computersCheckbox = false;
  		for (var i = 0; i < $scope.computers.length; i++) {
			 $scope.computers[i].selected = false;
		  }
  	};

  	$scope.updateTagNames = function() {
  		$scope.computers.forEach(function (computer) {
  			computer.tagNames = [];
  			computer.tags.forEach(function (tag) {
  				computer.tagNames.push($scope.getTagName(tag));
  			});
  		});
  	};

  	$scope.selectAllComputers = function(checkbox) {
  		for (var i = 0; i < $scope.computerResults.length; i++) {
  			$scope.computerResults[i].selected = checkbox;
  		}
  	};

  	$scope.setTag = function(tag) {
  		$scope.selectedTag = tag;
  		$scope.resetSelected();
  	};

  	$scope.getTagName = function(tagId) {
  		for(var i = 0; i < $scope.tags.length; i++) {
  			var tag = $scope.tags[i];
  			if (tag._id === tagId) {
  				return tag.name;
  			}
  		}
  		return '';
  	};

    $scope.getTagByID = function(tagId) {
      for(var i = 0; i < $scope.tags.length; i++) {
        var tag = $scope.tags[i];
        if (tag._id === tagId) {
          return tag;
        }
      }
      return -1;
    };

  	$scope.deleteSelected = function() {
  		for (var i = 0; i < $scope.computerResults.length; i++) {
  			var computer = $scope.computerResults[i];
  			if (computer.selected) {
          for (var j = 0; j < computer.tags.length; j++) {
            var tag = $scope.getTagByID(computer.tags[j]);
            if (tag !== -1) {
              var index = tag.computers.indexOf(computer._id);
              if (index > -1) {
                tag.computers.splice(index, 1);
                TagModel.update(tag._id, tag);
              }
            }
          }
  				ComputerModel.destroy(computer._id);
  				var computerIndex = $scope.computers.indexOf(computer);
  				if (computerIndex > -1) {
  					$scope.computers.splice(computerIndex, 1);
  				}
  			}
  		}
      $scope.resetSelected();
  	};

    $scope.getCSVArray = function() {
      var results = [];
      for (var i = 0; i < $scope.computerResults.length; i++) {
        var computer = $scope.computerResults[i];
        if (computer.selected) {
          var formattedMAC = computer.wirelessMAC;
          formattedMAC = formattedMAC.replace(/:/g, '');
          formattedMAC = formattedMAC.toLowerCase();
          results.push({
            computerName: computer.name,
            wirelessMAC: formattedMAC
          });
        }
      }
      return results;
    };



    $scope.addTagToSelected = function() {
      if (!$scope.tagDropdown) {
        return;
      }
      for (var i = 0; i < $scope.computerResults.length; i++) {
        var computer = $scope.computerResults[i];
        if (computer.selected) {
          computer.tags.push($scope.tagDropdown._id);
          ComputerModel.update(computer._id, computer);
          $scope.tagDropdown.computers.push(computer._id);
          TagModel.update($scope.tagDropdown._id, $scope.tagDropdown);
        }
      }
      $scope.resetSelected();
      $scope.updateTagNames();
    };

    $scope.removeTagFromSelected = function() {
      if (!$scope.tagDropdown) {
        return;
      }
      for (var i = 0; i < $scope.computerResults.length; i++) {
        var computer = $scope.computerResults[i];
        if (computer.selected) {
          var index = computer.tags.indexOf($scope.tagDropdown._id);
          if (index > -1) {
            computer.tags.splice(index, 1);
            ComputerModel.update(computer._id, computer);
          }

          index = $scope.tagDropdown.computers.indexOf(computer._id);
          if (index > -1) {
            $scope.tagDropdown.computers.splice(index, 1);
            TagModel.update($scope.tagDropdown._id, $scope.tagDropdown);
          }
        }
      }
      $scope.resetSelected();
      $scope.updateTagNames();
    };
  });
