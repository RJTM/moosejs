'use strict';

angular.module('mooseJs.common')
	.directive('myDownload', ["$compile", function ($compile) {
    return {
        restrict:'E',
        scope:{ getUrlData:'&getData'},
        link:function (scope, elm, attrs) {
            var url = URL.createObjectURL(scope.getUrlData());
            elm.append($compile(
                '<a class="btn btn-primary btn-lg" download="contest.json"' +
                    'href="' + url + '">' +
                    'Export JSON' +
                    '</a>'
            )(scope));
        }
    };
}]);