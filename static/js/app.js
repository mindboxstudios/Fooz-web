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

app.service('goalService', ['$http', function ($http) {
    var urlBase = 'http://localhost:3000/api/v1/goals';

    this.getGoals = function () {
        return $http.get(urlBase);
    };

    this.getGoal = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    this.saveGoal = function (data) {
        return $http({
            url: urlBase,
            method: 'POST',
            data: data
        });
    };

    this.updateGoal = function (id, data) {
        return $http({
            url: urlBase + '/' + id,
            method: 'PUT',
            data: data
        });
    };

    this.removeGoal = function (id) {
        return $http({
            url: urlBase + '/' + id,
            method: 'DELETE'
        });
    };
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

app.controller('goalsController', ['$scope', 'goalService', function($scope, goalService) {
    goalService.getGoals()
        .success(function (result) {
            $scope.goals = result;
        });

    $scope.remove = function(index) {
        var goal = $scope.goals[index];

        if(confirm('Are you sure you want this goal scored by ' + goal.for.firstName)) {
            goalService.removeGoal(goal._id)
                .success(function (result) {
                    console.log(result);
                    $scope.goals.splice(index, 1);
                });
        }
    };
}]);

app.controller('goalController', ['$scope', '$location', '$routeParams', 'goalService', 'playerService', function($scope, $location, $routeParams, goalService, playerService) {
    goalService.getGoal($routeParams.id)
        .success(function (result) {
            $scope.goal = result;
        });

    playerService.getPlayers()
        .success(function (result) {
            $scope.players = result;
        });

    $scope.addAgainst = function() {
        $scope.goal.against.push({});
    };

    $scope.removeAgainst = function(index) {
        $scope.goal.against.splice(index, 1);
    };

    $scope.save = function(goal) {
        goalService.updateGoal($routeParams.id, goal)
            .success(function (result) {
                console.log(result);
                $location.path('/goals');
            });
    };
}]);

app.controller('playersController', ['$scope', 'playerService', function($scope, playerService) {
    playerService.getPlayers()
        .success(function (result) {
            $scope.players = result;
        });

    // set order to display players,
    // lastName by default
    $scope.order = 'lastName';

    // set new order to display players
    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    // Remove a player
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

app.controller('playerController', ['$scope', '$location', 'playerService', '$routeParams', function($scope, $location, playerService, $routeParams) {
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
