angular.module("ppp")
	.directive('customOnChange', function(){
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				console.log(attrs);
				element.bind('change', scope.$eval(attrs.customOnChange));
			}
		};
	});