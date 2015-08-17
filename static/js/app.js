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
        .when('/goals', {
            templateUrl: 'goals/index.html',
            controller: 'goalsController'
        })
        .when('/goals/:id/edit', {
            templateUrl: 'goals/edit.html',
            controller: 'goalController'
        })
        .when('/players', {
            templateUrl: 'players/index.html',
            controller: 'playersController'
        })
        .when('/players/create', {
            templateUrl: 'players/edit.html',
            controller: 'playerController'
        })
        .when('/players/:id/edit', {
            templateUrl: 'players/edit.html',
            controller: 'playerController'
        });
}]);
