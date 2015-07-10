# Usage
Include the js file and the html file (current the html route is fixed in 'views/help_slider.html')

Inport the module  and in controller

``
var app = angular.module('mainApp', ["helpSlider"]);

.controller('mainController', ["Help", function(Help){
  $scope.helpData = {
			"module1" : {
			  "title" 	 : "titel 1",
				"description": "descp 1",
				"image"	: ["arrimg.png", "arrim2.png", ]
			},
			"module2" : {
			  "title" 	 : "titel 2",
				"description": "descp 2",
				"image"	: ["arrimg.png", "arrim2.png", ]
			}
		};
		
		
	  $scope.help = new Help($scope.helpData);

}]);
``

On HTML include the tag:

``
<help-slider data="help"></help-slider>
``

The data attribute is the help slide variable
