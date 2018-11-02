angular.module("ppp")
.directive('scrolly', function ($window, $document) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {

        	$window.onscroll = function() {
        		

        		var totalHeight = $document[0].documentElement.offsetHeight;
        		var windowHeight = $window.innerHeight;
        		var windowOffsetTop = $window.pageYOffset;

        		if(totalHeight-60<=windowOffsetTop + windowHeight) {
        			scope.$apply(attrs.scrolly);
        		}

        		console.log('$document.innerHeight: ', totalHeight);
        		console.log('$window.innerHeight: ', $window.innerHeight);	
        		console.log('$window.pageYOffset: ', $window.pageYOffset);	
        	
        	}

        	

        }
    };
});