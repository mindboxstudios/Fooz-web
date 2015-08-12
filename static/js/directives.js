app
	.directive('color', function($timeout) {
	    return {
	     	restrict: 'A',
	    	require: 'ngModel',
	    	link: function($scope, $element, $attrs, ngModel) {
	    		$scope.$watch($attrs.ngModel, function(input) {
	    			if(input !== undefined && input.charAt(0) === '#' && input.length >= 4) {
	    				ngModel.$setValidity($attrs.ngModel, true);
	    			}
	    			else {
	    				ngModel.$setValidity($attrs.ngModel, false);
	    			}
	    		});
	    	}
	    };
	});
