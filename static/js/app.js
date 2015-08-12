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
            controller: 'playersController'
        })
        .when('/players/create', {
            templateUrl: 'players/edit.html',
            controller: 'playerController'
        })
        .when('/players/:id', {
            templateUrl: 'players/edit.html',
            controller: 'playerController'
        });
}]);


app.service('playerService', ['$http', function ($http) {
    var urlBase = 'http://localhost:3000/api/v1/players';

    this.getPlayers = function () {
        return $http.get(urlBase);
    };

    this.getPlayer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    this.savePlayer = function (data) {
        return $http({
            url: urlBase,
            method: 'POST',
            data: data
        });
    };

    this.updatePlayer = function (id, data) {
        return $http({
            url: urlBase + '/' + id,
            method: 'PUT',
            data: data
        });
    };

    this.removePlayer = function (id) {
        return $http({
            url: urlBase + '/' + id,
            method: 'DELETE'
        });
    };
}]);

app.controller('playersController', ['$scope', 'playerService', function($scope, playerService) {
    playerService.getPlayers()
        .success(function (result) {
            $scope.players = result;
        });

    $scope.remove = function(index) {
        var player = $scope.players[index];

        if(confirm('Are you sure you want to delete ' + player.firstName + ' ' + player.lastName)) {
            playerService.removePlayer(player._id)
                .success(function (result) {
                    console.log(result);
                    $scope.players.splice(index, 1);
                });
        }
    };
}]);

app.controller('playerController', ['$scope', '$routeParams', '$location', 'playerService', function($scope, $location, $routeParams, playerService) {
    if($routeParams.id) {
        playerService.getPlayer($routeParams.id)
            .success(function (result) {
                $scope.player = result;
            });
    }

    $scope.save = function(player) {
        if($routeParams.id == undefined) {
            playerService.savePlayer(player)
                .success(function (result) {
                    console.log(result);
                    $location.path('/players');
                });
        }
        else {
            playerService.updatePlayer($routeParams.id, player)
                .success(function (result) {
                    console.log(result);
                    $location.path('/players');
                });
        }
    };
}]);

app.controller('scoreboardController', ['$scope', function($scope) {
}]);
