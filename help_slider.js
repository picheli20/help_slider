'use strict';
angular.module('helpSlider', [])

.factory('Help', ['$rootScope', 'Feature',
    function($rootScope, Feature) {
        function help(d) {
            var features = [];
            var currentFeature = 0;
            var self = this;
            var highlightArrow = false;
            var show = false;

            for (var k in d) {
                features.push(new Feature(d[k]));
            }

            this.apply = function() {
                setTimeout(function() {
                    $rootScope.$apply()
                }, 1);
            };
            
            this.previousImage = function(){
            	if(features[currentFeature].hasPreviousImage()){
            		features[currentFeature].clickPreviousImage();
            		self.apply();
            	}else
            		this.previous();
            };
            
            this.nextImage = function(){
            	if(features[currentFeature].hasNextImage()){
            		features[currentFeature].clickNextImage();
            		self.apply();
            	}else
            		this.next();
            };
            
            this.setImageHover = function(v){
            	highlightArrow = v;
            };
            
            this.getImageHover = function(){
            	return highlightArrow;
            };

            this.getFeatures = function(){
                return features;
            };
            
            this.isShowing = function(){
            	return show;
            };

            this.hide = function(){
            	show = false;
            	this.apply();
            };
            
            this.show = function(){
            	show = true;
            	this.apply();
            };

            this.getCurrentFeature = function() {
                return currentFeature;
            };

            this.hasNext = function() {
                return currentFeature + 1 < features.length;
            };

            this.hasPrevious = function() {
                return currentFeature > 0;
            };
            
            this.resetAll = function(){
            	for(var index = 0; index < features.length; index++){
                	$('#feature' + index).removeClass( 'help-fixed-left');
                	$('#feature' + index).removeClass( 'help-fixed-middle');
                	$('#feature' + index).removeClass( 'help-fixed-right');
            	};
            };
            
            this.goToFeature = function(i){
            	if(i > currentFeature){
            		this.next(i);
            	}else{
            		this.previous(i);
            	}
            };

            this.next = function(toNext) {
                if (this.hasNext()) {
                	if(toNext == undefined){
                		toNext = currentFeature + 1;
                	}
                	
                	this.resetAll();
                	$('#feature' + toNext).addClass( 'help-fixed-right');
                	
                	currentFeature = toNext;
                    features[currentFeature].setFirstImage();
                    this.apply();
                }
            };

            this.previous = function(toPrev) {
                if (this.hasPrevious()) {
                	if(toPrev == undefined){
                		toPrev = currentFeature - 1;
                	}
                	
                	this.resetAll();
                	$('#feature' + toPrev ).addClass( 'help-fixed-left');
                	
                    currentFeature = toPrev;
                    features[currentFeature].setLastImage();
                    this.apply();
                }
            };

            $("body").keydown(function(event) {
                switch (event.which) {
                    case 39:
                        self.nextImage();
                        break;
                    case 37:
                        self.previousImage();
                        break;
                }
            });
        };

        return help;

    }
])


.factory('Feature', ['$rootScope',
    function($rootScope) {
        function feat(d) {
            var data = d;
            var intervalTimer = 300000;
            var interval = null;
            var currentImage = 0;
            var self = this;
            
            this.apply = function() {
                setTimeout(function() {
                    $rootScope.$apply()
                }, 1);
            };

            this.getTitle = function() {
                return data.title;
            }

            this.getDescription = function() {
                return data.description;
            }

            this.getImages = function() {
                return data.image;
            }

            this.setFirstImage = function() {
                currentImage = 0;
            };

            this.setLastImage = function() {
                currentImage = data.image.length - 1;
            };

            this.getCurrentImage = function(){
                return currentImage;
            };

            this.setImage = function(i) {
                currentImage = i;
            };

            this.hasNextImage = function() {
                return currentImage + 1 < data.image.length;
            };

            this.hasPreviousImage = function() {
                return 0 != currentImage;
            };

            this.nextImage = function() {
                if (!this.hasNextImage()) return;

                currentImage++;
                this.apply();
            };

            this.previousImage = function() {
                if (!this.hasPreviousImage()) return;
                currentImage--;
                this.apply();
            };

            this.clickNextImage = function() {
                this.resetInterval();
                this.nextImage();
            };

            this.clickPreviousImage = function() {
                this.resetInterval();
                this.previousImage();
            };

            //Timer

            this.startTimer = function() {
                interval = setInterval(function() {
                    self.nextImage();
                }, intervalTimer);
            };

            this.stopTimer = function() {
                clearInterval(interval);
                interval = null;
            };

            this.isIntervalRunning = function() {
                return interval != null;
            };

            this.resetInterval = function() {
                this.stopTimer();
                this.startTimer();
            };
        };
        return feat;
    }
])

.directive('helpSlider', ['Help',
    function(Help) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: "views/help_slider.html",
            //controller: function($scope) {
            //},
            //link: function(scope, element, attrs) {
            //}
        };
    }
]);
