var app = angular.module('app', ['ngRoute']);

app.config(function($locationProvider, $interpolateProvider) {
	$interpolateProvider.startSymbol('[[').endSymbol(']]');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'scoreboard/index.html',
            controller: 'scoreboardController'
        })
        .when('/players', {
            templateUrl: 'players/index.html',
            controller: 'playerController'
        });
}]);


app.service('playerService', ['$http', function ($http) {
    var urlBase = 'http://localhost:3000/api/v1/players';

    this.getPlayers = function () {
        return $http.get(urlBase);
    };

    this.createFile = function (data) {
        return $http({
            method: 'POST',
            data: data
        });
    };
}]);

app.controller('playerController', ['$scope', 'playerService', function($scope, playerService) {
    playerService.getPlayers()
        .success(function (result) {
            $scope.players = result;
        });
}]);

app.controller('scoreboardController', ['$scope', function($scope) {
}]);
