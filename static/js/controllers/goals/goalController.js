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
