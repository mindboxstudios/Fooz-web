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
