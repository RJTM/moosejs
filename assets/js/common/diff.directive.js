angular.module('mooseJs.common')
	.directive('diffShow', ["$sce", function($sce){
		return {
			restrict: 'AE',
			scope: {
				diff: "@"
			},
			link: function(scope,element){
				console.log(scope.diff);
				if(scope.diff === 'Too many differences'){
					element.text('Too many differences found');
				}else{				
					var htmlContent = Diff2Html.getPrettyHtml(scope.diff, {outputFormat: 'side-by-side'});
					element.html(htmlContent);
					element.children().children().children().eq(0).children().eq(1).text('Jury Output -> Team Output');
				}
			}
		};
	}]);