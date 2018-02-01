var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


pokeApp.factory('myService', function($resource) {

   return $resource('https://pokeapi.co/api/v2/pokemon/:id/');

});



pokeApp.factory('SelectedPokemon', function() {

   return {value: 1};

});

pokeApp.directive('pokedex', function() {
  return {
    template: '<div ng-include="\'template.html\'"> </div>'
  };
});


pokeApp.controller('controllerPokemon', ['$scope', '$log', '$http', '$resource', 'myService', 'SelectedPokemon', function($scope, $log, $http, $resource, myService, SelectedPokemon){
  
	

  $scope.user = {
    name: function(newName) {
     return arguments.length ? (_name = newName) : _name;
    }
  };
  
  $scope.valider = function(uri) {
	  
	  var uriTab = uri.split('/');
	  var id = uriTab[3];
	 
		var result = myService.get({id:id}, function() {
			
			SelectedPokemon.value = result;
			console.log(result);
	
		});	
	
    };
  

  $http({
  method: 'GET',
  url: 'https://pokeapi.co/api/v1/pokedex/1'
	}).then(function successCallback(response) {

   console.log(response.data.pokemon); 
	$scope.list=response.data.pokemon;
    
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

}]);


pokeApp.controller('controllerDisplayPokemon', ['$scope', '$log', '$http', '$resource', 'SelectedPokemon', function($scope, $log, $http, $resource, SelectedPokemon){


	$scope.SelectedPokemon = SelectedPokemon;


	$scope.$watch("SelectedPokemon.value",
        function handleFooChange(newValue, oldValue) {
            $scope.name = newValue.name;
			$scope.id = newValue.id;
			$scope.urlImage = newValue.sprites;
        }
    );

}]);



