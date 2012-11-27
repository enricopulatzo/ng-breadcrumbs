angular.module('ngBreadcrumbs', []).factory('BreadCrumbsService', function($rootScope) {
	'use strict';
    var data = {};
    var ensureIdIsRegistered = function(id) {
        if (angular.isUndefined(data[id])) {
            data[id] = [];
        }
    };
    return {
        push: function(id, item) {
            ensureIdIsRegistered(id);
            data[id].push(item);
            $rootScope.$broadcast( 'breadcrumbsRefresh' );
        },
        get: function(id) {
            ensureIdIsRegistered(id);
            return angular.copy(data[id]);
        },
        setLastIndex: function( id, idx ) {
            ensureIdIsRegistered(id);
            if ( data[id].length > 1+idx ) {
                data[id].splice( 1+idx, data[id].length - idx );
            }
        }
    };
}).directive('breadCrumbs', function(BreadCrumbsService) {
	'use strict';
    return {
        restrict: 'A',
        template: '<ul class="breadcrumb"><li ng-repeat=\'bc in breadcrumbs\' ng-class="{\'active\': {{$last}} }"><a ng-click="unregisterBreadCrumb( $index )" ng-href="{{bc.href}}">{{bc.label}}</a><span class="divider" ng-show="! $last">|</span></li></ul>',
        replace: true,
        compile: function(tElement, tAttrs) {
            return function($scope, $elem, $attr) {
                var bc_id = $attr['id'],
                    resetCrumbs = function() {
                        $scope.breadcrumbs = [];
                        angular.forEach(BreadCrumbsService.get(bc_id), function(v) {
                            $scope.breadcrumbs.push(v);
                        });
                    };
                resetCrumbs();
                $scope.unregisterBreadCrumb = function( index ) {
                    BreadCrumbsService.setLastIndex( bc_id, index );
                    resetCrumbs();
                };
                $scope.$on( 'breadcrumbsRefresh', function() {
                    resetCrumbs();
                } );
            }
        }
    };
});
