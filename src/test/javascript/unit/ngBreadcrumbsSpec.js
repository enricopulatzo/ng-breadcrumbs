'use strict';
describe( 'directive spec', function() {
  describe( 'ngBreadcrumbs', function() {
    it(
      '',
      inject( function( $rootScope, $compile ) {
        var element;
        $rootScope.availableRoles = [
          { "roleId": 4, "name": "ROLE_USER", "description": "Denotes Users" },
          { "roleId": 5, "name": "ROLE_USER_OPERATING", "description": "Denotes Operating Users" }
        ];
        element = $compile( angular.element( "<select pick-list multiple name='rolePicker' ng-model='assignedRoles' source='availableRoles' label-expr='thing.description for thing in SOURCE'></select>" ) )($rootScope);
        $rootScope.$digest();
		var options = element.find( 'div select option' );
		expect( options.length ).not.toBe( 0 );
      } )
    );
  } );
} );
